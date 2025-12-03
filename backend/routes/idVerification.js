const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const IDVerification = require('../models/IDVerification');
const auth = require('../middleware/auth');

// Configure multer for ID document uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/id-documents';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'id-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, and PDF files are allowed'));
    }
  }
});

// @route   POST /api/id-verification/submit
// @desc    Submit ID documents for verification
// @access  Private
router.post('/submit', auth, upload.fields([
  { name: 'idImageFront', maxCount: 1 },
  { name: 'idImageBack', maxCount: 1 },
  { name: 'selfieWithId', maxCount: 1 }
]), async (req, res) => {
  try {
    const { idType, idNumber } = req.body;

    // Validate required fields
    if (!idType || !idNumber) {
      return res.status(400).json({
        success: false,
        message: 'ID type and number are required'
      });
    }

    // Validate files
    if (!req.files || !req.files.idImageFront || !req.files.selfieWithId) {
      return res.status(400).json({
        success: false,
        message: 'ID front image and selfie with ID are required'
      });
    }

    // Check if user already has a pending or approved verification
    const existingVerification = await IDVerification.findOne({
      userId: req.userId,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingVerification) {
      return res.status(400).json({
        success: false,
        message: existingVerification.status === 'approved' 
          ? 'Your ID is already verified' 
          : 'You already have a pending verification request'
      });
    }

    // Create verification request
    const verification = new IDVerification({
      userId: req.userId,
      idType: idType,
      idNumber: idNumber,
      idImageFront: req.files.idImageFront[0].filename,
      idImageBack: req.files.idImageBack ? req.files.idImageBack[0].filename : null,
      selfieWithId: req.files.selfieWithId[0].filename,
      status: 'pending'
    });

    await verification.save();

    res.json({
      success: true,
      message: 'ID verification request submitted successfully. Our team will review it within 24-48 hours.',
      verification: {
        id: verification._id,
        status: verification.status,
        submittedAt: verification.submittedAt
      }
    });
  } catch (error) {
    console.error('ID verification submission error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit verification request'
    });
  }
});

// @route   GET /api/id-verification/status
// @desc    Get verification status
// @access  Private
router.get('/status', auth, async (req, res) => {
  try {
    const verification = await IDVerification.findOne({ userId: req.userId })
      .sort({ submittedAt: -1 });

    const user = await User.findById(req.userId).select('idVerified idVerifiedAt idVerificationType');

    res.json({
      success: true,
      verified: user.idVerified || false,
      verifiedAt: user.idVerifiedAt,
      verificationType: user.idVerificationType,
      currentRequest: verification ? {
        id: verification._id,
        status: verification.status,
        idType: verification.idType,
        submittedAt: verification.submittedAt,
        reviewedAt: verification.reviewedAt,
        rejectionReason: verification.rejectionReason
      } : null
    });
  } catch (error) {
    console.error('Get verification status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/id-verification/pending
// @desc    Get all pending verifications (Admin only)
// @access  Private (Admin)
router.get('/pending', auth, async (req, res) => {
  try {
    // TODO: Add admin role check
    // For now, any authenticated user can access (change this in production)

    const pendingVerifications = await IDVerification.find({ status: 'pending' })
      .populate('userId', 'name email mobile age gender location')
      .sort({ submittedAt: 1 })
      .limit(50);

    res.json({
      success: true,
      verifications: pendingVerifications
    });
  } catch (error) {
    console.error('Get pending verifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/id-verification/review/:id
// @desc    Approve or reject verification (Admin only)
// @access  Private (Admin)
router.post('/review/:id', auth, async (req, res) => {
  try {
    const { action, rejectionReason, notes } = req.body;

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Must be approve or reject'
      });
    }

    const verification = await IDVerification.findById(req.params.id);

    if (!verification) {
      return res.status(404).json({
        success: false,
        message: 'Verification request not found'
      });
    }

    if (verification.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This verification has already been reviewed'
      });
    }

    // Update verification status
    verification.status = action === 'approve' ? 'approved' : 'rejected';
    verification.reviewedAt = new Date();
    verification.reviewedBy = req.userId;
    verification.rejectionReason = rejectionReason;
    verification.notes = notes;

    await verification.save();

    // If approved, update user record
    if (action === 'approve') {
      await User.findByIdAndUpdate(verification.userId, {
        idVerified: true,
        idVerifiedAt: new Date(),
        idVerificationType: verification.idType
      });
    }

    res.json({
      success: true,
      message: action === 'approve' 
        ? 'Verification approved successfully' 
        : 'Verification rejected',
      verification: {
        id: verification._id,
        status: verification.status,
        reviewedAt: verification.reviewedAt
      }
    });
  } catch (error) {
    console.error('Review verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/id-verification/cancel
// @desc    Cancel pending verification request
// @access  Private
router.delete('/cancel', auth, async (req, res) => {
  try {
    const verification = await IDVerification.findOne({
      userId: req.userId,
      status: 'pending'
    });

    if (!verification) {
      return res.status(404).json({
        success: false,
        message: 'No pending verification request found'
      });
    }

    // Delete uploaded files
    const uploadDir = 'uploads/id-documents';
    if (verification.idImageFront) {
      const frontPath = path.join(uploadDir, verification.idImageFront);
      if (fs.existsSync(frontPath)) fs.unlinkSync(frontPath);
    }
    if (verification.idImageBack) {
      const backPath = path.join(uploadDir, verification.idImageBack);
      if (fs.existsSync(backPath)) fs.unlinkSync(backPath);
    }
    if (verification.selfieWithId) {
      const selfiePath = path.join(uploadDir, verification.selfieWithId);
      if (fs.existsSync(selfiePath)) fs.unlinkSync(selfiePath);
    }

    await IDVerification.findByIdAndDelete(verification._id);

    res.json({
      success: true,
      message: 'Verification request cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

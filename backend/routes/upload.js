const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { cloudinary, upload } = require('../config/cloudinary');

// @route   POST /api/upload/profile-photo
// @desc    Upload profile photo to Cloudinary
// @access  Private
router.post('/profile-photo', auth, (req, res, next) => {
  // Wrap multer to catch Cloudinary/multer errors and respond with details
  upload.single('photo')(req, res, async (err) => {
    if (err) {
      console.error('Upload middleware error:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'Upload failed'
      });
    }

    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const User = require('../models/User');
      
      // Get user
      const user = await User.findById(req.userId);
      
      // Delete old profile photo from Cloudinary if exists
      if (user.profileImage) {
        try {
          // Extract public_id from the Cloudinary URL
          const urlParts = user.profileImage.split('/');
          const publicIdWithExt = urlParts[urlParts.length - 1];
          const publicId = `matrimony/profiles/${publicIdWithExt.split('.')[0]}`;
          
          // Delete from Cloudinary
          await cloudinary.uploader.destroy(publicId);
        } catch (deleteError) {
          console.error('Error deleting old image from Cloudinary:', deleteError);
          // Continue even if deletion fails
        }
      }

      // Update user with new Cloudinary photo URL
      const photoUrl = req.file.path; // Cloudinary URL
      user.profileImage = photoUrl;
      await user.save();

      res.json({
        success: true,
        message: 'Photo uploaded successfully to Cloudinary',
        photoUrl: photoUrl
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Server error during upload'
      });
    }
  });
});

// @route   DELETE /api/upload/profile-photo
// @desc    Delete profile photo from Cloudinary
// @access  Private
router.delete('/profile-photo', auth, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.userId);

    if (user.profileImage) {
      try {
        // Extract public_id from the Cloudinary URL
        const urlParts = user.profileImage.split('/');
        const publicIdWithExt = urlParts[urlParts.length - 1];
        const publicId = `matrimony/profiles/${publicIdWithExt.split('.')[0]}`;
        
        // Delete from Cloudinary
        await cloudinary.uploader.destroy(publicId);
      } catch (deleteError) {
        console.error('Error deleting image from Cloudinary:', deleteError);
        // Continue even if deletion fails
      }
      
      user.profileImage = null;
      await user.save();
    }

    res.json({
      success: true,
      message: 'Photo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Local error handler for this router to capture unexpected errors
router.use((err, req, res, next) => {
  console.error('Upload route error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Server error during upload'
  });
});

module.exports = router;

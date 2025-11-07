const express = require('express');
const router = express.Router();
const Interest = require('../models/Interest');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// @route   POST /api/interests
// @desc    Send interest to a profile
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { toUserId } = req.body;

    console.log('Sending interest from:', req.userId, 'to:', toUserId);

    if (!toUserId) {
      return res.status(400).json({
        success: false,
        message: 'Recipient user ID is required'
      });
    }

    // Check if interest already exists
    const existingInterest = await Interest.findOne({
      from: req.userId,
      to: toUserId
    });

    if (existingInterest) {
      console.log('Interest already exists:', existingInterest._id);
      return res.status(400).json({
        success: false,
        message: 'Interest already sent to this profile'
      });
    }

    // Create interest
    const interest = new Interest({
      from: req.userId,
      to: toUserId
    });

    await interest.save();
    console.log('Interest created:', interest._id);

    // Create notification for recipient
    const notification = new Notification({
      user: toUserId,
      from: req.userId,
      type: 'interest_received',
      message: 'sent you an interest',
      relatedInterest: interest._id
    });

    await notification.save();
    console.log('Notification created:', notification._id);

    res.status(201).json({
      success: true,
      message: 'Interest sent successfully',
      interest
    });
  } catch (error) {
    console.error('Send interest error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/interests/:id/accept
// @desc    Accept interest
// @access  Private
router.put('/:id/accept', auth, async (req, res) => {
  try {
    const interest = await Interest.findOne({
      _id: req.params.id,
      to: req.userId
    });

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: 'Interest not found'
      });
    }

    interest.status = 'accepted';
    interest.respondedAt = Date.now();
    await interest.save();

    // Create notification for sender
    const notification = new Notification({
      user: interest.from,
      from: req.userId,
      type: 'interest_accepted',
      message: 'accepted your interest request'
    });

    await notification.save();

    res.json({
      success: true,
      message: 'Interest accepted',
      interest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/interests/:id/reject
// @desc    Reject interest
// @access  Private
router.put('/:id/reject', auth, async (req, res) => {
  try {
    const interest = await Interest.findOne({
      _id: req.params.id,
      to: req.userId
    });

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: 'Interest not found'
      });
    }

    interest.status = 'rejected';
    interest.respondedAt = Date.now();
    await interest.save();

    res.json({
      success: true,
      message: 'Interest rejected',
      interest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/interests/sent
// @desc    Get sent interests
// @access  Private
router.get('/sent', auth, async (req, res) => {
  try {
    console.log('Fetching sent interests for user:', req.userId);
    const interests = await Interest.find({ from: req.userId })
      .populate('to', '-password')
      .sort({ createdAt: -1 });

    console.log(`Found ${interests.length} sent interests`);
    res.json({
      success: true,
      interests
    });
  } catch (error) {
    console.error('Get sent interests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/interests/received
// @desc    Get received interests (only pending by default)
// @access  Private
router.get('/received', auth, async (req, res) => {
  try {
    console.log('Fetching received interests for user:', req.userId);
    
    // By default, only show pending interests
    // Can pass ?status=all to see all
    const status = req.query.status || 'pending';
    const filter = { to: req.userId };
    
    if (status !== 'all') {
      filter.status = status;
    }
    
    const interests = await Interest.find(filter)
      .populate('from', '-password')
      .sort({ createdAt: -1 });

    console.log(`Found ${interests.length} received interests (status: ${status})`);
    res.json({
      success: true,
      interests
    });
  } catch (error) {
    console.error('Get received interests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

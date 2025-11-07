const express = require('express');
const router = express.Router();
const ProfileView = require('../models/ProfileView');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// @route   POST /api/profile-views
// @desc    Record profile view
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { viewedUserId } = req.body;

    // Don't record if viewing own profile
    if (req.userId.toString() === viewedUserId.toString()) {
      return res.json({ success: true, message: 'Own profile view not recorded' });
    }

    // Check if already viewed recently (within 24 hours)
    const recentView = await ProfileView.findOne({
      viewer: req.userId,
      viewedProfile: viewedUserId,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (recentView) {
      return res.json({ success: true, message: 'View already recorded' });
    }

    // Record the view
    const profileView = new ProfileView({
      viewer: req.userId,
      viewedProfile: viewedUserId
    });

    await profileView.save();

    // Create notification
    const notification = new Notification({
      user: viewedUserId,
      from: req.userId,
      type: 'profile_viewed',
      message: 'viewed your profile'
    });

    await notification.save();

    res.json({ success: true, message: 'Profile view recorded' });
  } catch (error) {
    console.error('Record profile view error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/profile-views/my-views
// @desc    Get who viewed my profile
// @access  Private
router.get('/my-views', auth, async (req, res) => {
  try {
    const views = await ProfileView.find({ viewedProfile: req.userId })
      .populate('viewer', 'name age location gender profileImage education profession')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, views });
  } catch (error) {
    console.error('Get profile views error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

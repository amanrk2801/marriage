const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET /api/profiles
// @desc    Get all profiles with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { gender, ageMin, ageMax, religion, caste, location, page = 1, limit = 6 } = req.query;

    // Build filter query
    const filter = {
      // MVP: Show all profiles (uncomment below line when enabling payment)
      // profilePublished: true
    };
    
    if (gender && gender !== 'all' && gender !== 'undefined') {
      filter.gender = gender;
    }
    if (religion && religion !== 'all' && religion !== 'undefined') {
      filter.religion = new RegExp(religion, 'i');
    }
    if (caste && caste !== 'all' && caste !== 'undefined') {
      filter.caste = new RegExp(caste, 'i');
    }
    if (location && location !== 'undefined') {
      filter.location = new RegExp(location, 'i');
    }
    if (ageMin || ageMax) {
      filter.age = {};
      if (ageMin) filter.age.$gte = parseInt(ageMin);
      if (ageMax) filter.age.$lte = parseInt(ageMax);
    }

    console.log('Profile filter:', JSON.stringify(filter));
    console.log('Query params:', { gender, ageMin, ageMax, religion, caste, location });

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get profiles
    const profiles = await User.find(filter)
      .select('-password')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    // Get total count
    const total = await User.countDocuments(filter);
    const totalUsers = await User.countDocuments({});

    console.log(`Found ${profiles.length} profiles out of ${total} matching filter`);
    console.log(`Total users in database: ${totalUsers}`);

    res.json({
      success: true,
      profiles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get profiles error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   GET /api/profiles/:id
// @desc    Get profile by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const profile = await User.findById(req.params.id).select('-password');
    
    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    res.json({
      success: true,
      profile
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PUT /api/profiles/me
// @desc    Update current user profile
// @access  Private
router.put('/me', auth, async (req, res) => {
  try {
    const updates = req.body;
    
    // Remove fields that shouldn't be updated
    delete updates.password;
    delete updates.email;
    delete updates._id;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

module.exports = router;

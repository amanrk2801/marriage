const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// @route   POST /api/messages
// @desc    Send message
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { toUserId, content } = req.body;

    if (!content || content.trim().length < 1) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot be empty'
      });
    }

    // MVP: Allow all messaging (uncomment below when enabling interest-based messaging)
    /*
    // Check if there's a mutual accepted interest
    const Interest = require('../models/Interest');
    const mutualInterest = await Interest.findOne({
      $or: [
        { from: req.userId, to: toUserId, status: 'accepted' },
        { from: toUserId, to: req.userId, status: 'accepted' }
      ]
    });

    if (!mutualInterest) {
      return res.status(403).json({
        success: false,
        message: 'You can only message users who have accepted your interest or whose interest you have accepted'
      });
    }
    */

    const message = new Message({
      from: req.userId,
      to: toUserId,
      content: content.trim()
    });

    await message.save();

    // Create notification
    const notification = new Notification({
      user: toUserId,
      from: req.userId,
      type: 'new_message',
      message: 'sent you a message'
    });

    await notification.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/messages/conversations/list
// @desc    Get all conversations for current user
// @access  Private
router.get('/conversations/list', auth, async (req, res) => {
  try {
    // Get all messages involving the user
    const messages = await Message.find({
      $or: [{ from: req.userId }, { to: req.userId }]
    })
    .populate('from', 'name age location gender profileImage')
    .populate('to', 'name age location gender profileImage')
    .sort({ createdAt: -1 });

    // Group by conversation partner
    const conversationsMap = new Map();
    
    messages.forEach(msg => {
      const partnerId = msg.from._id.toString() === req.userId.toString() 
        ? msg.to._id.toString() 
        : msg.from._id.toString();
      
      if (!conversationsMap.has(partnerId)) {
        const partner = msg.from._id.toString() === req.userId.toString() ? msg.to : msg.from;
        conversationsMap.set(partnerId, {
          userId: partner._id,
          name: partner.name,
          age: partner.age,
          location: partner.location,
          gender: partner.gender,
          profileImage: partner.profileImage,
          lastMessage: msg.content,
          lastMessageTime: msg.createdAt,
          unreadCount: 0 // Can be implemented later
        });
      }
    });

    const conversations = Array.from(conversationsMap.values());

    res.json({
      success: true,
      conversations
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/messages/:userId
// @desc    Get conversation with a user
// @access  Private
router.get('/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { from: req.userId, to: req.params.userId },
        { from: req.params.userId, to: req.userId }
      ]
    })
    .populate('from', 'name profileImage')
    .populate('to', 'name profileImage')
    .sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      { from: req.params.userId, to: req.userId, read: false },
      { read: true }
    );

    res.json({
      success: true,
      messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const User = require('../models/User');
const auth = require('../middleware/auth');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Payment configuration
const PROFILE_PUBLISH_AMOUNT = 49900; // ₹499 in paise (Razorpay uses paise)

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
});

// @route   POST /api/payment/create-order
// @desc    Create Razorpay order
// @access  Private
router.post('/create-order', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user already has a published profile
    if (user.profilePublished) {
      return res.status(400).json({
        success: false,
        message: 'Your profile is already published'
      });
    }

    // Create Razorpay order
    const options = {
      amount: PROFILE_PUBLISH_AMOUNT, // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: req.userId.toString(),
        userName: user.name,
        userEmail: user.email,
        description: 'Profile Publishing Fee'
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create payment record in database
    const payment = new Payment({
      user: req.userId,
      orderId: razorpayOrder.id,
      amount: PROFILE_PUBLISH_AMOUNT / 100, // Store in rupees
      currency: 'INR',
      description: 'Profile Publishing Fee',
      status: 'created'
    });

    await payment.save();

    console.log('Razorpay order created:', razorpayOrder.id);

    res.json({
      success: true,
      order: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy'
      },
      user: {
        name: user.name,
        email: user.email,
        contact: user.mobile
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/payment/verify
// @desc    Verify Razorpay payment and publish profile
// @access  Private
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment details'
      });
    }

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Find payment record
    const payment = await Payment.findOne({ 
      orderId: razorpay_order_id, 
      user: req.userId 
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment record not found'
      });
    }

    // Update payment status
    payment.status = 'completed';
    payment.paymentId = razorpay_payment_id;
    payment.paidAt = new Date();
    await payment.save();

    // Update user profile
    const user = await User.findById(req.userId);
    user.profilePublished = true;
    user.isPremium = true;
    user.paymentStatus = 'completed';
    user.paymentDetails = {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: payment.amount,
      currency: payment.currency,
      paidAt: payment.paidAt
    };
    await user.save();

    console.log('Payment verified successfully for user:', req.userId);

    res.json({
      success: true,
      message: 'Payment verified successfully. Your profile is now published!',
      profilePublished: true
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/payment/status
// @desc    Get payment status
// @access  Private
router.get('/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('profilePublished isPremium paymentStatus paymentDetails');

    res.json({
      success: true,
      profilePublished: user.profilePublished,
      isPremium: user.isPremium,
      paymentStatus: user.paymentStatus,
      paymentDetails: user.paymentDetails
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/payment/history
// @desc    Get payment history
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      payments
    });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  paymentId: String,
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['created', 'pending', 'completed', 'failed'],
    default: 'created'
  },
  paymentMethod: String,
  paymentGateway: {
    type: String,
    default: 'razorpay'
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  paidAt: Date
});

// Index for faster queries
paymentSchema.index({ user: 1, status: 1 });
paymentSchema.index({ orderId: 1 });

module.exports = mongoose.model('Payment', paymentSchema);

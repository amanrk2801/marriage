const mongoose = require('mongoose');

const idVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  idType: {
    type: String,
    enum: ['pan', 'driving_license', 'voter_id', 'passport', 'aadhaar'],
    required: true
  },
  idNumber: {
    type: String,
    required: true,
    trim: true
  },
  idImageFront: {
    type: String,
    required: true
  },
  idImageBack: {
    type: String
  },
  selfieWithId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rejectionReason: String,
  notes: String
});

// Index for faster queries
idVerificationSchema.index({ userId: 1 });
idVerificationSchema.index({ status: 1 });
idVerificationSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('IDVerification', idVerificationSchema);

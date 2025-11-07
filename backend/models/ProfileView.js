const mongoose = require('mongoose');

const profileViewSchema = new mongoose.Schema({
  viewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  viewedProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // Auto-delete after 30 days
  }
});

// Index for faster queries
profileViewSchema.index({ viewedProfile: 1, createdAt: -1 });
profileViewSchema.index({ viewer: 1, viewedProfile: 1, createdAt: -1 });

module.exports = mongoose.model('ProfileView', profileViewSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  mobile: {
    type: String,
    trim: true
  },
  profileFor: {
    type: String,
    enum: ['self', 'son', 'daughter', 'brother', 'sister', 'friend', 'relative'],
    default: 'self'
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  age: Number,
  dateOfBirth: Date,
  height: String,
  religion: String,
  caste: String,
  motherTongue: String,
  maritalStatus: {
    type: String,
    enum: ['never_married', 'divorced', 'widowed', 'separated'],
    default: 'never_married'
  },
  location: String,
  education: String,
  profession: String,
  income: String,
  about: String,
  partnerPreferences: {
    ageRange: String,
    heightRange: String,
    religion: String,
    caste: String,
    education: String,
    profession: String,
    location: String,
    description: String
  },
  familyType: {
    type: String,
    enum: ['joint', 'nuclear']
  },
  fatherOccupation: String,
  motherOccupation: String,
  siblings: String,
  profileImage: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  idVerified: {
    type: Boolean,
    default: false
  },
  idVerifiedAt: Date,
  idVerificationType: {
    type: String,
    enum: ['pan', 'driving_license', 'voter_id', 'passport', 'aadhaar']
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  profilePublished: {
    type: Boolean,
    default: true  // MVP: Auto-publish all profiles (change to false when enabling payment)
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'  // MVP: Not enforced (enforce when enabling payment)
  },
  paymentDetails: {
    orderId: String,
    paymentId: String,
    amount: Number,
    currency: String,
    paidAt: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update timestamp
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);

/**
 * Test Cloudinary Configuration
 * Run this file to verify your Cloudinary credentials are set up correctly
 * 
 * Usage: node test-cloudinary.js
 */

require('dotenv').config();
const { cloudinary } = require('./config/cloudinary');

console.log('🔍 Testing Cloudinary Configuration...\n');

// Check if environment variables are set
console.log('Environment Variables:');
console.log('✓ CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Not Set');
console.log('✓ CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Not Set');
console.log('✓ CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Not Set');

console.log('\n📡 Testing Cloudinary Connection...\n');

// Test connection by pinging Cloudinary API
cloudinary.api.ping()
  .then(result => {
    console.log('✅ SUCCESS! Cloudinary connection is working!\n');
    console.log('Response:', result);
    console.log('\n🎉 You can now start uploading images to Cloudinary!');
    console.log('📸 Images will be stored in: matrimony/profiles/');
    process.exit(0);
  })
  .catch(error => {
    console.log('❌ ERROR! Cloudinary connection failed!\n');
    console.log('Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your .env file has the correct Cloudinary credentials');
    console.log('2. Make sure there are no extra spaces in your .env values');
    console.log('3. Verify your credentials at: https://console.cloudinary.com/');
    process.exit(1);
  });

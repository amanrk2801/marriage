# Cloudinary Integration Setup Guide

## Overview
This application now uses Cloudinary for reliable cloud-based image storage instead of local file storage. This ensures:
- ✅ Images never crash or disappear after some days
- ✅ Fast, optimized image delivery via CDN
- ✅ Automatic image optimization and transformations
- ✅ Reliable backup and storage

## Setup Instructions

### Step 1: Create a Free Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a free account (no credit card required)
3. Verify your email address

### Step 2: Get Your Cloudinary Credentials

1. After logging in, you'll see your **Dashboard**
2. Copy the following credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

   You can find these in the "Product Environment Credentials" section or at:
   [https://console.cloudinary.com/](https://console.cloudinary.com/)

### Step 3: Configure Environment Variables

1. Navigate to the `backend` folder
2. Create a `.env` file (or update existing one)
3. Add your Cloudinary credentials:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

**Important:** Replace the values with your actual credentials from Step 2.

### Step 4: Install Dependencies (Already Done)

The required packages have been installed:
- `cloudinary` - Official Cloudinary SDK
- `multer-storage-cloudinary` - Multer storage engine for Cloudinary

If you need to reinstall:
```bash
cd backend
npm install cloudinary multer-storage-cloudinary
```

### Step 5: Start the Server

```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

## What Changed?

### Files Modified:
1. **backend/config/cloudinary.js** (NEW)
   - Cloudinary configuration and multer setup
   - Automatic image optimization (max 800x800, quality auto)
   - Organized storage in `matrimony/profiles` folder

2. **backend/routes/upload.js** (UPDATED)
   - Now uploads directly to Cloudinary
   - Automatically deletes old images when uploading new ones
   - Returns Cloudinary URLs instead of local paths

3. **backend/.env.example** (UPDATED)
   - Added Cloudinary configuration template

### How It Works:

**Before (Local Storage):**
- Images saved to `backend/uploads/profiles/`
- Images could be lost if server restarted or folder deleted
- Local URLs like `/uploads/profiles/image.jpg`

**After (Cloudinary):**
- Images uploaded directly to Cloudinary cloud
- Images stored permanently with backup
- Cloudinary URLs like `https://res.cloudinary.com/your-cloud/image/upload/v123/matrimony/profiles/profile-123.jpg`
- Automatic CDN delivery for fast loading worldwide
- Automatic image optimization

## Testing the Integration

### Test Profile Photo Upload:

1. Start your backend server
2. Log in to your application
3. Go to Profile Settings
4. Upload a profile photo

**Expected Behavior:**
- Image uploads to Cloudinary
- You'll get a Cloudinary URL in response
- Image is accessible worldwide via CDN
- Old images are automatically deleted from Cloudinary

### Verify Upload:

1. Check your Cloudinary Dashboard: [https://console.cloudinary.com/](https://console.cloudinary.com/)
2. Go to "Media Library"
3. Navigate to `matrimony/profiles` folder
4. You should see your uploaded images

## Benefits of Cloudinary

1. **Reliability:** Images never disappear or crash
2. **Performance:** CDN delivery for fast loading globally
3. **Optimization:** Automatic format and quality optimization
4. **Transformations:** Resize, crop, and optimize on-the-fly
5. **Storage:** Secure cloud storage with backups
6. **Free Tier:** 25GB storage, 25GB bandwidth/month

## Troubleshooting

### Issue: "Invalid Cloudinary credentials"
**Solution:** Double-check your credentials in `.env` file

### Issue: "CLOUDINARY_CLOUD_NAME is not defined"
**Solution:** Make sure you created `.env` file in the `backend` folder and added all credentials

### Issue: Images not uploading
**Solution:** 
1. Check server console for errors
2. Verify Cloudinary credentials are correct
3. Ensure you're using the correct API endpoint `/api/upload/profile-photo`

### Issue: Old local images still showing
**Solution:** This is normal. Existing users with local images will keep them until they upload a new photo. New uploads will use Cloudinary.

## Migration Notes

**Existing Users:**
- Users with existing local images will continue to see them
- When they upload a new photo, it will go to Cloudinary
- You can optionally migrate existing images to Cloudinary later

**Database:**
- No changes to User model required
- `profileImage` field stores either:
  - Local path: `/uploads/profiles/image.jpg` (old)
  - Cloudinary URL: `https://res.cloudinary.com/...` (new)

## Free Tier Limits

Cloudinary Free Plan includes:
- 25 GB storage
- 25 GB bandwidth per month
- 25 credits per month
- Transformations and optimization

This is sufficient for most small to medium applications.

## Support

For Cloudinary-specific issues, refer to:
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Node.js SDK Guide](https://cloudinary.com/documentation/node_integration)
- [Support](https://support.cloudinary.com/)

---

**Setup Complete!** 🎉

Your matrimony application now uses reliable cloud storage for all profile images.

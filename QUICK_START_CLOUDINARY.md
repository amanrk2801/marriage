# Quick Start: Add Cloudinary Credentials

## Step 1: Get Free Cloudinary Account
1. Go to: https://cloudinary.com/users/register/free
2. Sign up (free, no credit card needed)
3. Verify your email

## Step 2: Get Your Credentials
1. Login to: https://console.cloudinary.com/
2. You'll see three credentials on your dashboard:
   - **Cloud Name**
   - **API Key**  
   - **API Secret**

## Step 3: Add to Your .env File

Create or edit `backend/.env` and add:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**IMPORTANT:** Replace the values above with your actual credentials!

## Step 4: Restart Your Server

```bash
cd backend
npm start
```

## Done! 🎉

Test by uploading a profile photo. It will now be stored on Cloudinary permanently!

### Where to Find Your Images:
- Cloudinary Dashboard → Media Library → matrimony/profiles

---

**Need Help?** Check CLOUDINARY_SETUP.md for detailed instructions.

# 🚀 MatrimonyHub - Complete Deployment Guide

This guide will help you deploy your MatrimonyHub application to production.

---

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Backend Deployment (Render/Railway)](#backend-deployment)
4. [Frontend Deployment (Vercel/Netlify)](#frontend-deployment)
5. [Razorpay Production Setup](#razorpay-production-setup)
6. [Domain Configuration](#domain-configuration)
7. [Post-Deployment Testing](#post-deployment-testing)
8. [Monitoring & Maintenance](#monitoring--maintenance)

---

## ✅ Pre-Deployment Checklist

### 1. Code Preparation

- [ ] All features tested locally
- [ ] No console.log statements in production code
- [ ] Environment variables documented
- [ ] Error handling implemented
- [ ] Security measures in place
- [ ] Database indexes created
- [ ] API rate limiting configured (optional)

### 2. Required Accounts

Create accounts on these platforms:

- [ ] **MongoDB Atlas** - https://www.mongodb.com/cloud/atlas (Free tier available)
- [ ] **Render** or **Railway** - For backend hosting (Free tier available)
- [ ] **Vercel** or **Netlify** - For frontend hosting (Free tier available)
- [ ] **Razorpay** - https://dashboard.razorpay.com/ (For payments)
- [ ] **Domain Provider** (Optional) - GoDaddy, Namecheap, etc.

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and sign up
3. Choose "Shared" (Free tier)
4. Select your cloud provider (AWS recommended)
5. Choose region closest to your users (e.g., Mumbai for India)
6. Click "Create Cluster"

### Step 2: Configure Database Access

1. Go to **Database Access** in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `matrimony_admin`
5. Password: Generate a strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 3: Configure Network Access

1. Go to **Network Access** in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

⚠️ **Note:** For production, restrict to specific IPs for better security

### Step 4: Get Connection String

1. Go to **Database** → Click "Connect"
2. Choose "Connect your application"
3. Driver: Node.js, Version: 4.1 or later
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `myFirstDatabase` with `matrimony`

Example:
```
mongodb+srv://matrimony_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/matrimony?retryWrites=true&w=majority
```

---

## 🖥️ Backend Deployment

### Option A: Deploy to Render (Recommended - Free Tier)

#### Step 1: Prepare Backend for Deployment

1. **Create `package.json` start script** (if not exists):

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

2. **Create `.gitignore` in backend folder**:

```
node_modules/
.env
uploads/
*.log
```

3. **Ensure all dependencies are in package.json**:

```bash
cd backend
npm install
```

#### Step 2: Push Code to GitHub

1. **Initialize Git** (if not done):

```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Name: `matrimonyhub-backend`
   - Click "Create repository"

3. **Push to GitHub**:

```bash
git remote add origin https://github.com/YOUR_USERNAME/matrimonyhub-backend.git
git branch -M main
git push -u origin main
```

#### Step 3: Deploy on Render

1. Go to https://render.com/ and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** matrimonyhub-backend
   - **Region:** Choose closest to your users
   - **Branch:** main
   - **Root Directory:** backend (if backend is in subfolder)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

5. **Add Environment Variables**:

Click "Advanced" → "Add Environment Variable":

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://matrimony_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/matrimony
JWT_SECRET=your_super_secret_production_jwt_key_min_32_characters_random
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_live_key_secret
```

6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. Copy your backend URL: `https://matrimonyhub-backend.onrender.com`

---

### Option B: Deploy to Railway (Alternative)

1. Go to https://railway.app/ and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables (same as above)
5. Deploy
6. Copy your backend URL

---

## 🌐 Frontend Deployment

### Option A: Deploy to Vercel (Recommended)

#### Step 1: Prepare Frontend

1. **Update `.env` with production backend URL**:

```env
REACT_APP_API_URL=https://matrimonyhub-backend.onrender.com/api
```

2. **Test build locally**:

```bash
npm run build
```

3. **Create `.gitignore` in root**:

```
node_modules/
build/
.env.local
.DS_Store
```

#### Step 2: Push to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### Step 3: Deploy on Vercel

1. Go to https://vercel.com/ and sign up
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** ./ (or leave empty)
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

5. **Add Environment Variable**:

```
REACT_APP_API_URL=https://matrimonyhub-backend.onrender.com/api
```

6. Click "Deploy"
7. Wait 2-3 minutes
8. Your site is live! Copy URL: `https://matrimonyhub.vercel.app`

---

### Option B: Deploy to Netlify (Alternative)

1. Go to https://www.netlify.com/ and sign up
2. Drag and drop your `build` folder, OR
3. Connect GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Add environment variables
6. Deploy

---

## 💳 Razorpay Production Setup

### Step 1: Complete KYC

1. Go to https://dashboard.razorpay.com/
2. Complete business KYC verification
3. Add business details
4. Add bank account
5. Wait for approval (1-2 days)

### Step 2: Get Live API Keys

1. Go to Settings → API Keys
2. Switch to "Live Mode"
3. Generate Live Keys
4. Copy **Key ID** and **Key Secret**

### Step 3: Update Backend Environment Variables

On Render/Railway, update:

```
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_secret
```

### Step 4: Test Payment

1. Make a small test payment (₹1)
2. Verify it appears in Razorpay dashboard
3. Check if profile gets published

---

## 🌍 Domain Configuration (Optional)

### Step 1: Buy Domain

1. Go to GoDaddy, Namecheap, or Google Domains
2. Search for your domain (e.g., matrimonyhub.com)
3. Purchase domain (~₹500-1000/year)

### Step 2: Configure DNS

#### For Frontend (Vercel):

1. In Vercel, go to Project Settings → Domains
2. Add your domain: `matrimonyhub.com`
3. Copy the DNS records shown
4. In your domain provider, add these records:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

#### For Backend (Render):

1. In Render, go to Settings → Custom Domain
2. Add: `api.matrimonyhub.com`
3. Add CNAME record in domain provider:
   - Type: CNAME, Name: api, Value: matrimonyhub-backend.onrender.com

### Step 3: Update Frontend Environment

```env
REACT_APP_API_URL=https://api.matrimonyhub.com/api
```

Redeploy frontend on Vercel.

---

## 🧪 Post-Deployment Testing

### Test Checklist

- [ ] **Homepage loads** - Visit your domain
- [ ] **User Registration** - Create a new account
- [ ] **Email verification** - Check if emails work (if implemented)
- [ ] **Login** - Login with created account
- [ ] **Profile Creation** - Fill profile details
- [ ] **Photo Upload** - Upload profile photo
- [ ] **Search** - Search for profiles
- [ ] **Send Interest** - Send interest to a profile
- [ ] **Accept Interest** - Accept an interest
- [ ] **Messaging** - Send and receive messages
- [ ] **Payment** - Test Razorpay payment with ₹1
- [ ] **Profile Publishing** - Verify profile becomes visible
- [ ] **Notifications** - Check if notifications work
- [ ] **Mobile Responsive** - Test on mobile device
- [ ] **Different Browsers** - Test on Chrome, Firefox, Safari

### Performance Testing

1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **GTmetrix**: https://gtmetrix.com/
3. **Lighthouse** (Chrome DevTools)

---

## 📊 Monitoring & Maintenance

### 1. Error Monitoring

**Sentry** (Recommended):

```bash
npm install @sentry/react @sentry/node
```

Add to frontend and backend for error tracking.

### 2. Analytics

**Google Analytics**:

1. Create account at https://analytics.google.com/
2. Add tracking code to `public/index.html`

### 3. Uptime Monitoring

**UptimeRobot** (Free):

1. Go to https://uptimerobot.com/
2. Add your website URL
3. Get alerts if site goes down

### 4. Database Backups

**MongoDB Atlas**:

1. Go to Backup tab
2. Enable automated backups
3. Set backup schedule

### 5. SSL Certificate

Both Vercel and Render provide free SSL certificates automatically.

Verify: Your site should show 🔒 in browser.

---

## 🔒 Security Checklist

- [ ] HTTPS enabled (SSL certificate)
- [ ] Environment variables secured
- [ ] JWT secret is strong and random
- [ ] MongoDB credentials are strong
- [ ] Razorpay keys are in production mode
- [ ] CORS configured properly
- [ ] Rate limiting enabled (optional)
- [ ] Input validation on all forms
- [ ] XSS protection enabled
- [ ] SQL injection prevention
- [ ] File upload restrictions
- [ ] Password hashing (bcrypt)

---

## 💰 Cost Estimation

### Free Tier (Recommended for Starting)

- **MongoDB Atlas:** Free (512MB storage)
- **Render/Railway:** Free (750 hours/month)
- **Vercel/Netlify:** Free (100GB bandwidth)
- **Total:** ₹0/month

### Paid Tier (For Growth)

- **MongoDB Atlas:** $9/month (2GB storage)
- **Render:** $7/month (512MB RAM)
- **Vercel Pro:** $20/month (unlimited bandwidth)
- **Domain:** ₹1000/year
- **Total:** ~₹3000/month

---

## 🐛 Common Issues & Solutions

### Issue 1: Backend Not Connecting

**Solution:**
- Check MongoDB connection string
- Verify environment variables
- Check Render/Railway logs

### Issue 2: Payment Not Working

**Solution:**
- Verify Razorpay keys are live keys
- Check if KYC is completed
- Test with test keys first

### Issue 3: Images Not Loading

**Solution:**
- Check if uploads folder exists
- Verify file upload permissions
- Use cloud storage (Cloudinary) for production

### Issue 4: Slow Performance

**Solution:**
- Enable caching
- Optimize images
- Use CDN for static files
- Add database indexes

---

## 📞 Support Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Razorpay Docs:** https://razorpay.com/docs/

---

## 🎉 Congratulations!

Your MatrimonyHub app is now live! 🚀

**Next Steps:**

1. Share with friends and family for testing
2. Collect feedback
3. Fix bugs and improve features
4. Market your platform
5. Scale as you grow

---

## 📝 Quick Reference

### Backend URL
```
https://matrimonyhub-backend.onrender.com
```

### Frontend URL
```
https://matrimonyhub.vercel.app
```

### MongoDB Connection
```
mongodb+srv://username:password@cluster.mongodb.net/matrimony
```

### Razorpay Dashboard
```
https://dashboard.razorpay.com/
```

---

**Made with ❤️ - Good luck with your launch!** 🎊

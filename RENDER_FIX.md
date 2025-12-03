# 🔧 Fix Render Deployment Error

## Problem
Render is trying to build from the root directory, but your backend is in the `backend` subfolder.

---

## ✅ Solution: Configure Render Correctly

### Step 1: Update Render Service Settings

1. Go to your Render dashboard: https://dashboard.render.com/
2. Click on your service (matrimonyhub-backend)
3. Click **"Settings"** in the left sidebar
4. Scroll down to **"Build & Deploy"** section

### Step 2: Update These Settings

**Root Directory:**
```
backend
```

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

### Step 3: Save and Redeploy

1. Click **"Save Changes"** at the bottom
2. Go to **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait 5-10 minutes for deployment

---

## 🎯 Alternative: Deploy Backend Separately

If the above doesn't work, create a separate repository for backend:

### Step 1: Create Backend Repository

```bash
# Navigate to backend folder
cd backend

# Initialize git
git init
git add .
git commit -m "Initial backend commit"

# Create new repo on GitHub
# Then push
git remote add origin https://github.com/amanrk2801/matrimony-backend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to Render → New Web Service
2. Connect `matrimony-backend` repository
3. Settings:
   - **Name:** matrimonyhub-backend
   - **Root Directory:** (leave empty)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

4. Add Environment Variables:
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://matrimony_admin:Aman28011997@cluster0.jjwf5ql.mongodb.net/matrimony?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=MatrimonyHub_2024_Super_Secret_Production_Key_Random_String_32_Plus_Chars
RAZORPAY_KEY_ID=rzp_test_Rc0m1fZQ181lnd
RAZORPAY_KEY_SECRET=wxj37aLseJqkIf4O3uh1PUVI
```

5. Click **"Create Web Service"**

---

## 📋 Verify Deployment

Once deployed successfully, you should see:

```
==> Your service is live 🎉
https://matrimonyhub-backend.onrender.com
```

### Test Your Backend

Open in browser:
```
https://matrimonyhub-backend.onrender.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "MatrimonyHub API is running",
  "timestamp": "2024-12-03T07:55:22.883Z"
}
```

---

## 🚨 Common Issues

### Issue 1: "Cannot find module"
**Solution:** Make sure all dependencies are in package.json

### Issue 2: "Port already in use"
**Solution:** Render automatically assigns port. Your code should use `process.env.PORT`

### Issue 3: "MongoDB connection failed"
**Solution:** 
- Check MongoDB URI is correct
- Verify IP whitelist (0.0.0.0/0)
- Check username/password

---

## ✅ Success Checklist

- [ ] Root Directory set to `backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] All environment variables added
- [ ] MongoDB URI is correct
- [ ] Service deployed successfully
- [ ] Health check endpoint works
- [ ] Can register a user via API

---

## 📞 Need Help?

If still facing issues:
1. Check Render logs: Dashboard → Logs
2. Look for error messages
3. Verify all environment variables
4. Test MongoDB connection locally first

---

**Once backend is deployed, copy the URL and update frontend!**

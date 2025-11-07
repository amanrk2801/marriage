# 💑 MatrimonyHub - Complete Matrimonial Web Application

A full-featured, production-ready matrimonial web application built with React, Node.js, Express, and MongoDB. Find your perfect life partner with advanced matching algorithms, real-time messaging, and secure interest management.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%3E%3D4.4-green)](https://www.mongodb.com/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Features in Detail](#-features-in-detail)
- [Security](#-security)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## ✨ Features

### Core Functionality
- ✅ **User Authentication** - Secure JWT-based registration and login
- ✅ **Profile Management** - Complete profile creation with photo upload
- ✅ **Advanced Search** - Filter by age, religion, caste, location, education
- ✅ **Smart Matching** - Algorithm-based compatible profile suggestions
- ✅ **Interest System** - Send, receive, accept, and reject interests
- ✅ **Real-time Messaging** - Chat with matched profiles (interest-based)
- ✅ **Notifications** - Real-time alerts for interests, messages, profile views
- ✅ **Shortlist Profiles** - Save favorite profiles for later review
- ✅ **Profile Views Tracking** - See who viewed your profile
- ✅ **Success Stories** - Showcase successful matches

### Technical Features
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Auto-login** - Persistent sessions across page refreshes
- ✅ **Real-time Updates** - Polling for new messages and notifications
- ✅ **Secure API** - JWT authentication with protected routes
- ✅ **Image Upload** - Multer integration for profile photos
- ✅ **Data Validation** - Express-validator for input sanitization
- ✅ **Error Handling** - Comprehensive error boundaries and logging
- ✅ **Interest-Based Messaging** - Users can only message after mutual interest acceptance

---

## 🎬 Demo

### Screenshots

**Home Page - Profile Search**
- Advanced filters for finding perfect matches
- Grid view with profile cards
- Instant shortlist functionality

**Interests Management**
- Sent and received interests tracking
- Accept/Reject with one click
- Real-time status updates

**Messaging System**
- Clean chat interface
- Real-time message delivery
- Interest-based access control

**Notifications**
- Categorized notifications
- Mark as read functionality
- Action buttons for quick responses

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **React Hooks** - State management
- **Axios** - HTTP client
- **CSS3** - Styling (Flexbox, Grid)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **Express-validator** - Input validation
- **bcrypt** - Password hashing

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd marriage
```

2. **Install dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

3. **Setup environment variables**

Create `.env` in root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Create `.env` in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/matrimony
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

4. **Start MongoDB**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

5. **Start the application**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
npm start
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

## ⚙️ Configuration

### Environment Variables

#### Frontend (.env)
```env
# API URL for backend server
REACT_APP_API_URL=http://localhost:5000/api

# For production
# REACT_APP_API_URL=https://your-backend-url.com/api
```

#### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/matrimony

# For MongoDB Atlas (Production)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/matrimony

# JWT Secret (CHANGE IN PRODUCTION!)
JWT_SECRET=your_super_secret_jwt_key_min_32_characters

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/webp
```

---

## 📁 Project Structure

```
marriage/
├── backend/
│   ├── models/              # MongoDB models
│   │   ├── User.js
│   │   ├── Interest.js
│   │   ├── Message.js
│   │   ├── Notification.js
│   │   └── ProfileView.js
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── profiles.js
│   │   ├── interests.js
│   │   ├── messages.js
│   │   ├── notifications.js
│   │   ├── upload.js
│   │   └── profileViews.js
│   ├── middleware/          # Custom middleware
│   │   └── auth.js
│   ├── uploads/             # Uploaded images
│   ├── server.js            # Express server
│   ├── package.json
│   └── .env
├── src/
│   ├── components/          # React components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── ProfileCard.js
│   │   ├── ProfileView.js
│   │   ├── ProfileList.js
│   │   ├── ProfileSettings.js
│   │   ├── SearchBar.js
│   │   ├── Messages.js
│   │   ├── Notifications.js
│   │   ├── Interests.js
│   │   ├── Matches.js
│   │   ├── Shortlisted.js
│   │   ├── SuccessStories.js
│   │   ├── InterestModal.js
│   │   ├── MessageModal.js
│   │   └── ErrorBoundary.js
│   ├── services/            # API services
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
├── .env
├── .env.example
├── package.json
└── README.md
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "mobile": "1234567890",
  "gender": "male",
  "religion": "Hindu",
  "caste": "Brahmin"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Profile Endpoints

#### Get All Profiles
```http
GET /api/profiles?gender=male&ageMin=25&ageMax=35&religion=hindu
```

#### Get Profile by ID
```http
GET /api/profiles/:id
```

#### Update Own Profile
```http
PUT /api/profiles/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "age": 28,
  "location": "Mumbai",
  "education": "MBA",
  "profession": "Software Engineer"
}
```

### Interest Endpoints

#### Send Interest
```http
POST /api/interests
Authorization: Bearer <token>
Content-Type: application/json

{
  "toUserId": "user_id_here"
}
```

#### Accept Interest
```http
PUT /api/interests/:id/accept
Authorization: Bearer <token>
```

#### Reject Interest
```http
PUT /api/interests/:id/reject
Authorization: Bearer <token>
```

#### Get Sent Interests
```http
GET /api/interests/sent
Authorization: Bearer <token>
```

#### Get Received Interests
```http
GET /api/interests/received
Authorization: Bearer <token>
```

### Message Endpoints

#### Send Message
```http
POST /api/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "toUserId": "user_id_here",
  "content": "Hello! Nice to meet you."
}
```

#### Get Conversation
```http
GET /api/messages/:userId
Authorization: Bearer <token>
```

#### Get All Conversations
```http
GET /api/messages/conversations/list
Authorization: Bearer <token>
```

### Notification Endpoints

#### Get All Notifications
```http
GET /api/notifications
Authorization: Bearer <token>
```

#### Mark as Read
```http
PUT /api/notifications/:id/read
Authorization: Bearer <token>
```

#### Mark All as Read
```http
PUT /api/notifications/mark-all-read
Authorization: Bearer <token>
```

#### Delete Notification
```http
DELETE /api/notifications/:id
Authorization: Bearer <token>
```

### Profile View Endpoints

#### Record Profile View
```http
POST /api/profile-views
Authorization: Bearer <token>
Content-Type: application/json

{
  "viewedUserId": "user_id_here"
}
```

#### Get Who Viewed My Profile
```http
GET /api/profile-views/my-views
Authorization: Bearer <token>
```

### Upload Endpoints

#### Upload Profile Photo
```http
POST /api/upload/profile-photo
Authorization: Bearer <token>
Content-Type: multipart/form-data

photo: <file>
```

#### Delete Profile Photo
```http
DELETE /api/upload/profile-photo
Authorization: Bearer <token>
```

---

## 🎯 Features in Detail

### 1. User Authentication
- Secure password hashing with bcrypt
- JWT token generation and validation
- Auto-login on page refresh
- Protected routes and API endpoints

### 2. Profile Management
- Complete profile information (personal, family, preferences)
- Photo upload with validation (max 5MB, JPG/PNG/WEBP)
- Profile completion tracking
- Edit profile functionality

### 3. Advanced Search & Filters
- Filter by gender, age range, religion, caste, location
- Real-time search results
- Pagination with infinite scroll
- Profile count display

### 4. Interest System
- Send interest to profiles
- View sent and received interests
- Accept or reject interests with one click
- Status tracking (pending, accepted, rejected)
- Automatic notification generation

### 5. Messaging System
- **Interest-based access control** - Can only message after mutual interest acceptance
- Real-time message delivery with polling
- Conversation list with last message preview
- Message history with timestamps
- Auto-scroll to latest message
- Character limit (500 characters)

### 6. Notifications
- Interest received/accepted notifications
- New message notifications
- Profile view notifications
- Mark as read/unread functionality
- Delete notifications
- Real-time updates every 30 seconds
- Action buttons for quick responses

### 7. Profile Views
- Automatic tracking when someone views your profile
- View history with timestamps
- Notification generation
- 24-hour duplicate prevention

### 8. Shortlist Feature
- Save favorite profiles
- Quick access to shortlisted profiles
- Remove from shortlist
- Visual indicator on profile cards

### 9. Matches
- Algorithm-based profile suggestions
- Opposite gender matching
- Age-appropriate recommendations
- Similar interests consideration

---

## 🔒 Security

### Implemented Security Measures

1. **Password Security**
   - Bcrypt hashing with salt rounds
   - Minimum 6 characters requirement
   - Never stored in plain text

2. **JWT Authentication**
   - Secure token generation
   - 7-day expiration
   - Token validation on protected routes

3. **Input Validation**
   - Express-validator for all inputs
   - XSS protection
   - SQL injection prevention

4. **File Upload Security**
   - File type validation
   - File size limits (5MB)
   - Secure filename generation

5. **API Security**
   - CORS configuration
   - Rate limiting ready
   - Protected endpoints

6. **Interest-Based Messaging**
   - Users can only message after mutual interest acceptance
   - Backend validation prevents unauthorized messaging
   - Frontend permission checks

---

## 🚀 Deployment

### Backend Deployment (Heroku)

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login and Create App**
```bash
heroku login
cd backend
heroku create your-app-name
```

3. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
```

4. **Deploy**
```bash
git push heroku main
```

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Build and Deploy**
```bash
npm run build
vercel --prod
```

3. **Set Environment Variable**
```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
```

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Whitelist your IP address
4. Create database user
5. Get connection string
6. Update `MONGODB_URI` in environment variables

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Problem:** `MongoNetworkError: failed to connect to server`

**Solutions:**
1. Check if MongoDB is running
2. Verify connection string in `.env`
3. Check firewall settings
4. For Atlas: Whitelist your IP

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### CORS Errors

**Problem:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions:**
1. Verify backend is running on port 5000
2. Check `REACT_APP_API_URL` in frontend `.env`
3. Clear browser cache
4. Restart both servers

### Image Upload Not Working

**Problem:** Images not uploading or displaying

**Solutions:**
1. Check `uploads` folder exists in backend
2. Verify folder permissions
3. Check file size (max 5MB)
4. Supported formats: JPG, JPEG, PNG, WEBP

### Users Not Showing in Frontend

**Problem:** Database has users but frontend shows empty

**Solutions:**
1. Check gender field in database (should be 'male' or 'female')
2. Verify backend is running
3. Check browser console for errors
4. Verify API URL in `.env`

### Interests Not Showing

**Problem:** Sent interest but not appearing in received interests

**Solutions:**
1. Check if InterestModal is calling the API
2. Verify backend logs for interest creation
3. Check if notification was created
4. Refresh the Interests page

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
```bash
git clone https://github.com/your-username/matrimonyhub.git
cd matrimonyhub
```

2. **Create a Branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make Your Changes**
- Write clean, readable code
- Follow existing code style
- Add comments where necessary
- Test your changes thoroughly

4. **Commit Your Changes**
```bash
git add .
git commit -m "Add: your feature description"
```

5. **Push to Your Fork**
```bash
git push origin feature/your-feature-name
```

6. **Create a Pull Request**
- Go to the original repository
- Click "New Pull Request"
- Select your branch
- Describe your changes
- Submit the PR

### Contribution Guidelines

#### Code Style
- Use meaningful variable and function names
- Follow React best practices
- Use ES6+ features
- Add PropTypes for React components
- Write clean, self-documenting code

#### Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Start with a capital letter
- Keep first line under 50 characters
- Add detailed description if needed

Examples:
```
Add user profile photo upload feature
Fix messaging system scroll behavior
Update README with deployment instructions
Refactor authentication middleware
```

#### Testing
- Test all new features thoroughly
- Test on different screen sizes
- Check browser console for errors
- Verify API responses
- Test edge cases

#### Documentation
- Update README if adding new features
- Add comments for complex logic
- Update API documentation
- Include screenshots for UI changes

### Areas for Contribution

#### High Priority
- [ ] Email verification system
- [ ] SMS notifications
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Advanced matching algorithm
- [ ] Video call integration

#### Medium Priority
- [ ] Horoscope matching
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Profile verification system
- [ ] Advanced search filters
- [ ] Export profile as PDF

#### Low Priority
- [ ] Social media integration
- [ ] Blog section
- [ ] Success stories submission
- [ ] Testimonials
- [ ] FAQ section
- [ ] Live chat support

### Reporting Bugs

Found a bug? Please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

### Feature Requests

Have an idea? Create an issue with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Mockups or examples if available

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

---

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 MatrimonyHub

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support

### Get Help

- **Documentation:** Read this README thoroughly
- **Issues:** [Create an issue](https://github.com/your-repo/issues)
- **Email:** support@matrimonyhub.com
- **Discord:** [Join our community](https://discord.gg/matrimonyhub)

### Frequently Asked Questions

**Q: Can I use this for commercial purposes?**
A: Yes, this project is MIT licensed and free for commercial use.

**Q: How do I add more religions/castes?**
A: Edit the SearchBar.js component and add options to the select dropdowns.

**Q: Can I customize the UI?**
A: Yes, all CSS files are included and can be modified.

**Q: Is this production-ready?**
A: Yes, but ensure you change JWT_SECRET and use MongoDB Atlas for production.

**Q: How do I add payment integration?**
A: You can integrate Stripe, PayPal, or Razorpay. Create a new route for payments.

---

## 🎉 Acknowledgments

- React team for the amazing framework
- MongoDB team for the database
- Express.js team for the backend framework
- All contributors who helped improve this project

---

## 📊 Project Stats

- **Total Files:** 50+
- **Lines of Code:** 10,000+
- **Components:** 20+
- **API Endpoints:** 25+
- **Database Models:** 5

---

## 🗺️ Roadmap

### Version 2.0 (Planned)
- [ ] Email verification
- [ ] SMS notifications
- [ ] Video call integration
- [ ] Payment gateway
- [ ] Admin dashboard
- [ ] Advanced analytics

### Version 3.0 (Future)
- [ ] Mobile app (React Native)
- [ ] AI-based matching
- [ ] Horoscope compatibility
- [ ] Multi-language support
- [ ] Live chat support
- [ ] Virtual events

---

## ⭐ Star History

If you find this project helpful, please consider giving it a star! ⭐

---

**Made with ❤️ for helping people find their perfect match!**

**Happy Coding! 🚀**
#   m a r r i a g e  
 
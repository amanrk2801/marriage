# MatrimonyHub - Complete Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/matrimony
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

### 4. Start MongoDB
```bash
# Windows
mongod

# Mac (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 5. Start backend server
```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

## Frontend Setup

### 1. Navigate to project root
```bash
cd ..
```

### 2. Install dependencies
```bash
npm install axios
```

### 3. Create environment file
```bash
cp .env.example .env
```

Edit `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start frontend
```bash
npm start
```

Frontend will run on: `http://localhost:3000`

## Testing the Application

### 1. Register a new user
- Go to `http://localhost:3000`
- Click "Register Free"
- Fill in the form
- Submit

### 2. Login
- Use the registered email and password
- You'll be logged in automatically

### 3. Test Features
- Browse profiles
- Send interests
- Send messages
- View notifications
- Update profile

## API Testing with Postman

### Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "gender": "male",
  "mobile": "1234567890"
}
```

### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profiles (with token)
```
GET http://localhost:5000/api/profiles
Authorization: Bearer <your_token>
```

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check MONGODB_URI in .env
- Try: `mongodb://127.0.0.1:27017/matrimony`

### CORS Error
- Backend CORS is enabled for all origins in development
- For production, update CORS settings in server.js

### Port Already in Use
- Change PORT in backend/.env
- Update REACT_APP_API_URL in frontend .env

## Production Deployment

### Backend
1. Set NODE_ENV=production
2. Use secure JWT_SECRET
3. Configure MongoDB Atlas or production database
4. Deploy to Heroku, AWS, or DigitalOcean

### Frontend
1. Build: `npm run build`
2. Deploy build folder to Netlify, Vercel, or AWS S3

## Database Schema

### Users Collection
- Authentication & profile data
- Personal information
- Preferences

### Interests Collection
- Interest requests
- Status tracking

### Messages Collection
- Direct messages
- Read status

### Notifications Collection
- User notifications
- Types: interest, message, profile view

## Security Features
- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Input validation
- XSS protection

## Next Steps
1. Add image upload functionality
2. Implement real-time chat with Socket.io
3. Add payment gateway for premium features
4. Email notifications
5. Advanced search filters
6. Admin dashboard

# MatrimonyHub Backend API

Backend API for MatrimonyHub matrimonial website built with Node.js, Express, and MongoDB.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/matrimony
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

### 4. Run the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Profiles
- `GET /api/profiles` - Get all profiles with filters
- `GET /api/profiles/:id` - Get profile by ID
- `PUT /api/profiles/me` - Update current user profile (Protected)

### Interests
- `POST /api/interests` - Send interest (Protected)
- `PUT /api/interests/:id/accept` - Accept interest (Protected)
- `GET /api/interests/sent` - Get sent interests (Protected)
- `GET /api/interests/received` - Get received interests (Protected)

### Messages
- `POST /api/messages` - Send message (Protected)
- `GET /api/messages/:userId` - Get conversation (Protected)

### Notifications
- `GET /api/notifications` - Get notifications (Protected)
- `PUT /api/notifications/:id/read` - Mark as read (Protected)
- `PUT /api/notifications/mark-all-read` - Mark all as read (Protected)
- `DELETE /api/notifications/:id` - Delete notification (Protected)

## Database Models

### User
- Personal information
- Profile details
- Authentication credentials

### Interest
- Interest requests between users
- Status tracking (pending/accepted/rejected)

### Message
- Direct messages between users
- Read status

### Notification
- User notifications
- Different types (interest, message, profile view)

## Authentication
Uses JWT (JSON Web Tokens) for authentication.
Include token in headers:
```
Authorization: Bearer <your_token>
```

## Testing the API
Use Postman or curl to test endpoints:
```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","gender":"male"}'
```

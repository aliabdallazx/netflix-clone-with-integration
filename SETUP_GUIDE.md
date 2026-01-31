# Netflix Clone - Complete Setup Guide

This guide covers setting up both the frontend React application and the backend Node.js/Express authentication server.

## 📋 Prerequisites

- **Node.js v16+** and npm installed
- **MongoDB** (local or MongoDB Atlas account)
- **TMDB API Key** from [The Movie Database](https://www.themoviedb.org/settings/api)
- **Git** for version control

## 🚀 Quick Start

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:3001**

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

Backend will run on: **http://localhost:5000**

---

## 🔧 Detailed Setup Instructions

### Frontend Configuration

#### Step 1: Install Dependencies
```bash
npm install
```

#### Step 2: Configure Environment Variables
Create `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

**Get TMDB API Key:**
1. Visit https://www.themoviedb.org/settings/api
2. Sign up/login to your account
3. Request API access (free tier)
4. Copy your API key to `.env`

#### Step 3: Start Development Server
```bash
npm run dev
```

Access the app at: **http://localhost:3001**

---

### Backend Configuration

#### Step 1: Navigate to Backend
```bash
cd backend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Configure Environment Variables
Create `backend/.env` file:

```env
# Backend Environment Variables
NODE_ENV=development
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflixCloneDB?appName=netflix-clone-db

# JWT Configuration
JWT_SECRET=your_long_random_secret_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:3001

# Cloudinary (Optional - for image uploads to cloud)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Step 4: Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# MongoDB will run on: mongodb://localhost:27017
```

Update `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/netflixCloneDB
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string from "Connect" button
4. Replace `<username>`, `<password>`, and `<cluster>` in the connection string
5. Update `.env` with your MongoDB Atlas connection string

#### Step 5: Start Development Server
```bash
npm run dev
```

Backend will run on: **http://localhost:5000**

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

---

## 🧪 Testing the System

### 1. Backend Health Check
```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "status": "OK",
  "message": "Netflix Clone API is running"
}
```

### 2. Test Authentication Flow

#### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response will include JWT token:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

#### Verify Token
```bash
curl -X POST http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Frontend Testing

1. **Signup**: Go to http://localhost:3001/signup
2. **Login**: Go to http://localhost:3001/login
3. **Profile**: Go to http://localhost:3001/profile (after login)
4. Check browser **localStorage** for `authToken`

---

## 📁 Project Structure

```
netflix-clone-with-integration/
├── src/
│   ├── components/
│   │   ├── Banner/
│   │   ├── Navbar/
│   │   ├── MovieCard/
│   │   ├── MovieRow/
│   │   ├── MovieModal/
│   │   ├── ProtectedRoute.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home/
│   │   ├── Auth/
│   │   │   ├── Login/
│   │   │   └── SignUp/
│   │   ├── Profile/
│   │   ├── Movies/
│   │   ├── TVShows/
│   │   └── ...
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── LanguageContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFetchMovies.js
│   │   └── ...
│   ├── services/
│   │   ├── api.js
│   │   └── requests.js
│   ├── App.jsx
│   ├── main.jsx
│   └── .env
│
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── uploadController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   └── upload.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .env (frontend config)
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔑 Environment Variables Reference

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |
| VITE_TMDB_API_KEY | TMDB API Key | your_api_key_here |
| VITE_TMDB_BASE_URL | TMDB Base URL | https://api.themoviedb.org/3 |
| VITE_TMDB_IMAGE_BASE_URL | TMDB Image Base URL | https://image.tmdb.org/t/p |

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Environment | development |
| PORT | Server Port | 5000 |
| MONGODB_URI | MongoDB Connection | mongodb://localhost:27017/netflixCloneDB |
| JWT_SECRET | JWT Secret Key | your_random_secret_key |
| JWT_EXPIRE | JWT Expiration | 7d |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3001 |

---

## 🚀 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Start with nodemon (hot reload)
npm run start    # Start with node
npm run test     # Run tests (placeholder)
```

---

## 🔐 Authentication Flow

1. **User Signs Up**: Provides firstName, lastName, email, password
2. **Password Hashing**: Backend hashes password with bcryptjs (10 rounds)
3. **JWT Token**: Backend generates JWT token (7-day expiration)
4. **Token Storage**: Frontend stores token in localStorage
5. **Protected Routes**: Routes require valid token + authentication check
6. **Avatar Upload**: Authenticated users can upload profile pictures
7. **Session Persistence**: Token checked on app load via `AuthContext.verify()`

---

## 🎨 Features

### Authentication
- ✅ User Registration (signup)
- ✅ User Login (login)
- ✅ JWT Token Management
- ✅ Protected Routes
- ✅ Session Persistence
- ✅ Password Hashing with bcrypt

### User Profile
- ✅ Profile Information Display
- ✅ Avatar Upload
- ✅ Edit Profile
- ✅ Change Password
- ✅ Logout

### Movies
- ✅ Browse Movies by Category
- ✅ Search Movies
- ✅ Movie Details Modal
- ✅ Responsive Design
- ✅ Real TMDB Data

### UI/UX
- ✅ Dark Netflix Theme
- ✅ Responsive Design
- ✅ Loading States
- ✅ Error Handling
- ✅ Smooth Animations

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: 
- Make sure MongoDB is running: `brew services start mongodb-community`
- Or use MongoDB Atlas connection string in `.env`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**:
- Check `FRONTEND_URL` in backend `.env` matches your frontend URL
- Default: `http://localhost:3001`

### JWT Token Invalid
```
TokenExpiredError or JsonWebTokenError
```

**Solution**:
- Clear localStorage: Delete `authToken` from browser dev tools
- Log in again to get new token

### API Key Invalid
```
401 Unauthorized from TMDB
```

**Solution**:
- Verify TMDB API key in `.env`
- Get new key from https://www.themoviedb.org/settings/api

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**:
```bash
# Kill process on port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9

# Or change PORT in backend/.env
PORT=5001
```

---

## 📚 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | /api/auth/signup | Register new user | No |
| POST | /api/auth/login | User login | No |
| POST | /api/auth/verify | Verify JWT token | Yes |
| POST | /api/auth/logout | User logout | Yes |

### User Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | /api/user/profile | Get user profile | Yes |
| PUT | /api/user/profile | Update profile | Yes |
| PUT | /api/user/avatar | Update avatar URL | Yes |
| PUT | /api/user/password | Change password | Yes |
| PUT | /api/user/preferences | Update settings | Yes |
| DELETE | /api/user/account | Delete account | Yes |

### Upload Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | /api/upload/avatar | Upload avatar file | Yes |

---

## 🌐 Supported Languages

Currently supported:
- 🇬🇧 English (en)
- 🇸🇦 Arabic (ar) - RTL Support
- 🇫🇷 French (fr)
- 🇪🇸 Spanish (es)
- 🇩🇪 German (de)
- 🇮🇹 Italian (it)
- 🇵🇹 Portuguese (pt)

---

## 📦 Dependencies

### Frontend
- react: 19.2.4
- react-router-dom: 7.13.0
- axios: 1.13.4
- i18next: 25.8.0
- react-i18next: 16.5.4
- react-icons: 5.5.0
- swiper: 12.1.0

### Backend
- express: 4.18.2
- mongoose: 8.0.0
- bcryptjs: 2.4.3
- jsonwebtoken: 9.1.2
- multer: 1.4.5-lts.1
- joi: 17.11.0
- dotenv: 16.3.1

---

## 🚀 Deployment

### Deploy Frontend to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy Backend to Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Set Environment Variables on Vercel
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add `VITE_API_URL` pointing to deployed backend

### Set Environment Variables on Heroku
```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret_key
heroku config:set FRONTEND_URL=your_frontend_url
```

---

## 📞 Support & Resources

- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [TMDB API Documentation](https://developers.themoviedb.org)
- [JWT.io](https://jwt.io)

---

## ✨ License

MIT License - Free to use and modify

---

**Last Updated**: 2024
**Version**: 1.0.0

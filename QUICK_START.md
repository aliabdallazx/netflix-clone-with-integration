# 🚀 Quick Start Guide - Netflix Clone with Authentication

## Prerequisites Installation

Before starting the application, ensure you have:
- **Node.js v16+** and npm installed ([Download](https://nodejs.org))
- **MongoDB** (local or MongoDB Atlas account) ([Create free account](https://www.mongodb.com/cloud/atlas))
- **Git** for version control

---

## Step 1: Clone/Navigate to Project

```bash
cd /home/coding/netflix-clone-with-integration
```

---

## Step 2: Frontend Setup (Terminal 1)

### Install Dependencies
```bash
npm install
```

### Verify Environment Variables
Check `.env` file exists with:
```env
VITE_API_URL=http://localhost:5000/api
VITE_TMDB_API_KEY=76fd9bf3732b52fb78c67f42710e8bb7
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### Start Frontend Dev Server
```bash
npm run dev
```

✅ Frontend running on: **http://localhost:3001**

---

## Step 3: Backend Setup (Terminal 2)

### Navigate to Backend
```bash
cd backend
```

### Install Dependencies
```bash
npm install
```

### Set Up MongoDB

**Option A: Local MongoDB (macOS/Linux)**
```bash
# Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Update backend/.env with:
MONGODB_URI=mongodb://localhost:27017/netflixCloneDB
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string from "Connect" button
4. Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflixCloneDB
```

### Configure Backend Environment Variables

Create or update `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/netflixCloneDB
JWT_SECRET=your_random_secret_key_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3001
CLOUDINARY_NAME=optional
CLOUDINARY_API_KEY=optional
CLOUDINARY_API_SECRET=optional
```

### Start Backend Dev Server
```bash
npm run dev
```

✅ Backend running on: **http://localhost:5000**
✅ MongoDB connected message should appear

---

## Step 4: Test the System

### 1. Test Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Netflix Clone API is running"
}
```

### 2. Test Frontend Access
Open browser: **http://localhost:3001**

You should see the Netflix Clone homepage with:
- Navbar with language switcher
- Movie carousels with real TMDB data
- Login/Signup buttons in navbar (if not logged in)

### 3. Test Authentication

#### Create Account
1. Click "Sign Up" in navbar
2. Fill form: First Name, Last Name, Email, Password, Confirm Password
3. Click "Sign Up"
4. Should redirect to home and show avatar in navbar

#### Login
1. Click "Log In" in navbar
2. Enter email and password
3. Click "Sign In"
4. Should redirect to home and show avatar in navbar

#### Upload Avatar
1. Click avatar in navbar → "Profile"
2. Click upload button
3. Select image file (<5MB)
4. Avatar should appear in navbar immediately

#### Logout
1. Click avatar in navbar
2. Click "Logout"
3. Should redirect to login and remove avatar

### 4. Test Session Persistence
1. Login to app
2. Refresh page (Cmd/Ctrl + R)
3. User should still be logged in ✅

---

## ✨ Features Checklist

After starting both servers, verify:

- [ ] Frontend loads at http://localhost:3001
- [ ] Backend responds at http://localhost:5000/api/health
- [ ] Can navigate to /login page
- [ ] Can navigate to /signup page
- [ ] Signup creates user successfully
- [ ] Login works with correct credentials
- [ ] Invalid credentials show error
- [ ] Avatar appears in navbar when logged in
- [ ] Avatar upload works
- [ ] Logout clears session
- [ ] Refresh keeps user logged in
- [ ] /profile requires authentication (redirects if not logged in)
- [ ] /my-list requires authentication
- [ ] Language switcher works
- [ ] RTL Arabic text aligns correctly

---

## 🔧 Common Issues & Solutions

### MongoDB Connection Error
```
❌ MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix**: 
- Ensure MongoDB is running: `brew services start mongodb-community`
- Or use MongoDB Atlas connection string

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix**:
- Verify `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Default: `http://localhost:3001`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Fix**:
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in backend/.env to 5001
```

### API Key Invalid
```
401 Unauthorized from TMDB
```
**Fix**:
- Verify `VITE_TMDB_API_KEY` in `.env` is correct
- Get new key: https://www.themoviedb.org/settings/api

### Token Expired Error
**Fix**:
- Clear localStorage: Open DevTools → Storage → Clear localStorage
- Log in again to get new token

---

## 📁 File Structure

```
netflix-clone-with-integration/
├── .env                          # Frontend env vars
├── src/
│   ├── App.jsx                  # ✅ App with routing + AuthProvider
│   ├── context/
│   │   └── AuthContext.jsx      # ✅ Auth state management
│   ├── hooks/
│   │   └── useAuth.js           # ✅ Auth hook
│   ├── components/
│   │   ├── ProtectedRoute.jsx   # ✅ Route guard
│   │   └── Navbar/
│   │       ├── Navbar.jsx       # ✅ Avatar + user menu
│   │       └── Navbar.css       # ✅ Avatar styling
│   └── pages/
│       ├── Auth/
│       │   ├── Login/           # ✅ Login page
│       │   └── SignUp/          # ✅ Signup page
│       └── Profile/             # ✅ Profile + upload
│
└── backend/
    ├── .env                     # Backend env vars
    ├── server.js                # ✅ Express server
    ├── models/
    │   └── User.js              # ✅ User schema
    ├── controllers/
    │   ├── authController.js    # ✅ Auth logic
    │   ├── userController.js    # ✅ Profile logic
    │   └── uploadController.js  # ✅ Upload logic
    ├── routes/
    │   ├── auth.js              # ✅ Auth routes
    │   ├── user.js              # ✅ User routes
    │   └── upload.js            # ✅ Upload routes
    ├── middleware/
    │   ├── auth.js              # ✅ JWT middleware
    │   ├── errorHandler.js      # ✅ Error handling
    │   └── upload.js            # ✅ Multer config
    └── package.json
```

---

## 🎯 API Endpoints

### Authentication (Public)
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Authentication (Protected)
- `POST /api/auth/verify` - Verify JWT token
- `POST /api/auth/logout` - User logout

### User Profile (Protected)
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/avatar` - Update avatar URL

### File Upload (Protected)
- `POST /api/upload/avatar` - Upload avatar image

---

## 📚 Documentation

For detailed information, see:
- **SETUP_GUIDE.md** - Comprehensive setup instructions
- **IMPLEMENTATION_SUMMARY.md** - Feature details and architecture
- **FEATURES_IMPLEMENTED.md** - Original features list

---

## 🌐 Supported Languages

- 🇬🇧 English (en)
- 🇸🇦 Arabic (ar) - RTL Support
- 🇫🇷 French (fr)
- 🇪🇸 Spanish (es)
- 🇩🇪 German (de)
- 🇮🇹 Italian (it)
- 🇵🇹 Portuguese (pt)

---

## 💡 Next Steps

1. ✅ Setup frontend and backend (this guide)
2. ✅ Test authentication flow
3. ✅ Test avatar upload
4. ✅ Verify all features work
5. 📦 Build for production: `npm run build`
6. 🚀 Deploy frontend to Vercel
7. 🚀 Deploy backend to Heroku/AWS

---

## 🆘 Need Help?

- Check **SETUP_GUIDE.md** for detailed setup instructions
- Check **IMPLEMENTATION_SUMMARY.md** for feature details
- Review **backend/.env** and **.env** configuration
- Check browser console for errors (F12)
- Check backend terminal output for errors

---

## ✅ You're All Set!

Your Netflix Clone with complete authentication system is ready to use! 🎉

**Happy coding!** 🚀

---

**Last Updated**: 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✨

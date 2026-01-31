import express from 'express';
import { signup, login, verify, logout } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.post('/verify', authMiddleware, verify);
router.post('/logout', authMiddleware, logout);

export default router;

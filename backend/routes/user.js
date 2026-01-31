import express from 'express';
import {
  getProfile,
  updateProfile,
  updateAvatar,
  changePassword,
  updatePreferences,
  deleteAccount
  , addToList
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/avatar', updateAvatar);
router.put('/password', changePassword);
router.put('/preferences', updatePreferences);
router.delete('/account', deleteAccount);
router.post('/list', authMiddleware, addToList);

export default router;

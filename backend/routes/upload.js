import express from 'express';
import { uploadAvatar } from '../controllers/uploadController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/avatar', upload.single('avatar'), uploadAvatar);

export default router;

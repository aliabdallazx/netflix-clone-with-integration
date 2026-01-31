import express from 'express';
import { submitContact, getContacts, getContact, updateContact, deleteContact } from '../controllers/contactController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', submitContact);

// Protected routes (admin only)
router.get('/', authMiddleware, getContacts);
router.get('/:id', authMiddleware, getContact);
router.put('/:id', authMiddleware, updateContact);
router.delete('/:id', authMiddleware, deleteContact);

export default router;

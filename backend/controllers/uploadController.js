import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local upload (for development)
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Validate file type
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimes.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Only image files are allowed' });
    }

    // Validate file size (max 5MB)
    if (req.file.size > 5 * 1024 * 1024) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'File size must be less than 5MB' });
    }

    // For local development, return the file path
    // In production, this would be uploaded to Cloudinary or S3
    const imageUrl = `/uploads/avatars/${req.file.filename}`;

    res.json({
      message: 'Avatar uploaded successfully',
      imageUrl
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
};

// Cloudinary upload (production)
export const uploadAvatarCloudinary = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // This would use the cloudinary SDK
    // For now, return a placeholder
    res.json({
      message: 'Avatar uploaded successfully',
      imageUrl: `https://via.placeholder.com/150?text=Avatar`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

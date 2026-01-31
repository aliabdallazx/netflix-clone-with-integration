import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio } = req.body;
    const allowedUpdates = ['firstName', 'lastName', 'bio'];
    const updates = {};

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON()
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const { avatarUrl } = req.body;
    if (!avatarUrl) {
      return res.status(400).json({ error: 'Avatar URL is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { avatar: avatarUrl },
      { new: true }
    );

    res.json({
      message: 'Avatar updated successfully',
      user: user.toJSON()
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'All password fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const user = await User.findById(req.userId).select('+password');
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePreferences = async (req, res) => {
  try {
    const { language, theme, notifications } = req.body;
    const preferences = {};

    if (language) preferences.language = language;
    if (theme) preferences.theme = theme;
    if (notifications !== undefined) preferences.notifications = notifications;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { preferences: { ...req.body } },
      { new: true }
    );

    res.json({
      message: 'Preferences updated successfully',
      user: user.toJSON()
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const user = await User.findById(req.userId).select('+password');
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    await User.findByIdAndDelete(req.userId);

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addToList = async (req, res) => {
  try {
    const { movieId, movie, genres } = req.body;
    if (!movieId) {
      return res.status(400).json({ error: 'movieId is required' });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const exists = user.favorites?.find(f => f.movieId === movieId);
    if (exists) {
      // remove
      user.favorites = user.favorites.filter(f => f.movieId !== movieId);
      await user.save();
      return res.json({ message: 'Removed from favorites', favorites: user.favorites });
    }

    user.favorites = user.favorites || [];
    user.favorites.push({ movieId, title: movie?.title || movie?.name || '', genres: genres || [], meta: movie || {} });
    await user.save();
    res.json({ message: 'Added to favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

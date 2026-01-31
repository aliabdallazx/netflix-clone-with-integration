import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { FaUser, FaCamera, FaEdit, FaLock, FaTrash } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, uploadAvatar, updateProfile, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || ''
  });

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setUploadError(t('common.error') + ': Only images are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError(t('common.error') + ': File size must be less than 5MB');
      return;
    }

    setIsUploadingAvatar(true);
    setUploadError('');

    try {
      await uploadAvatar(file);
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h1>{t('profile.myProfile')}</h1>

        {/* Avatar Section */}
        <div className="profile-avatar-section">
          <div className="avatar-wrapper">
            {user?.avatar ? (
              <img src={user.avatar} alt={user?.firstName} className="profile-avatar" />
            ) : (
              <div className="profile-avatar-placeholder">
                <FaUser size={50} />
              </div>
            )}
            <label htmlFor="avatar-input" className="avatar-upload-btn">
              <FaCamera />
              {isUploadingAvatar ? t('common.loading') : t('profile.uploadPhoto')}
            </label>
            <input
              type="file"
              id="avatar-input"
              className="avatar-input-hidden"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={isUploadingAvatar}
            />
          </div>
          {uploadError && <p className="error-message">{uploadError}</p>}
        </div>

        {/* User Info */}
        <div className="profile-info">
          {!isEditing ? (
            <>
              <div className="info-item">
                <label>{t('auth.firstName')}</label>
                <p>{user?.firstName}</p>
              </div>
              <div className="info-item">
                <label>{t('auth.lastName')}</label>
                <p>{user?.lastName}</p>
              </div>
              <div className="info-item">
                <label>{t('auth.email')}</label>
                <p>{user?.email}</p>
              </div>
              <div className="info-item">
                <label>{t('profile.userSince')}</label>
                <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>{t('auth.firstName')}</label>
                <input
                  type="text"
                  name="firstName"
                  value={editData.firstName}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>{t('auth.lastName')}</label>
                <input
                  type="text"
                  name="lastName"
                  value={editData.lastName}
                  onChange={handleEditChange}
                />
              </div>
              <div className="info-item">
                <label>{t('auth.email')}</label>
                <p>{user?.email} (cannot be changed)</p>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
          {!isEditing ? (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              <FaEdit /> {t('profile.changeName')}
            </button>
          ) : (
            <>
              <button className="btn btn-primary" onClick={handleSaveProfile}>
                {t('common.save')}
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                {t('common.cancel')}
              </button>
            </>
          )}

          <button className="btn btn-secondary">
            <FaLock /> {t('profile.changePassword')}
          </button>

          <button className="btn btn-danger" onClick={handleLogout}>
            {t('navigation.logout')}
          </button>

          <button className="btn btn-danger">
            <FaTrash /> {t('profile.deleteAccount')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

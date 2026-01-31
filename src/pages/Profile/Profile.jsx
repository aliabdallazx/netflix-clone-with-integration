import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaUser, FaLock, FaBell, FaSignOutAlt, FaCamera } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const { _t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [imagePreview, setImagePreview] = useState(user.profileImage || null);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    username: user.username || '',
    profileImage: user.profileImage || null,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }
    // In a real app, this would call an API to change password
    setMessage('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <div className="profile-header">
          <h1>Account Settings</h1>
        </div>

        <div className="profile-container">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-user-card">
              <div className="profile-avatar-container">
                <img
                  src={imagePreview || user.profileImage || `https://i.pravatar.cc/150?u=${user.email}`}
                  alt="Profile"
                  className="profile-avatar"
                />
                <label htmlFor="profileImageInput" className="profile-image-upload-label">
                  <FaCamera className="camera-icon" />
                </label>
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="profile-user-info">
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.email}</p>
              </div>
            </div>

            <nav className="profile-tabs">
              <button
                className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <FaUser /> Profile
              </button>
              <button
                className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
                onClick={() => setActiveTab('password')}
              >
                <FaLock /> Password
              </button>
              <button
                className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <FaBell /> Notifications
              </button>
              <button
                className="tab-button logout-btn"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="profile-main">
            {message && <div className="success-message">{message}</div>}

            {activeTab === 'profile' && (
              <div className="profile-section">
                <h2>Edit Profile</h2>
                <form onSubmit={handleUpdateProfile} className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter your username"
                      disabled
                    />
                    <small>Username cannot be changed</small>
                  </div>

                  <button type="submit" className="submit-btn">
                    Update Profile
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="profile-section">
                <h2>Change Password</h2>
                <form onSubmit={handleUpdatePassword} className="profile-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Update Password
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="profile-section">
                <h2>Notification Preferences</h2>
                <div className="notification-options">
                  <div className="notification-item">
                    <div className="notification-info">
                      <h3>Email Notifications</h3>
                      <p>Receive updates about new releases and recommendations</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <h3>New Arrivals</h3>
                      <p>Get notified when new movies and shows are added</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <h3>Recommendations</h3>
                      <p>Personalized recommendations based on your viewing</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

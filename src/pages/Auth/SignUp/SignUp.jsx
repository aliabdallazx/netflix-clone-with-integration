import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import { useLanguage } from '../../../hooks/useLanguage';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useLanguage();

  const handleChange = (e) => {
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

  const validateForm = () => {
    if (!formData.firstName.trim()) return t('firstNameRequired');
    if (!formData.lastName.trim()) return t('lastNameRequired');
    if (!formData.email.trim()) return t('emailRequired');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return t('emailInvalid');
    if (!formData.username.trim()) return t('usernameRequired');
    if (formData.username.length < 3) return t('usernameTooShort');
    if (!formData.password) return t('passwordRequired');
    if (formData.password.length < 6) return t('passwordTooShort');
    if (formData.password !== formData.confirmPassword) return t('passwordMismatch');
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        setIsLoading(false);
        return;
      }

      register(
        formData.email,
        formData.username,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.profileImage
      );

      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-background">
        <div className="signup-overlay"></div>
      </div>

      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-header">
            <h1>
              <span className="netflix-red">N</span>
              <span>ETFLIX</span>
            </h1>
            <h2>{t('signup')}</h2>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            {/* Profile Image Upload */}
            <div className="image-upload-section">
              <div className="image-preview-container">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile Preview" className="image-preview" />
                ) : (
                  <div className="image-placeholder">
                    <FaCamera className="camera-icon" />
                  </div>
                )}
              </div>
              <label htmlFor="profileImage" className="image-upload-label">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isLoading}
                  style={{ display: 'none' }}
                />
                <span className="upload-button">
                  {imagePreview ? t('changePhoto') : t('choosePhoto')}
                </span>
              </label>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">{t('firstName')}</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">{t('lastName')}</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">{t('username')}</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">{t('password')}</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="signup-button"
              disabled={isLoading}
            >
              {isLoading ? t('loading') : t('createAccount')}
            </button>
          </form>

          <div className="signup-footer">
            <p>
              {t('alreadyHaveAccount')}{' '}
              <Link to="/login" className="login-link">
                {t('login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

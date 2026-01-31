import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle, FaEnvelope, FaClock } from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired');
    } else if (formData.name.length < 2) {
      newErrors.name = t('contact.errors.nameMinLength');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.errors.subjectRequired');
    } else if (formData.subject.length < 5) {
      newErrors.subject = t('contact.errors.subjectMinLength');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired');
    } else if (formData.message.length < 10) {
      newErrors.message = t('contact.errors.messageMinLength');
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsSubmitted(true);

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000
        }
      );

      if (response.data.success) {
        setSuccessMessage(response.data.message || t('contact.success'));
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setErrors({});
        setIsSubmitted(false);

        // Clear success message after 6 seconds
        setTimeout(() => setSuccessMessage(''), 6000);
      }
    } catch (error) {
      // If backend is unreachable, save message locally for development
      if (error.request && !error.response) {
        try {
          const saved = JSON.parse(localStorage.getItem('dev_contacts') || '[]');
          saved.push({ ...formData, createdAt: new Date().toISOString() });
          localStorage.setItem('dev_contacts', JSON.stringify(saved));
          setSuccessMessage(t('contact.success') + ' (saved locally)');
          setFormData({ name: '', email: '', subject: '', message: '' });
          setErrors({});
          setIsSubmitted(false);
          setTimeout(() => setSuccessMessage(''), 6000);
          return;
        } catch (e) {
          console.error('Saving contact locally failed:', e);
        }
      }

      const message = error.response?.data?.error || error.response?.data?.message || t('contact.errors.submitFailed');
      setErrorMessage(message);
      console.error('Contact form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <Navbar />

      <div className="contact-container">
        <div className="contact-header">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.description')}</p>
        </div>

        <div className="contact-content">
          {/* Success Message */}
          {successMessage && (
            <div className="contact-success-message">
              <FaCheckCircle size={24} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="contact-error-message">
              <FaExclamationCircle size={24} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">{t('contact.name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.namePlaceholder')}
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && (
                <span className="field-error">{errors.name}</span>
              )}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">{t('contact.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.emailPlaceholder')}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            {/* Subject Field */}
            <div className="form-group">
              <label htmlFor="subject">{t('contact.subject')}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('contact.subjectPlaceholder')}
                className={errors.subject ? 'input-error' : ''}
              />
              {errors.subject && (
                <span className="field-error">{errors.subject}</span>
              )}
            </div>

            {/* Message Field */}
            <div className="form-group">
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.messagePlaceholder')}
                rows="6"
                className={errors.message ? 'input-error' : ''}
              />
              {errors.message && (
                <span className="field-error">{errors.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="contact-submit-btn"
              disabled={loading}
            >
              {loading ? t('contact.sending') : t('contact.send')}
            </button>
          </form>

          {/* Contact Info */}
          <div className="contact-info">
            <h3>{t('contact.infoTitle')}</h3>
            <p>{t('contact.infoText')}</p>
            <div className="info-items">
              <div className="info-item">
                <strong>{t('contact.email')}</strong>
                <p>support@netflixclone.com</p>
              </div>
              <div className="info-item">
                <strong>{t('contact.responseTime')}</strong>
                <p>{t('contact.responseText')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

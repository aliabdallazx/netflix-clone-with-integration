import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useLanguage } from '../../../hooks/useLanguage';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate inputs
      if (!email || !password) {
        setError(t('emailRequired'));
        setIsLoading(false);
        return;
      }

      const result = login(email, password);

      if (result.success) {
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        setError(result.error);
      }
    } catch {
      setError(t('error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    // Demo account for testing
    const result = login('demo@netflix.com', 'demo123');
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-overlay"></div>
      </div>

      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>
              <span className="netflix-red">N</span>
              <span>ETFLIX</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">{t('email')} / {t('username')}</label>
              <input
                type="text"
                id="email"
                placeholder={t('email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('password')}</label>
              <input
                type="password"
                id="password"
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? t('loading') : t('login')}
            </button>
          </form>

          <div className="login-divider">{t('or')}</div>

          <button
            type="button"
            className="demo-button"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            {t('demoAccount')}
          </button>

          <div className="login-footer">
            <p>
              {t('dontHaveAccount')}{' '}
              <Link to="/signup" className="signup-link">
                {t('signup')}
              </Link>
            </p>
            <p className="demo-credentials">
              Demo: demo@netflix.com / demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

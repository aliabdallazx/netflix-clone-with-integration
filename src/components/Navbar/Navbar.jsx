import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  const handleContactClick = () => {
    navigate('/contact');
    setShowMobileMenu(false);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault?.();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
    setShowSearch(false);
    setShowMobileMenu(false);
  };

  const isActive = (path) => location.pathname === path;

  const navigationItems = [
    { label: t('navigation.home'), path: '/' },
    { label: t('navigation.movies'), path: '/movies' },
    { label: t('navigation.tvShows'), path: '/tv-shows' },
    { label: t('navigation.browse'), path: '/browse-by-genre' },
    { label: t('navigation.myList'), path: '/my-list' },
    { label: t('navigation.contact'), path: '/contact' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="netflix-red">N</span>
          <span>ETFLIX</span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar-links">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`navbar-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="navbar-right">
          <LanguageSwitcher />
          <div className="navbar-search">
            <button className="search-button" title={t('common.search')} onClick={() => setShowSearch(!showSearch)}>
              <FaSearch />
            </button>
            {showSearch && (
              <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                  type="search"
                  className="search-input"
                  placeholder={t('common.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search"
                />
                <button type="submit" className="search-submit">Go</button>
              </form>
            )}
          </div>

          {/* Authentication */}
          {isAuthenticated ? (
            <div className="navbar-user-section">
              <button 
                className="navbar-user-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                title={user?.firstName}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user?.firstName} className="navbar-avatar" />
                ) : (
                  <div className="navbar-avatar-placeholder">
                    <FaUser size={16} />
                  </div>
                )}
              </button>

              {showUserMenu && (
                <div className="navbar-dropdown-menu">
                  <div className="dropdown-header">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <button className="dropdown-item" onClick={handleProfileClick}>
                    {t('profile.myProfile')}
                  </button>
                  <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                    {t('navigation.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth-links">
              <Link to="/login" className="navbar-auth-link">
                {t('navigation.login')}
              </Link>
              <Link to="/signup" className="navbar-auth-link navbar-auth-link-primary">
                {t('navigation.signup')}
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="navbar-mobile-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="navbar-mobile-menu">
          <div className="mobile-menu-items">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-menu-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setShowMobileMenu(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mobile-menu-divider" />

          {isAuthenticated ? (
            <div className="mobile-menu-auth">
              <div className="mobile-user-info">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user?.firstName} className="mobile-avatar" />
                ) : (
                  <div className="mobile-avatar-placeholder">
                    <FaUser size={16} />
                  </div>
                )}
                <span>{user?.firstName} {user?.lastName}</span>
              </div>
              <button className="mobile-menu-item" onClick={handleProfileClick}>
                {t('profile.myProfile')}
              </button>
              <button className="mobile-menu-item mobile-logout" onClick={handleLogout}>
                {t('navigation.logout')}
              </button>
            </div>
          ) : (
            <div className="mobile-menu-auth">
              <Link to="/login" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                {t('navigation.login')}
              </Link>
              <Link to="/signup" className="mobile-menu-item mobile-signup" onClick={() => setShowMobileMenu(false)}>
                {t('navigation.signup')}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

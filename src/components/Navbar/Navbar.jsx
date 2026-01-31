import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaBell, FaCaretDown, FaMoon, FaSun, FaHeart, FaCog, FaUser, FaGlobe } from 'react-icons/fa';
import ThemeContext from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import { useSearchHistory } from '../../hooks/useAnalytics';
import { useLanguage } from '../../hooks/useLanguage';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(3);
  const [activeLink, setActiveLink] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();
  const { addSearchQuery } = useSearchHistory();
  const { user, logout, isUserLoggedIn } = useAuth();
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    // Update active link based on current location
    const path = location.pathname;
    if (path === '/') setActiveLink('home');
    else if (path === '/my-list') setActiveLink('my-list');
    else if (path === '/tv-shows') setActiveLink('tv-shows');
    else if (path === '/movies') setActiveLink('movies');
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      addSearchQuery(searchValue);
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue('');
      setShowSearch(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleNavClick = (path, linkName) => {
    setActiveLink(linkName);
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/');
    setShowDropdown(false);
  };
  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Left Section */}
        <div className="navbar-left">
          <div className="navbar-logo" onClick={() => handleNavClick('/', 'home')}>
            <span className="netflix-red text-4xl font-bold">N</span>
            <span className="text-2xl font-bold ml-1">ETFLIX</span>
          </div>
          <ul className="navbar-links">
            <li 
              className={`navbar-link ${activeLink === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('/', 'home')}
            >
              {t('home')}
            </li>
            <li 
              className={`navbar-link ${activeLink === 'tv-shows' ? 'active' : ''}`}
              onClick={() => handleNavClick('/tv-shows', 'tv-shows')}
            >
              {t('tvShows')}
            </li>
            <li 
              className={`navbar-link ${activeLink === 'movies' ? 'active' : ''}`}
              onClick={() => handleNavClick('/movies', 'movies')}
            >
              {t('movies')}
            </li>
            <li className="navbar-link">{t('newPopular')}</li>
            <li 
              className={`navbar-link ${activeLink === 'my-list' ? 'active' : ''}`}
              onClick={() => handleNavClick('/my-list', 'my-list')}
            >
              {t('myList')}
            </li>
            <li className="navbar-link dropdown-link">
              {t('browseGenre')}
              <div className="genre-dropdown">
                <div className="genre-item" onClick={() => handleNavClick('/genre/action', 'action')}>{t('action')}</div>
                <div className="genre-item" onClick={() => handleNavClick('/genre/comedy', 'comedy')}>{t('comedy')}</div>
                <div className="genre-item" onClick={() => handleNavClick('/genre/horror', 'horror')}>{t('horror')}</div>
                <div className="genre-item" onClick={() => handleNavClick('/genre/romance', 'romance')}>{t('romance')}</div>
                <div className="genre-item" onClick={() => handleNavClick('/genre/documentary', 'documentary')}>{t('documentary')}</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Search Bar */}
          <div className={`search-container ${showSearch ? 'active' : ''}`}>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="search-input"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="navbar-icon-button search-button"
              onClick={() => showSearch ? handleSearch() : setShowSearch(true)}
            >
              <FaSearch className="navbar-icon" />
            </button>
          </div>

          {/* My List Button */}
          <button 
            className="navbar-icon-button"
            onClick={() => handleNavClick('/my-list', 'my-list')}
            title="My List"
          >
            <FaHeart className="navbar-icon" />
          </button>

          {/* Notifications */}
          <div className="notification-wrapper">
            <button 
              className="navbar-icon-button"
              onClick={handleNotificationClick}
              title="Notifications"
            >
              <FaBell className="navbar-icon" />
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </button>
          </div>

          {/* Theme Toggle */}
          <button 
            className="navbar-icon-button theme-toggle"
            onClick={toggleTheme}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <FaSun className="navbar-icon" /> : <FaMoon className="navbar-icon" />}
          </button>

          {/* Language Selector */}
          <div className="language-selector">
            <button 
              className="navbar-icon-button language-btn"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              title="Language"
            >
              <FaGlobe className="navbar-icon" />
              <span className="language-code">{language.toUpperCase()}</span>
            </button>
            
            {showLanguageMenu && (
              <div className="language-menu">
                <div 
                  className={`language-item ${language === 'en' ? 'active' : ''}`}
                  onClick={() => {
                    changeLanguage('en');
                    setShowLanguageMenu(false);
                  }}
                >
                  English
                </div>
                <div 
                  className={`language-item ${language === 'ar' ? 'active' : ''}`}
                  onClick={() => {
                    changeLanguage('ar');
                    setShowLanguageMenu(false);
                  }}
                >
                  العربية
                </div>
                <div 
                  className={`language-item ${language === 'fr' ? 'active' : ''}`}
                  onClick={() => {
                    changeLanguage('fr');
                    setShowLanguageMenu(false);
                  }}
                >
                  Français
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          {isUserLoggedIn() && (
            <button 
              className="navbar-icon-button" 
              title="Settings"
              onClick={() => navigate('/profile')}
            >
              <FaCog className="navbar-icon" />
            </button>
          )}

          {/* Profile Dropdown / Auth Buttons */}
          {isUserLoggedIn() ? (
            <div className="navbar-profile">
              <img 
                src={user?.profileImage || `https://i.pravatar.cc/40?u=${user?.username || 'user'}`}
                alt="Profile" 
                className="navbar-profile-img"
              />
              <button
                className="navbar-dropdown-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FaCaretDown className="navbar-dropdown-icon" />
              </button>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-user-info">
                    <p className="dropdown-user-name">{user?.firstName} {user?.lastName}</p>
                    <p className="dropdown-user-email">{user?.email}</p>
                  </div>
                  <hr className="dropdown-divider" />
                  <div className="dropdown-item" onClick={() => navigate('/profile')}>{t('profileSettings')}</div>
                  <div className="dropdown-item">{t('account')}</div>
                  <div className="dropdown-item">{t('helpCenter')}</div>
                  <hr className="dropdown-divider" />
                  <div className="dropdown-item logout" onClick={handleLogout}>{t('signOut')}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button 
                className="auth-btn login-btn"
                onClick={() => navigate('/login')}
              >
                {t('signIn')}
              </button>
              <button 
                className="auth-btn signup-btn"
                onClick={() => navigate('/signup')}
              >
                {t('signUp')}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
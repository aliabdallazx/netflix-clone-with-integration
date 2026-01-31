import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    
    // Handle RTL for Arabic
    if (langCode === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      document.body.dir = 'rtl';
    } else {
      document.documentElement.lang = langCode;
      document.documentElement.dir = 'ltr';
      document.body.dir = 'ltr';
    }
    
    setShowDropdown(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="language-switcher">
      <button
        className="language-button"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="Select Language"
      >
        <span className="flag">{currentLanguage.flag}</span>
        <span className="language-name">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {showDropdown && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${
                i18n.language === lang.code ? 'active' : ''
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="flag">{lang.flag}</span>
              <span className="language-option-name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

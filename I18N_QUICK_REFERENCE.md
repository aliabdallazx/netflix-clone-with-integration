# Quick Reference - Multilingual System

## 🌍 Language Codes
- `en` - English
- `fr` - French
- `ar` - Arabic (RTL)

## 📝 How to Use Translations in Components

### Basic Usage
```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return <button>{t('banner.play')}</button>;
};
```

### Common Translation Keys

#### Navigation
```jsx
t('navigation.home')          // "Home" or equivalent
t('navigation.movies')        // "Movies" or equivalent
t('navigation.tvShows')       // "TV Shows" or equivalent
t('navigation.myList')        // "My List" or equivalent
t('navigation.profile')       // "Profile" or equivalent
t('navigation.contact')       // "Contact" or equivalent
t('navigation.login')         // "Sign In" or equivalent
t('navigation.signup')        // "Sign Up" or equivalent
t('navigation.logout')        // "Sign Out" or equivalent
```

#### Banner & Movies
```jsx
t('banner.play')              // "Play" button
t('banner.moreInfo')          // "More Info" button
t('navigation.netflixOriginals')  // "NETFLIX ORIGINALS"
t('navigation.trendingNow')       // "Trending Now"
t('navigation.topRated')          // "Top Rated"
t('navigation.actionMovies')      // "Action Movies"
// ... and more categories
```

#### Common UI
```jsx
t('common.loading')           // "Loading..."
t('common.error')             // "An error occurred"
t('common.noResults')         // "No results found"
t('common.previous')          // "Previous"
t('common.next')              // "Next"
```

#### Authentication
```jsx
t('auth.email')               // "Email Address"
t('auth.password')            // "Password"
t('auth.errors.emailRequired')    // "Email is required"
t('auth.errors.passwordMin')      // "Password must be at least 6 characters"
t('auth.success.signUpSuccess')   // Success message
```

## 🌐 Changing Language Programmatically

```jsx
import { useTranslation } from 'react-i18next';

const SwitchLanguage = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('fr')}>Français</button>
      <button onClick={() => changeLanguage('ar')}>العربية</button>
    </>
  );
};
```

## 💾 Checking Current Language

```jsx
import { useTranslation } from 'react-i18next';

const LanguageInfo = () => {
  const { i18n } = useTranslation();
  
  return <div>Current Language: {i18n.language}</div>;
};
```

## 🔄 Translation Files Location

```
src/i18n/
├── config.js          (i18next initialization)
└── locales/
    ├── en.json        (English translations)
    ├── fr.json        (French translations)
    └── ar.json        (Arabic translations)
```

## ✍️ Adding New Translations

### 1. Add to all three JSON files

**en.json**:
```json
{
  "mySection": {
    "myKey": "English text"
  }
}
```

**fr.json**:
```json
{
  "mySection": {
    "myKey": "Texte français"
  }
}
```

**ar.json**:
```json
{
  "mySection": {
    "myKey": "النص العربي"
  }
}
```

### 2. Use in component
```jsx
const { t } = useTranslation();
return <div>{t('mySection.myKey')}</div>;
```

## 🎨 RTL Styling for Arabic

### In CSS files, use RTL selectors:
```css
/* LTR (English, French) */
.navbar {
  text-align: left;
  margin-left: 20px;
}

/* RTL (Arabic) */
[dir="rtl"] .navbar {
  text-align: right;
  margin-right: 20px;
  margin-left: 0;
}
```

### JavaScript RTL detection:
```jsx
const { i18n } = useTranslation();
const isRTL = i18n.language === 'ar';

// Or check DOM
const isRTL = document.documentElement.dir === 'rtl';
```

## 🚀 Performance Tips

1. **Use translation keys consistently** - Enables browser caching
2. **Lazy load translations** - i18next supports dynamic namespace loading
3. **Cache language in localStorage** - Already implemented
4. **Avoid inline strings** - Always use `t()` function

## 🐛 Debugging

### Check available translations:
```jsx
import en from '../i18n/locales/en.json';
console.log('Available keys:', Object.keys(en));
```

### Log current language and translations:
```jsx
const { t, i18n } = useTranslation();
console.log('Current language:', i18n.language);
console.log('Available languages:', i18n.languages);
```

### Missing translation warning:
- Open browser console
- Look for i18next warnings
- Add missing key to all three JSON files

## 📱 Component Examples

### Simple Button
```jsx
import { useTranslation } from 'react-i18next';

const PlayButton = () => {
  const { t } = useTranslation();
  return <button>{t('banner.play')}</button>;
};
```

### Form with Error Messages
```jsx
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const EmailInput = () => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    if (!e.target.value) {
      setError(t('auth.errors.emailRequired'));
    } else {
      setError('');
    }
  };
  
  return (
    <>
      <input 
        placeholder={t('auth.email')} 
        onChange={handleChange}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
};
```

### Language-Specific Rendering
```jsx
import { useTranslation } from 'react-i18next';

const ConditionalContent = () => {
  const { i18n } = useTranslation();
  
  if (i18n.language === 'ar') {
    return <div dir="rtl">محتوى عربي</div>;
  }
  
  return <div>English/French content</div>;
};
```

## 🔗 Useful Links

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [MULTILINGUAL_SYSTEM.md](./MULTILINGUAL_SYSTEM.md) - Full documentation
- [Translation Files](./src/i18n/locales/)

## 💡 Best Practices

✅ **DO:**
- Use translation keys for all user-facing text
- Add translations to all three languages simultaneously
- Use dot notation for nested keys
- Test all languages regularly
- Provide context when adding new translations

❌ **DON'T:**
- Hardcode strings in components
- Add translation to one language only
- Use special characters in keys
- Mix English and other languages
- Forget about RTL for Arabic

---

**Version**: 1.0.0  
**Last Updated**: 2024

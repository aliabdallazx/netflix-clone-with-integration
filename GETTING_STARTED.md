# Getting Started - Netflix Clone with Multilingual Support

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation & Running

```bash
# 1. Navigate to project directory
cd /home/coding/netflix-clone-with-integration

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application will be available at: **http://localhost:3001**

---

## 🌍 Testing Multilingual Features

### 1. Open the Application
- Navigate to http://localhost:3001
- Look for the language selector in the top-right of the navbar

### 2. Switch Languages
Click the language dropdown and select:
- 🇺🇸 **English** (en)
- 🇫🇷 **Français** (fr)
- 🇸🇦 **العربية** (ar)

### 3. Observe Changes
- All navigation items update
- Movie categories translate
- Buttons and labels change instantly
- Arabic automatically switches to RTL

### 4. Test Persistence
- Switch to a different language
- Refresh the page
- Your language choice is remembered

---

## 📁 Project Structure

```
netflix-clone-with-integration/
├── src/
│   ├── i18n/                    # Multilingual system
│   │   ├── config.js           # i18next configuration
│   │   └── locales/            # Translation files
│   │       ├── en.json         # English translations
│   │       ├── fr.json         # French translations
│   │       └── ar.json         # Arabic translations
│   │
│   ├── components/
│   │   ├── LanguageSwitcher/    # NEW - Language selector
│   │   ├── Navbar/
│   │   ├── Banner/
│   │   ├── MovieCard/
│   │   └── MovieRow/
│   │
│   ├── pages/
│   │   └── Home/               # Main page
│   │
│   ├── services/
│   │   ├── api.js             # TMDB API setup
│   │   └── requests.js        # API endpoints
│   │
│   └── main.jsx               # App entry point
│
├── public/                      # Static assets
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind setup
│
└── Documentation/
    ├── MULTILINGUAL_SYSTEM.md        # Full documentation
    ├── I18N_QUICK_REFERENCE.md       # Developer guide
    ├── FEATURES_IMPLEMENTED.md       # Feature list
    └── IMPLEMENTATION_COMPLETE.md    # This summary
```

---

## 🎬 Features

### Movie Display
- Netflix Originals
- Trending Movies
- Top Rated
- Movies by Genre (Action, Comedy, Horror, Romance)
- Documentaries
- Upcoming Movies
- Now Playing

### Multilingual Support
- 3 Languages: English, French, Arabic
- Real-time language switching
- Persistent user preference
- RTL support for Arabic
- 67+ translation keys

### UI Components
- Responsive Navbar
- Movie Banner
- Horizontal Scrolling Movie Rows
- Interactive Movie Cards
- Loading State
- Error Handling

---

## 🔌 API Integration

The app uses the **TMDB (The Movie Database) API**.

### API Key Configuration
The API key is configured in: `.env` file

**Current Key**: `76fd9bf3732b52fb78c67f42710e8bb7`

### Movie Data Fetched
- Movie titles, descriptions, ratings
- Poster and backdrop images
- Release dates
- Genre information
- Trending/popular rankings

---

## 💻 Available Scripts

### Development
```bash
npm run dev
# Starts Vite dev server on http://localhost:3001
```

### Build
```bash
npm run build
# Creates optimized production build
```

### Preview
```bash
npm run preview
# Preview production build locally
```

### Lint
```bash
npm run lint
# Check code quality with ESLint
```

---

## 🛠️ Development Tips

### Adding Translations
1. Edit translation files in `src/i18n/locales/`
2. Add key to all three files (en.json, fr.json, ar.json)
3. Use in component: `const { t } = useTranslation(); t('key')`

### Modifying Components
- Update component files in `src/components/`
- Changes hot-reload automatically
- Check browser console for errors

### Styling
- Component-specific CSS in component folders
- Global styles in `src/styles/`
- Tailwind CSS configured in `tailwind.config.js`

---

## 🌐 Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

---

## 📱 Mobile Testing

The app is fully responsive:
```bash
# Press F12 in browser to open DevTools
# Click device toolbar icon
# Test with different screen sizes
```

---

## 🔍 Testing Languages

### English (en)
- Default language
- Full LTR (Left-to-Right) layout
- All features available

### French (fr)
- Tested translations
- LTR layout
- All features available

### Arabic (ar)
- Full RTL (Right-to-Left) layout
- Direction automatically switches
- Text alignment reversed
- All features available

---

## 🐛 Troubleshooting

### Language not switching?
```bash
# Clear browser cache
# Hard refresh: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
# Check browser console for errors
```

### Movies not loading?
```bash
# Check internet connection
# Verify API key is valid
# Check TMDB API status
# Look at browser console for error details
```

### Build issues?
```bash
# Clear node_modules
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Try building again
npm run build
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `MULTILINGUAL_SYSTEM.md` | Complete i18n documentation |
| `I18N_QUICK_REFERENCE.md` | Developer quick guide |
| `FEATURES_IMPLEMENTED.md` | Feature list and status |
| `IMPLEMENTATION_COMPLETE.md` | Implementation summary |
| `README.md` | Project overview |
| `GETTING_STARTED.md` | This file |

---

## 🎯 Next Steps

### For Development
1. Explore the codebase
2. Test all three languages
3. Review translation files
4. Check component implementations

### For Enhancement
1. Add authentication (signup/login)
2. Implement user profile
3. Add watchlist functionality
4. Create contact page
5. Setup backend database

---

## 📞 Quick Reference

### Common Commands
```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run code quality checks
npm install      # Install dependencies
```

### Important Paths
- Entry point: `src/main.jsx`
- Components: `src/components/`
- Pages: `src/pages/`
- Translations: `src/i18n/locales/`
- Config: `src/i18n/config.js`

### Key Technologies
- React 19.2.4
- Vite 7.3.1
- i18next (Internationalization)
- Tailwind CSS
- Axios (API calls)
- React Router v7

---

## ✅ Checklist After Installation

- [ ] Run `npm install` successfully
- [ ] Start dev server with `npm run dev`
- [ ] Open http://localhost:3001 in browser
- [ ] See Netflix Clone interface
- [ ] Click language switcher
- [ ] Switch to French - see changes
- [ ] Switch to Arabic - see RTL layout
- [ ] Refresh page - language persisted
- [ ] Check browser console - no errors
- [ ] Test movie categories loading

---

## 🎉 You're Ready!

Your Netflix Clone with multilingual support is ready to:
- ✅ Browse movies
- ✅ Switch languages instantly
- ✅ Experience RTL support
- ✅ Have persistent preferences

**Start exploring and enjoy! 🌍🎬**

---

## 📧 Support Resources

### Official Documentation
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [i18next Guide](https://www.i18next.com)
- [react-i18next Guide](https://react.i18next.com)
- [TMDB API Docs](https://www.themoviedb.org/settings/api)

### In This Project
- `MULTILINGUAL_SYSTEM.md` - Full i18n documentation
- `I18N_QUICK_REFERENCE.md` - Code examples
- Source code comments

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Ready to Use ✨

Happy coding! 🚀

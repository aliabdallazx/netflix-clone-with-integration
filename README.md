# Netflix Clone - Production-Quality React Application

A fully functional, production-quality Netflix-style movie browsing interface built with React, featuring real movie data from The Movie Database (TMDB) API.

## 🎬 Project Overview

This Netflix clone replicates Netflix's homepage design with:
- Dark theme inspired by Netflix
- Real movie data from TMDB API
- Fully responsive design (desktop, tablet, mobile)
- Interactive components with smooth animations
- Modern React with hooks and best practices

## 🚀 Features

- **Hero Banner**: Featured movie showcase with background image
- **Movie Carousels**: Horizontal scrolling categories
- **Responsive Design**: Works on all screen sizes
- **Movie Cards**: Interactive cards with hover preview
- **Loading States**: Animated skeleton loaders
- **Error Handling**: Graceful API failure handling

## 🛠️ Technology Stack

- **React 19.2.4** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **TMDB API** - Real movie data

## 📋 Project Structure

```
src/
├── components/
│   ├── Banner/
│   ├── Navbar/
│   ├── MovieCard/
│   ├── MovieRow/
│   └── Loader/
├── pages/
│   └── Home/
├── services/
│   ├── api.js
│   └── requests.js
├── hooks/
│   └── useFetchMovies.js
├── utils/
│   └── truncateText.js
└── styles/
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v14+
- npm or yarn
- TMDB API key from https://www.themoviedb.org/settings/api

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create `.env` file:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design Features

### Color Scheme
- Netflix Black: `#141414`
- Netflix Red: `#e50914`
- Text Colors: `#e5e5e5`, `#808080`

### Responsive Breakpoints
- Desktop: 1024px+
- Tablet: 768px-1023px
- Mobile: <768px

## 🔑 API Configuration

### TMDB API Setup

1. Visit https://www.themoviedb.org/settings/api
2. Sign up for an account
3. Request API access
4. Copy your API key to `.env`

### API Endpoints Used

- `/trending/all/week` - Trending content
- `/discover/tv?with_networks=213` - Netflix Originals
- `/movie/top_rated` - Top Rated
- `/discover/movie?with_genres=28` - Action
- `/discover/movie?with_genres=35` - Comedy
- `/discover/movie?with_genres=27` - Horror
- `/discover/movie?with_genres=10749` - Romance
- `/discover/movie?with_genres=99` - Documentaries
- `/movie/upcoming` - Upcoming
- `/movie/now_playing` - Now Playing

## 🚀 Deployment

### Build Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Connect GitHub repo to Netlify
2. Add environment variables in dashboard
3. Auto-deploy on push

## 📱 Responsive Design

- Mobile-first approach
- Flexible layouts with Flexbox/Grid
- Touch-friendly interactions
- Optimized images and performance

## 🔐 Security

- API keys in environment variables
- No sensitive data in source
- HTTPS-only API calls

## 📝 Git Workflow

```bash
git init
git add .
git commit -m "Initial commit: Netflix clone with TMDB integration"
git remote add origin <repository-url>
git push -u origin main
```

## 🎯 Components

### Banner Component
Featured movie showcase with animations

### MovieRow Component
Horizontal scrolling movie carousels with navigation

### MovieCard Component
Interactive movie cards with hover effects

### Navbar Component
Fixed navigation with scroll detection

### Loader Component
Animated loading spinner

## 📚 Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [TMDB API](https://developers.themoviedb.org)
- [React Router](https://reactrouter.com)

## 🎯 Future Features

- [ ] Search functionality
- [ ] Movie details modal
- [ ] Watchlist/Favorites
- [ ] User authentication
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Movie recommendations
- [ ] TV Shows section

## 📄 License

MIT License - Open source and free to use

---

**Netflix Clone | Movie Browsing Application** ✨

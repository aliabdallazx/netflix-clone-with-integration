import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home/Home';
import MyList from './pages/MyList/MyList';
import TVShows from './pages/TVShows/TVShows';
import Movies from './pages/Movies/Movies';
import SearchResults from './pages/SearchResults/SearchResults';
import BrowseByGenre from './pages/BrowseByGenre/BrowseByGenre';
import Login from './pages/Auth/Login/Login';
import SignUp from './pages/Auth/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/tv-shows" element={<TVShows />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/genre/:genreId" element={<BrowseByGenre />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
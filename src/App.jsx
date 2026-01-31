import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login/Login';
import SignUp from './pages/Auth/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import Contact from './pages/Contact/Contact';
import Movies from './pages/Movies/Movies';
import TVShows from './pages/TVShows/TVShows';
import MyList from './pages/MyList/MyList';
import SearchResults from './pages/SearchResults/SearchResults';
import BrowseByGenre from './pages/BrowseByGenre/BrowseByGenre';
import './index.css';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/my-list" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/browse-by-genre" element={<BrowseByGenre />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
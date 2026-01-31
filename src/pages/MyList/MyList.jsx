import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useFavorites } from '../../hooks/useWatchlist';
import { FaTrash, FaPlay } from 'react-icons/fa';
import './MyList.css';

const MyList = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="my-list-page">
      <Navbar />
      <div className="my-list-content">
        <div className="my-list-header">
          <h1>My Favorites</h1>
          <p className="my-list-count">{favorites.length} items in your list</p>
        </div>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">❤️</div>
            <h2>Your list is empty</h2>
            <p>Add movies and TV shows to your list to watch later</p>
            <a href="/" className="back-home-btn">Explore Content</a>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((movie) => (
              <div key={movie.id} className="favorite-card">
                <div className="favorite-card-image">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                    }}
                  />
                  <div className="favorite-card-overlay">
                    <button className="play-btn" title="Play">
                      <FaPlay />
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFavorite(movie.id)}
                      title="Remove from favorites"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="favorite-card-info">
                  <h3>{movie.title || movie.name}</h3>
                  <div className="favorite-card-meta">
                    <span className="rating">⭐ {(movie.vote_average || 0).toFixed(1)}</span>
                    <span className="year">
                      {new Date(movie.release_date || movie.first_air_date).getFullYear()}
                    </span>
                  </div>
                  <p className="overview">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyList;

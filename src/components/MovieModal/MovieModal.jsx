import { useState } from 'react';
import { FaPlay, FaPlus, FaThumbsUp, FaX, FaShare } from 'react-icons/fa';
import { useFavorites } from '../../hooks/useWatchlist';
import { useLanguage } from '../../hooks/useLanguage';
import './MovieModal.css';

const MovieModal = ({ movie, isOpen, onClose }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isLiked, setIsLiked] = useState(false);
  const { t } = useLanguage();

  if (!isOpen || !movie) return null;

  const isFav = isFavorite(movie.id);
  const releaseYear = movie.release_date?.substring(0, 4) || 
                      movie.first_air_date?.substring(0, 4) || 'N/A';
  const rating = movie.vote_average?.toFixed(1) || 'N/A';

  const handleAddToFavorites = () => {
    if (isFav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const handleShare = () => {
    const text = `Check out ${movie.title || movie.name} on Netflix Clone!`;
    if (navigator.share) {
      navigator.share({
        title: movie.title || movie.name,
        text: text,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="movie-modal-overlay" onClick={onClose}>
      <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FaX />
        </button>

        {/* Movie Backdrop */}
        <div className="modal-backdrop">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="backdrop-image"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/500x280?text=${movie.title || 'No Image'}`;
            }}
          />
          <div className="backdrop-overlay"></div>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h1 className="modal-title">{movie.title || movie.name}</h1>
              <div className="modal-meta">
                <span className="modal-rating">⭐ {rating}</span>
                <span className="modal-year">{releaseYear}</span>
              </div>
            </div>
          </div>

          {/* Play and Action Buttons */}
          <div className="modal-actions">
            <button className="action-btn primary">
              <FaPlay /> {t('play') || 'Play'}
            </button>
            <button 
              className={`action-btn secondary ${isFav ? 'active' : ''}`}
              onClick={handleAddToFavorites}
            >
              <FaPlus /> {isFav ? 'In List' : t('addToList') || 'Add to List'}
            </button>
            <button 
              className={`action-btn secondary ${isLiked ? 'active' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <FaThumbsUp /> {isLiked ? 'Liked' : t('like') || 'Like'}
            </button>
            <button className="action-btn secondary" onClick={handleShare}>
              <FaShare /> {t('share') || 'Share'}
            </button>
          </div>

          {/* Overview */}
          <div className="modal-overview">
            <p>{movie.overview}</p>
          </div>

          {/* Additional Info */}
          <div className="modal-info">
            <div className="info-row">
              <span className="info-label">Genre:</span>
              <span className="info-value">Action, Adventure, Sci-Fi</span>
            </div>
            <div className="info-row">
              <span className="info-label">Language:</span>
              <span className="info-value">English</span>
            </div>
            <div className="info-row">
              <span className="info-label">Vote Count:</span>
              <span className="info-value">{movie.vote_count || 0}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Popularity:</span>
              <span className="info-value">{Math.round(movie.popularity || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;

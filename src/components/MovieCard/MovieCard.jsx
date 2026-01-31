import { useState } from 'react';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown, FaCheck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getImageUrl, imageSizes } from '../../services/api';
import { truncateText } from '../../utils/truncateText';
import './MovieCard.css';
import MovieModal from '../MovieModal/MovieModal';
import axios from 'axios';

const MovieCard = ({ movie, isLarge }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFeedback, setShowFeedback] = useState('');
  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const list = JSON.parse(localStorage.getItem('myList') || '[]');
      return list.includes(movie.id);
    } catch (e) {
      return false;
    }
  });
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const baseImageUrl = movie.backdrop_path || movie.poster_path;
  const imageUrl = getImageUrl(
    baseImageUrl,
    isLarge ? imageSizes.poster.large : imageSizes.poster.medium
  );

  const fallbackImage = 'https://via.placeholder.com/342x513?text=No+Image';

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const handleAddToFavorites = () => {
    (async () => {
      // try server persist first
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('authToken');
      try {
        if (token) {
          await axios.post(
            `${API_URL}/user/list`,
            { movieId: movie.id, movie, genres: movie.genre_ids || [] },
            { headers: { Authorization: `Bearer ${token}` }, timeout: 5000 }
          );
          setIsFavorite(true);
          setShowFeedback(t('movieCard.addToList') || 'Added to list');
          setTimeout(() => setShowFeedback(''), 2000);
          return;
        }
      } catch (err) {
        // server persist failed — fallback to local
        console.warn('Persist to server failed, falling back to local', err?.message || err);
      }

      try {
        const list = JSON.parse(localStorage.getItem('myList') || '[]');
        let updated;
        if (list.includes(movie.id)) {
          updated = list.filter((id) => id !== movie.id);
          setIsFavorite(false);
          setShowFeedback(t('movieCard.removeFromList') || 'Removed from list');
        } else {
          updated = [...list, movie.id];
          setIsFavorite(true);
          setShowFeedback(t('movieCard.addToList') || 'Added to list');
        }
        localStorage.setItem('myList', JSON.stringify(updated));
      } catch (e) {
        setShowFeedback(t('common.error') || 'Error');
      }
      setTimeout(() => setShowFeedback(''), 2000);
    })();
  };

  const handleOpenDetails = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div 
      className={`movie-card ${isLarge ? 'movie-card-large' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imageUrl || fallbackImage}
        alt={movie.title || movie.name || movie.original_name}
        className="movie-card-image"
        onError={handleImageError}
        loading="lazy"
      />
      
      {isHovered && (
        <div className="movie-card-hover">
          <div className="movie-card-hover-content">
            <div className="movie-card-hover-actions">
              <button className="movie-card-action-button" title={t('banner.play')}>
                <FaPlay className="movie-card-action-icon" />
              </button>
              <button 
                className="movie-card-action-button"
                onClick={handleAddToFavorites}
                title={t('movieCard.addToList')}
              >
                <FaPlus className="movie-card-action-icon" />
              </button>
              <button className="movie-card-action-button" title={t('common.save')}>
                <FaThumbsUp className="movie-card-action-icon" />
              </button>
              <button className="movie-card-action-button" onClick={handleOpenDetails} title={t('banner.moreInfo')}>
                <FaChevronDown className="movie-card-action-icon" />
              </button>
            </div>
            
            <div className="movie-card-hover-info">
              <h3 className="movie-card-hover-title">
                {movie.title || movie.name || movie.original_name}
              </h3>
              <div className="movie-card-hover-details">
                <span className="movie-card-rating">
                  ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
                </span>
                <span className="movie-card-year">
                  {movie.release_date?.substring(0, 4) || 
                   movie.first_air_date?.substring(0, 4) || 'N/A'}
                </span>
              </div>
              <p className="movie-card-hover-description">
                {truncateText(movie.overview, 150)}
              </p>
            </div>
          </div>
          {showFeedback && <div className="movie-card-feedback">{showFeedback}</div>}
        </div>
      )}
      {showModal && <MovieModal movie={movie} onClose={handleCloseModal} isFavorite={isFavorite} onToggleFavorite={handleAddToFavorites} />}
    </div>
  );
};

export default MovieCard;

import { useState } from 'react';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown, FaCheck } from 'react-icons/fa';
import { getImageUrl, imageSizes } from '../../services/api';
import { truncateText } from '../../utils/truncateText';
import { useFavorites } from '../../hooks/useWatchlist';
import MovieModal from '../MovieModal/MovieModal';
import { useLanguage } from '../../hooks/useLanguage';
import './MovieCard.css';

const MovieCard = ({ movie, isLarge }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [showFeedback, setShowFeedback] = useState('');
  const { t } = useLanguage();

  const baseImageUrl = movie.backdrop_path || movie.poster_path;
  const imageUrl = getImageUrl(
    baseImageUrl,
    isLarge ? imageSizes.poster.large : imageSizes.poster.medium
  );

  const fallbackImage = 'https://via.placeholder.com/342x513?text=No+Image';
  const isFav = isFavorite(movie.id);

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const handleAddToFavorites = () => {
    if (isFav) {
      removeFavorite(movie.id);
      setShowFeedback(t('removedFromList') || 'Removed from favorites');
    } else {
      addFavorite(movie);
      setShowFeedback(t('addedToList') || 'Added to favorites');
    }
    setTimeout(() => setShowFeedback(''), 2000);
  };

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
              <button className="movie-card-action-button" title={t('play') || 'Play'} onClick={() => setShowModal(true)}>
                <FaPlay className="movie-card-action-icon" />
              </button>
              <button 
                className={`movie-card-action-button ${isFav ? 'active' : ''}`}
                onClick={handleAddToFavorites}
                title={isFav ? 'Remove from favorites' : t('addToList') || 'Add to favorites'}
              >
                {isFav ? <FaCheck className="movie-card-action-icon" /> : <FaPlus className="movie-card-action-icon" />}
              </button>
              <button className="movie-card-action-button" title={t('like') || 'Like'}>
                <FaThumbsUp className="movie-card-action-icon" />
              </button>
              <button className="movie-card-action-button" title={t('moreInfo') || 'More info'} onClick={() => setShowModal(true)}>
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
              <div className="movie-card-genres">
                <span className="movie-card-genre">Action</span>
                <span className="movie-card-genre">Adventure</span>
              </div>
            </div>
          </div>
          {showFeedback && <div className="movie-card-feedback">{showFeedback}</div>}
        </div>
      )}

      <MovieModal movie={movie} isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default MovieCard;
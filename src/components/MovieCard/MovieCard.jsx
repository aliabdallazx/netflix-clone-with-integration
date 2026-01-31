import { useState } from 'react';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from 'react-icons/fa';
import { getImageUrl, imageSizes } from '../../services/api';
import { truncateText } from '../../utils/truncateText';
import './MovieCard.css';

const MovieCard = ({ movie, isLarge }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFeedback, setShowFeedback] = useState('');

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
    setShowFeedback('Added to favorites');
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
              <button className="movie-card-action-button" title="Play">
                <FaPlay className="movie-card-action-icon" />
              </button>
              <button 
                className="movie-card-action-button"
                onClick={handleAddToFavorites}
                title="Add to favorites"
              >
                <FaPlus className="movie-card-action-icon" />
              </button>
              <button className="movie-card-action-button" title="Like">
                <FaThumbsUp className="movie-card-action-icon" />
              </button>
              <button className="movie-card-action-button" title="More info">
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
    </div>
  );
};

export default MovieCard;

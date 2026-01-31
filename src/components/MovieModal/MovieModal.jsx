import React from 'react';
import './MovieModal.css';
import { FaTimes, FaPlus, FaPlay } from 'react-icons/fa';
import { getImageUrl, imageSizes } from '../../services/api';
import { truncateText } from '../../utils/truncateText';

const MovieModal = ({ movie, onClose, isFavorite, onToggleFavorite }) => {
  const image = getImageUrl(movie.backdrop_path || movie.poster_path, imageSizes.poster.large);

  return (
    <div className="movie-modal-overlay" onClick={onClose}>
      <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
        <button className="movie-modal-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        <div className="movie-modal-body">
          <img src={image} alt={movie.title || movie.name} className="movie-modal-image" />
          <div className="movie-modal-content">
            <h2>{movie.title || movie.name}</h2>
            <p className="movie-modal-meta">⭐ {movie.vote_average?.toFixed(1) || 'N/A'} • {movie.release_date?.substring(0,4) || 'N/A'}</p>
            <p className="movie-modal-overview">{truncateText(movie.overview, 800)}</p>

            <div className="movie-modal-actions">
              <button className="btn btn-primary">
                <FaPlay /> Play
              </button>
              <button className="btn btn-secondary" onClick={onToggleFavorite}>
                <FaPlus /> {isFavorite ? 'Remove from List' : 'Add to List'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;

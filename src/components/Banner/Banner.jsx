import { useEffect, useState } from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import api from '../../services/api';
import requests from '../../services/requests';
import { getImageUrl, imageSizes } from '../../services/api';
import { truncateText } from '../../utils/truncateText';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const response = await api.get(requests.fetchNetflixOriginals);
        const movies = response.data.results;
        if (movies && movies.length > 0) {
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          setMovie(randomMovie);
        }
      } catch (error) {
        console.error('Error fetching banner movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovie();
  }, []);

  if (loading || !movie) {
    return (
      <div className="banner-skeleton">
        <div className="banner-skeleton-content"></div>
      </div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path || movie.poster_path, imageSizes.backdrop.large);

  return (
    <header 
      className="banner"
      style={{
        backgroundImage: `linear-gradient(
          to right,
          rgba(20, 20, 20, 1) 0%,
          rgba(20, 20, 20, 0.7) 30%,
          rgba(20, 20, 20, 0) 50%
        ), url(${backdropUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button banner-button-play">
            <FaPlay className="banner-button-icon" />
            Play
          </button>
          <button className="banner-button banner-button-info">
            <FaInfoCircle className="banner-button-icon" />
            More Info
          </button>
        </div>
        <p className="banner-description">
          {truncateText(movie.overview, 200)}
        </p>
      </div>
      <div className="banner-fade-bottom"></div>
    </header>
  );
};

export default Banner;
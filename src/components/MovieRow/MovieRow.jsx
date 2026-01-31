import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from '../MovieCard/MovieCard';
import Loader from '../Loader/Loader';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import './MovieRow.css';

const MovieRow = ({ title, fetchUrl, isLarge = false }) => {
  const { data: movies, loading, error } = useFetchMovies(fetchUrl);
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  if (error) {
    return (
      <div className="movie-row">
        <h2 className="movie-row-title">{title}</h2>
        <div className="movie-row-error">
          <p>Error loading movies. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-row">
      <h2 className="movie-row-title">{title}</h2>
      
      <div className="movie-row-container">
        <button 
          className="movie-row-button movie-row-button-left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <FaChevronLeft className="movie-row-button-icon" />
        </button>
        
        <div className="movie-row-content" ref={rowRef}>
          {loading ? (
            <div className="movie-row-loading">
              <Loader />
            </div>
          ) : (
            movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                isLarge={isLarge}
              />
            ))
          )}
        </div>
        
        <button 
          className="movie-row-button movie-row-button-right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <FaChevronRight className="movie-row-button-icon" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
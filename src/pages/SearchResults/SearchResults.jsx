import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaPlay, FaHeart } from 'react-icons/fa';
import axios from 'axios';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const searchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=e3e3f1d6393e8a69d1f1efbcc2a8e3d9&query=${query}&page=1`
        );
        setResults(response.data.results.filter(item => item.media_type !== 'person'));
        setError(null);
      } catch (err) {
        setError('Failed to fetch search results');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  return (
    <div className="search-results-page">
      <Navbar />
      <div className="search-results-content">
        <div className="search-header">
          <h1>Search Results</h1>
          <p>Results for "{query}"</p>
        </div>

        {loading ? (
          <div className="search-loading">
            <div className="spinner"></div>
            <p>Searching...</p>
          </div>
        ) : error ? (
          <div className="search-error">
            <p>{error}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="search-no-results">
            <h2>No results found</h2>
            <p>Try searching with different keywords</p>
          </div>
        ) : (
          <div className="search-results-grid">
            {results.map((result) => (
              <div key={`${result.media_type}-${result.id}`} className="search-result-card">
                <div className="result-image">
                  {result.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                      alt={result.title || result.name}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                  <div className="result-overlay">
                    <button className="play-btn" title="Play">
                      <FaPlay />
                    </button>
                    <button className="like-btn" title="Add to favorites">
                      <FaHeart />
                    </button>
                  </div>
                </div>
                <div className="result-info">
                  <h3>{result.title || result.name}</h3>
                  <div className="result-meta">
                    <span className="type">{result.media_type}</span>
                    <span className="rating">⭐ {(result.vote_average || 0).toFixed(1)}</span>
                  </div>
                  <p className="result-description">
                    {result.overview || 'No description available'}
                  </p>
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

export default SearchResults;

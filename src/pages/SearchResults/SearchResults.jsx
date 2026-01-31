import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar/Navbar';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import './SearchResults.css';

const SearchResults = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const query = params.get('q') || '';
  const { data: results, loading, error } = useFetchMovies(query ? `/search/multi?query=${encodeURIComponent(query)}` : null);

  return (
    <div className="search-results-page">
      <Navbar />
      <div className="search-results-container">
        <h1>{t('common.search')}</h1>
        {!query && <p>Type a query in the search box to find movies and shows.</p>}

        {query && (
          <div className="search-results">
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && results.length === 0 && <p>No results found for "{query}"</p>}
            <div className="search-grid">
              {results.map((item) => (
                <MovieCard key={item.id} movie={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

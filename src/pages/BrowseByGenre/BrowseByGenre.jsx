import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar/Navbar';
import './BrowseByGenre.css';
import { useEffect, useState } from 'react';
import MovieRow from '../../components/MovieRow/MovieRow';
import api from '../../services/api';

const BrowseByGenre = () => {
  const { t } = useTranslation();
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [showType, setShowType] = useState('movie');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const mv = await api.get('/genre/movie/list');
        const tv = await api.get('/genre/tv/list');
        setMovieGenres(mv.data.genres || []);
        setTvGenres(tv.data.genres || []);
      } catch (err) {
        console.error('Failed to load genres:', err);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div className="browse-by-genre-page">
      <Navbar />
      <div className="browse-by-genre-container">
        <div className="browse-header">
          <h1>{t('navigation.browse')}</h1>
          <p>Explore movies and shows by genre</p>
          <div className="browse-type-toggle">
            <button className={showType === 'movie' ? 'active' : ''} onClick={() => setShowType('movie')}>Movies</button>
            <button className={showType === 'tv' ? 'active' : ''} onClick={() => setShowType('tv')}>TV Shows</button>
          </div>
        </div>

        <div className="browse-genres">
          {(showType === 'movie' ? movieGenres : tvGenres).map((genre) => (
            <section key={genre.id} className="browse-genre-section">
              <h2 className="browse-genre-title">{genre.name}</h2>
              <MovieRow title={genre.name} fetchUrl={`/discover/${showType}?with_genres=${genre.id}`} />
            </section>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default BrowseByGenre;

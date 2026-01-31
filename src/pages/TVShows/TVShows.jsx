import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar/Navbar';
import MovieRow from '../../components/MovieRow/MovieRow';
import requests from '../../services/requests';
import './TVShows.css';

const TVShows = () => {
  const { t } = useTranslation();

  return (
    <div className="tv-shows-page">
      <Navbar />
      
      <div className="tv-shows-container">
        <div className="tv-shows-header">
          <h1>{t('navigation.tvShows')}</h1>
          <p>Watch amazing TV series and original content</p>
        </div>

        <div className="tv-shows-content">
          <MovieRow 
            title={t('navigation.netflixOriginals') || 'NETFLIX ORIGINALS'}
            fetchUrl={requests.fetchNetflixOriginals}
            isLarge={true}
          />
          <MovieRow 
            title={t('navigation.trendingNow') || 'Trending Now'}
            fetchUrl={requests.fetchTrending}
          />
          <MovieRow 
            title={t('navigation.topRated') || 'Top Rated'}
            fetchUrl={requests.fetchTopRated}
          />
          <MovieRow 
            title="Popular Series"
            fetchUrl={requests.fetchPopular}
          />
          <MovieRow 
            title="Documentaries"
            fetchUrl={requests.fetchDocumentaries}
          />
        </div>
      </div>
    </div>
  );
};

export default TVShows;

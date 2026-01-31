import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar/Navbar';
import MovieRow from '../../components/MovieRow/MovieRow';
import requests from '../../services/requests';
import './Movies.css';

const Movies = () => {
  const { t } = useTranslation();

  return (
    <div className="movies-page">
      <Navbar />
      
      <div className="movies-container">
        <div className="movies-header">
          <h1>{t('navigation.movies')}</h1>
          <p>{t('navigation.upcomingMovies')}</p>
        </div>

        <div className="movies-content">
          <MovieRow 
            title={t('navigation.upcomingMovies') || 'Upcoming Movies'}
            fetchUrl={requests.fetchUpcoming}
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
            title={t('navigation.actionMovies') || 'Action Movies'}
            fetchUrl={requests.fetchActionMovies}
          />
          <MovieRow 
            title={t('navigation.comedyMovies') || 'Comedy Movies'}
            fetchUrl={requests.fetchComedyMovies}
          />
          <MovieRow 
            title={t('navigation.horrorMovies') || 'Horror Movies'}
            fetchUrl={requests.fetchHorrorMovies}
          />
          <MovieRow 
            title={t('navigation.romanceMovies') || 'Romance Movies'}
            fetchUrl={requests.fetchRomanceMovies}
          />
          <MovieRow 
            title={t('navigation.documentaries') || 'Documentaries'}
            fetchUrl={requests.fetchDocumentaries}
          />
          <MovieRow 
            title={t('navigation.nowPlaying') || 'Now Playing'}
            fetchUrl={requests.fetchNowPlaying}
          />
          <MovieRow 
            title="Popular Movies"
            fetchUrl={requests.fetchPopular}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;

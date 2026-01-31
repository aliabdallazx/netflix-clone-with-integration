import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import MovieRow from '../../components/MovieRow/MovieRow';
import requests from '../../services/requests';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <Navbar />
      <Banner />
      
      <div className="home-content">
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
          title={t('navigation.upcomingMovies') || 'Upcoming Movies'}
          fetchUrl={requests.fetchUpcoming}
        />
        <MovieRow 
          title={t('navigation.nowPlaying') || 'Now Playing'}
          fetchUrl={requests.fetchNowPlaying}
        />
      </div>
    </div>
  );
};

export default Home;
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import MovieRow from '../../components/MovieRow/MovieRow';
import requests from '../../services/requests';
import './TVShows.css';

const TVShows = () => {
  return (
    <div className="tv-shows-page">
      <Navbar />
      <div className="tv-shows-content">
        <div className="page-header">
          <h1>TV Shows</h1>
          <p>Discover the best TV shows available</p>
        </div>

        <MovieRow 
          title="Popular TV Shows" 
          fetchUrl={requests.fetchNetflixOriginals}
          isLarge={false}
        />
        <MovieRow 
          title="Trending Now" 
          fetchUrl={requests.fetchTrending}
        />
        <MovieRow 
          title="Top Rated Shows" 
          fetchUrl={requests.fetchTopRated}
        />
        <MovieRow 
          title="Sci-Fi Shows" 
          fetchUrl={requests.fetchActionMovies}
        />
        <MovieRow 
          title="Drama Series" 
          fetchUrl={requests.fetchComedyMovies}
        />
        <MovieRow 
          title="Reality TV" 
          fetchUrl={requests.fetchDocumentaries}
        />
      </div>
      <Footer />
    </div>
  );
};

export default TVShows;

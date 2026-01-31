import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import MovieRow from '../../components/MovieRow/MovieRow';
import requests from '../../services/requests';
import './Movies.css';

const Movies = () => {
  return (
    <div className="movies-page">
      <Navbar />
      <div className="movies-content">
        <div className="page-header">
          <h1>Movies</h1>
          <p>Browse all available movies</p>
        </div>

        <MovieRow 
          title="Featured Movies" 
          fetchUrl={requests.fetchNetflixOriginals}
          isLarge={true}
        />
        <MovieRow 
          title="Trending Now" 
          fetchUrl={requests.fetchTrending}
        />
        <MovieRow 
          title="Top Rated" 
          fetchUrl={requests.fetchTopRated}
        />
        <MovieRow 
          title="Action" 
          fetchUrl={requests.fetchActionMovies}
        />
        <MovieRow 
          title="Comedy" 
          fetchUrl={requests.fetchComedyMovies}
        />
        <MovieRow 
          title="Horror" 
          fetchUrl={requests.fetchHorrorMovies}
        />
        <MovieRow 
          title="Romance" 
          fetchUrl={requests.fetchRomanceMovies}
        />
        <MovieRow 
          title="Upcoming" 
          fetchUrl={requests.fetchUpcoming}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Movies;

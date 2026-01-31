import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import MovieRow from '../../components/MovieRow/MovieRow';
import requests from '../../services/requests';
import { useParams } from 'react-router-dom';
import './BrowseByGenre.css';

const GENRES = {
  'action': { title: 'Action', url: requests.fetchActionMovies },
  'comedy': { title: 'Comedy', url: requests.fetchComedyMovies },
  'horror': { title: 'Horror', url: requests.fetchHorrorMovies },
  'romance': { title: 'Romance', url: requests.fetchRomanceMovies },
  'documentary': { title: 'Documentary', url: requests.fetchDocumentaries },
};

const BrowseByGenre = () => {
  const { genreId } = useParams();
  const genre = GENRES[genreId] || { title: 'Browse Genres', url: requests.fetchTrending };

  return (
    <div className="browse-genre-page">
      <Navbar />
      <div className="browse-genre-content">
        <div className="page-header">
          <h1>{genre.title}</h1>
          <p>Explore content in this category</p>
        </div>

        <MovieRow 
          title={`Popular ${genre.title}`}
          fetchUrl={genre.url}
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
      </div>
      <Footer />
    </div>
  );
};

export default BrowseByGenre;

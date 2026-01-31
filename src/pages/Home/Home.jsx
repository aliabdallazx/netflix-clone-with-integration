import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import MovieRow from '../../components/MovieRow/MovieRow';
import Footer from '../../components/Footer/Footer';
import requests from '../../services/requests';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Banner />
      
      <div className="home-content">
        <MovieRow 
          title="NETFLIX ORIGINALS" 
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
          title="Action Movies" 
          fetchUrl={requests.fetchActionMovies}
        />
        <MovieRow 
          title="Comedy Movies" 
          fetchUrl={requests.fetchComedyMovies}
        />
        <MovieRow 
          title="Horror Movies" 
          fetchUrl={requests.fetchHorrorMovies}
        />
        <MovieRow 
          title="Romance Movies" 
          fetchUrl={requests.fetchRomanceMovies}
        />
        <MovieRow 
          title="Documentaries" 
          fetchUrl={requests.fetchDocumentaries}
        />
        <MovieRow 
          title="Upcoming Movies" 
          fetchUrl={requests.fetchUpcoming}
        />
        <MovieRow 
          title="Now Playing" 
          fetchUrl={requests.fetchNowPlaying}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
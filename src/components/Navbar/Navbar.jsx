import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="netflix-red">N</span>
          <span>ETFLIX</span>
        </div>

        {/* Links */}
        <ul className="navbar-links">
          <li className="navbar-link active">Home</li>
          <li className="navbar-link">TV Shows</li>
          <li className="navbar-link">Movies</li>
          <li className="navbar-link">New & Popular</li>
          <li className="navbar-link">My List</li>
        </ul>

        {/* Right Section */}
        <div className="navbar-right">
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-section footer-logo-section">
          <div className="footer-logo">
            <span className="netflix-red">N</span>
            <span>ETFLIX</span>
          </div>
          <p className="footer-description">
            Your ultimate streaming entertainment platform. Watch thousands of movies, TV shows, and documentaries.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-title">Product</h4>
          <ul className="footer-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#plans">Plans</a></li>
            <li><a href="#quality">Video Quality</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-section">
          <h4 className="footer-title">Company</h4>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#press">Press</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4 className="footer-title">Support</h4>
          <ul className="footer-links">
            <li><a href="#help">Help Center</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#status">Status</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h4 className="footer-title">Legal</h4>
          <ul className="footer-links">
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#cookies">Cookie Preferences</a></li>
            <li><a href="#legal">Legal</a></li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="footer-social">
        <div className="social-links">
          <a href="#facebook" className="social-icon" title="Facebook" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#twitter" className="social-icon" title="Twitter" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#instagram" className="social-icon" title="Instagram" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#youtube" className="social-icon" title="YouTube" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="#linkedin" className="social-icon" title="LinkedIn" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            © {currentYear} Netflix Clone. All rights reserved. Designed & Developed by <strong>ALZAIM ALI</strong>
          </p>
          <p className="footer-disclaimer">
            This is a personal project for educational purposes only. Not affiliated with Netflix.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

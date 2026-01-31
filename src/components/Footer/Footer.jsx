import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>{t('common.company')}</h4>
            <ul>
              <li><Link to="/" className="footer-link">{t('common.about')}</Link></li>
              <li><a href="#careers" className="footer-link">{t('common.careers')}</a></li>
              <li><a href="#press" className="footer-link">{t('common.press')}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('common.support')}</h4>
            <ul>
              <li><a href="#help" className="footer-link">{t('common.help')}</a></li>
              <li><Link to="/contact" className="footer-link">{t('common.contact')}</Link></li>
              <li><Link to="/profile" className="footer-link">{t('common.account')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('common.legal')}</h4>
            <ul>
              <li><a href="#privacy" className="footer-link">{t('common.privacy')}</a></li>
              <li><a href="#terms" className="footer-link">{t('common.terms')}</a></li>
              <li><a href="#cookie" className="footer-link">{t('common.cookie')}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="footer-social-links">
              <a href="#facebook" className="social-link" title="Facebook" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#twitter" className="social-link" title="Twitter" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#instagram" className="social-link" title="Instagram" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#linkedin" className="social-link" title="LinkedIn" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 — <strong>ALZAIM ALI</strong></p>
          <p className="footer-rights">{t('common.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

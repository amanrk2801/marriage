import React from 'react';
import './Footer.css';

function Footer({ setCurrentPage }) {
  const handleNavigation = (e, page) => {
    e.preventDefault();
    if (setCurrentPage) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>💑 MatrimonyHub</h3>
            <p>India's most trusted matrimonial service. Find your perfect life partner today.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">📘</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">🐦</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">📷</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">📺</a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#search" onClick={(e) => handleNavigation(e, 'search')}>Search Profiles</a></li>
              <li><a href="#register" onClick={(e) => handleNavigation(e, 'register')}>Register Free</a></li>
              <li><a href="#login" onClick={(e) => handleNavigation(e, 'login')}>Login</a></li>
              <li><a href="#success" onClick={(e) => handleNavigation(e, 'success')}>Success Stories</a></li>
              <li><a href="#help" onClick={(e) => handleNavigation(e, 'help')}>Help & Support</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Information</h4>
            <ul>
              <li><a href="#about" onClick={(e) => handleNavigation(e, 'about')}>About Us</a></li>
              <li><a href="#privacy" onClick={(e) => handleNavigation(e, 'privacy')}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => handleNavigation(e, 'terms')}>Terms & Conditions</a></li>
              <li><a href="#contact" onClick={(e) => handleNavigation(e, 'contact')}>Contact Us</a></li>
              <li><a href="#faq" onClick={(e) => handleNavigation(e, 'faq')}>FAQ</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact Info</h4>
            <ul className="contact-info">
              <li>📧 support@matrimonyhub.com</li>
              <li>📞 +91 1800-123-4567</li>
              <li>📍 Mumbai, Maharashtra, India</li>
              <li>🕐 Mon-Sat: 9AM - 6PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 MatrimonyHub. All rights reserved.</p>
          <p>Made with ❤️ for bringing people together</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

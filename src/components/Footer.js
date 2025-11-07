import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>💑 MatrimonyHub</h3>
            <p>India's most trusted matrimonial service. Find your perfect life partner today.</p>
            <div className="social-links">
              <a href="#facebook" title="Facebook">📘</a>
              <a href="#twitter" title="Twitter">🐦</a>
              <a href="#instagram" title="Instagram">📷</a>
              <a href="#youtube" title="YouTube">📺</a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#search">Search Profiles</a></li>
              <li><a href="#register">Register Free</a></li>
              <li><a href="#login">Login</a></li>
              <li><a href="#success-stories">Success Stories</a></li>
              <li><a href="#help">Help & Support</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Information</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQ</a></li>
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

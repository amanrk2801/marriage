import React, { useState } from 'react';
import './Header.css';

function Header({ currentPage, setCurrentPage, shortlistCount, isLoggedIn, currentUser, onLogout, notificationCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    closeMenu();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => handleNavClick('search')} style={{ cursor: 'pointer' }}>
          <h1>💑 MatrimonyHub</h1>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>

        <nav className={`nav ${isMenuOpen ? 'mobile-open' : ''}`}>
          <a 
            href="#search" 
            className={currentPage === 'search' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('search'); }}
          >
            Search
          </a>
          <a 
            href="#shortlisted" 
            className={currentPage === 'shortlisted' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('shortlisted'); }}
          >
            Shortlisted
          </a>
          <a 
            href="#matches" 
            className={currentPage === 'matches' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('matches'); }}
          >
            Matches
          </a>
          <a 
            href="#interests" 
            className={currentPage === 'interests' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('interests'); }}
          >
            Interests
          </a>
          <a 
            href="#messages" 
            className={currentPage === 'messages' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('messages'); }}
          >
            Messages
          </a>
          <a 
            href="#notifications" 
            className={currentPage === 'notifications' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('notifications'); }}
            style={{ position: 'relative' }}
          >
            Notifications
            {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
          </a>
          <a 
            href="#success" 
            className={currentPage === 'success' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('success'); }}
          >
            Success Stories
          </a>
          
          {isLoggedIn ? (
            <>
              {!currentUser?.profilePublished && (
                <button 
                  className="publish-btn"
                  onClick={() => handleNavClick('payment')}
                  title="Publish your profile"
                >
                  🚀 Publish Profile
                </button>
              )}
              <div 
                className="user-info" 
                onClick={() => handleNavClick('profile')}
                style={{ cursor: 'pointer' }}
                title="View Profile"
              >
                <span className="user-icon">👤</span>
                <span className="user-name">{currentUser?.name}</span>
              </div>
              <button 
                className="logout-btn"
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              className="login-btn"
              onClick={() => handleNavClick('login')}
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

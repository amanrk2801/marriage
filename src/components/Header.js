import React, { useState } from 'react';
import './Header.css';

function Header({ currentPage, setCurrentPage, shortlistCount, isLoggedIn, currentUser, onLogout, notificationCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => handleNavigation('search')} style={{ cursor: 'pointer' }}>
          <h1>💑 MatrimonyHub</h1>
        </div>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a 
            href="#search" 
            className={currentPage === 'search' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavigation('search'); }}
          >
            Search
          </a>
          <a 
            href="#shortlisted" 
            className={currentPage === 'shortlisted' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavigation('shortlisted'); }}
          >
            Shortlisted
          </a>
          <a 
            href="#matches" 
            className={currentPage === 'matches' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavigation('matches'); }}
          >
            Matches
          </a>
          <a 
            href="#interests" 
            className={currentPage === 'interests' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavigation('interests'); }}
          >
            Interests
          </a>
          <a 
            href="#messages" 
            className={currentPage === 'messages' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavigation('messages'); }}
          >
            Messages
          </a>
          <a 
            href="#notifications" 
            className={currentPage === 'notifications' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavigation('notifications'); }}
            style={{ position: 'relative' }}
          >
            Notifications
            {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
          </a>
          <a 
            href="#success" 
            className={currentPage === 'success' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavigation('success'); }}
          >
            Success Stories
          </a>
          
          {isLoggedIn ? (
            <>
              {!currentUser?.profilePublished && (
                <button 
                  className="publish-btn"
                  onClick={() => handleNavigation('payment')}
                  title="Publish your profile"
                >
                  🚀 Publish Profile
                </button>
              )}
              <div 
                className="user-info" 
                onClick={() => handleNavigation('profile')}
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
                  setMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              className="login-btn"
              onClick={() => handleNavigation('login')}
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

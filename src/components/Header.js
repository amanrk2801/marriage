import React from 'react';
import './Header.css';

function Header({ currentPage, setCurrentPage, shortlistCount, isLoggedIn, currentUser, onLogout, notificationCount }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => setCurrentPage('search')} style={{ cursor: 'pointer' }}>
          <h1>💑 MatrimonyHub</h1>
        </div>
        <nav className="nav">
          <a 
            href="#search" 
            className={currentPage === 'search' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setCurrentPage('search'); }}
          >
            Search
          </a>
          <a 
            href="#shortlisted" 
            className={currentPage === 'shortlisted' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setCurrentPage('shortlisted'); }}
          >
            Shortlisted
          </a>
          <a 
            href="#matches" 
            className={currentPage === 'matches' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setCurrentPage('matches'); }}
          >
            Matches
          </a>
          <a 
            href="#interests" 
            className={currentPage === 'interests' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setCurrentPage('interests'); }}
          >
            Interests
          </a>
          <a 
            href="#messages" 
            className={currentPage === 'messages' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setCurrentPage('messages'); }}
          >
            Messages
          </a>
          <a 
            href="#notifications" 
            className={currentPage === 'notifications' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setCurrentPage('notifications'); }}
            style={{ position: 'relative' }}
          >
            Notifications
            {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
          </a>
          <a 
            href="#success" 
            className={currentPage === 'success' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setCurrentPage('success'); }}
          >
            Success Stories
          </a>
          
          {isLoggedIn ? (
            <>
              {/* MVP: Payment disabled - Uncomment below when enabling payment */}
              {/* {!currentUser?.profilePublished && (
                <button 
                  className="publish-btn"
                  onClick={() => setCurrentPage('payment')}
                  title="Publish your profile"
                >
                  🚀 Publish Profile
                </button>
              )} */}
              <div 
                className="user-info" 
                onClick={() => setCurrentPage('profile')}
                style={{ cursor: 'pointer' }}
                title="View Profile"
              >
                <span className="user-icon">👤</span>
                <span className="user-name">{currentUser?.name}</span>
              </div>
              <button 
                className="logout-btn"
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              className="login-btn"
              onClick={() => setCurrentPage('login')}
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

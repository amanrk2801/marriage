import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProfileList from './components/ProfileList';
import Shortlisted from './components/Shortlisted';
import Login from './components/Login';
import Register from './components/Register';
import ProfileSettings from './components/ProfileSettings';
import Matches from './components/Matches';
import SuccessStories from './components/SuccessStories';
import Notifications from './components/Notifications';
import Messages from './components/Messages';
import Interests from './components/Interests';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('search');
  const [shortlistedProfiles, setShortlistedProfiles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    gender: 'all',
    ageRange: [18, 50],
    religion: 'all',
    caste: 'all',
    location: ''
  });

  // Check for existing session on mount
  React.useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { authAPI } = require('./services/api');
        const response = await authAPI.getCurrentUser();
        if (response.data.success) {
          setIsLoggedIn(true);
          setCurrentUser(response.data.user);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  // Fetch notification count periodically
  React.useEffect(() => {
    if (isLoggedIn) {
      fetchNotificationCount();
      const interval = setInterval(fetchNotificationCount, 30000); // Every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const fetchNotificationCount = async () => {
    try {
      const { notificationAPI } = require('./services/api');
      const response = await notificationAPI.getNotifications();
      if (response.data.success) {
        const unread = response.data.notifications.filter(n => !n.read).length;
        setNotificationCount(unread);
      }
    } catch (error) {
      console.error('Failed to fetch notification count:', error);
    }
  };

  const addToShortlist = (profile) => {
    if (!shortlistedProfiles.find(p => p.id === profile.id)) {
      setShortlistedProfiles([...shortlistedProfiles, profile]);
    }
  };

  const removeFromShortlist = (profileId) => {
    setShortlistedProfiles(shortlistedProfiles.filter(p => p.id !== profileId));
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setCurrentPage('search');
  };

  const handleRegister = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setCurrentPage('search');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShortlistedProfiles([]);
    setCurrentPage('search');
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      const { profileAPI } = require('./services/api');
      await profileAPI.updateProfile(updatedData);
      
      setCurrentUser({
        ...currentUser,
        ...updatedData
      });
    } catch (error) {
      console.error('Update profile error:', error);
      alert('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="App">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: '#667eea', fontSize: '1.2rem' }}>Loading MatrimonyHub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        shortlistCount={shortlistedProfiles.length}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
        notificationCount={notificationCount}
      />
      
      {currentPage === 'search' && (
        <>
          <SearchBar filters={filters} setFilters={setFilters} />
          <ProfileList 
            filters={filters} 
            onAddToShortlist={addToShortlist}
            shortlistedIds={shortlistedProfiles.map(p => p.id)}
            isLoggedIn={isLoggedIn}
            onNavigateToLogin={() => setCurrentPage('login')}
            onNavigateToRegister={() => setCurrentPage('register')}
          />
        </>
      )}
      
      {currentPage === 'shortlisted' && (
        <Shortlisted 
          shortlistedProfiles={shortlistedProfiles}
          onRemoveShortlist={removeFromShortlist}
          onNavigateToSearch={() => setCurrentPage('search')}
          isLoggedIn={isLoggedIn}
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateToRegister={() => setCurrentPage('register')}
        />
      )}

      {currentPage === 'login' && (
        <Login 
          onSwitchToRegister={() => setCurrentPage('register')}
          onClose={() => setCurrentPage('search')}
          onLogin={handleLogin}
        />
      )}

      {currentPage === 'register' && (
        <Register 
          onSwitchToLogin={() => setCurrentPage('login')}
          onClose={() => setCurrentPage('search')}
          onRegister={handleRegister}
        />
      )}

      {currentPage === 'profile' && isLoggedIn && (
        <ProfileSettings 
          currentUser={currentUser}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {currentPage === 'matches' && (
        <Matches 
          currentUser={currentUser}
          onAddToShortlist={addToShortlist}
          shortlistedIds={shortlistedProfiles.map(p => p.id)}
          isLoggedIn={isLoggedIn}
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateToRegister={() => setCurrentPage('register')}
        />
      )}

      {currentPage === 'success' && <SuccessStories />}

      {currentPage === 'notifications' && (
        <Notifications 
          isLoggedIn={isLoggedIn} 
          currentUser={currentUser}
          onNotificationUpdate={fetchNotificationCount}
        />
      )}

      {currentPage === 'messages' && (
        <Messages isLoggedIn={isLoggedIn} currentUser={currentUser} />
      )}

      {currentPage === 'interests' && (
        <Interests isLoggedIn={isLoggedIn} currentUser={currentUser} />
      )}

      <Footer />
    </div>
  );
}

export default App;

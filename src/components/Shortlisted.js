import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import ProfileView from './ProfileView';
import './Shortlisted.css';

function Shortlisted({ shortlistedProfiles, onRemoveShortlist, onNavigateToSearch, isLoggedIn, onNavigateToLogin, onNavigateToRegister }) {
  const [selectedProfile, setSelectedProfile] = useState(null);

  if (shortlistedProfiles.length === 0) {
    return (
      <div className="shortlisted-page">
        <div className="shortlisted-container">
          <h2>My Shortlisted Profiles</h2>
          <div className="empty-state">
            <div className="empty-icon">💝</div>
            <h3>No Shortlisted Profiles Yet</h3>
            <p>Start browsing profiles and add them to your shortlist to see them here.</p>
            <button className="browse-btn" onClick={onNavigateToSearch}>
              Browse Profiles
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="shortlisted-page">
        <div className="shortlisted-container">
          <div className="shortlisted-header">
            <h2>My Shortlisted Profiles</h2>
            <span className="count-badge">{shortlistedProfiles.length} Profiles</span>
          </div>
          <div className="profiles-grid">
            {shortlistedProfiles.map(profile => (
              <div key={profile.id} className="shortlisted-card-wrapper">
                <button 
                  className="remove-shortlist-btn"
                  onClick={() => onRemoveShortlist(profile.id)}
                  title="Remove from shortlist"
                >
                  ✕
                </button>
                <ProfileCard 
                  profile={profile} 
                  onViewProfile={setSelectedProfile}
                  isLoggedIn={isLoggedIn}
                  onNavigateToLogin={onNavigateToLogin}
                  onNavigateToRegister={onNavigateToRegister}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedProfile && (
        <ProfileView 
          profile={selectedProfile} 
          onClose={() => setSelectedProfile(null)}
          isLoggedIn={isLoggedIn}
          onNavigateToLogin={onNavigateToLogin}
          onNavigateToRegister={onNavigateToRegister}
        />
      )}
    </>
  );
}

export default Shortlisted;

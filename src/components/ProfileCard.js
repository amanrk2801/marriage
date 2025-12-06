import React, { useState } from 'react';
import './ProfileCard.css';
import InterestModal from './InterestModal';
import { getImageUrl } from '../services/api';

function ProfileCard({ profile, onViewProfile, onAddToShortlist, isShortlisted, isLoggedIn, onNavigateToLogin, onNavigateToRegister, priority = false }) {
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleShortlist = (e) => {
    e.stopPropagation();
    if (!isShortlisted && onAddToShortlist) {
      onAddToShortlist(profile);
    }
  };

  const handleInterest = (e) => {
    e.stopPropagation();
    setShowInterestModal(true);
  };

  const profileImageUrl = profile.profileImage ? getImageUrl(profile.profileImage) : null;

  return (
    <>
      <div className="profile-card">
        {onAddToShortlist && (
          <button 
            className={`shortlist-icon ${isShortlisted ? 'shortlisted' : ''}`}
            onClick={handleShortlist}
            title={isShortlisted ? 'Already shortlisted' : 'Add to shortlist'}
          >
            {isShortlisted ? '❤️' : '🤍'}
          </button>
        )}
        <div className={`profile-image ${profile.gender}`}>
          {profileImageUrl && !imageError ? (
            <img 
              src={profileImageUrl} 
              alt={profile.name}
              className="profile-photo"
              onError={() => setImageError(true)}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
            />
          ) : (
            <span className="emoji">{profile.image}</span>
          )}
        </div>
        <div className="profile-info">
          <h3>{profile.name}</h3>
          <p className="profile-age">{profile.age} years</p>
          <div className="profile-details">
            <p><strong>Height:</strong> {profile.height}</p>
            <p><strong>Religion:</strong> {profile.religion}</p>
            <p><strong>Caste:</strong> {profile.caste}</p>
            <p><strong>Location:</strong> {profile.location}</p>
            <p><strong>Education:</strong> {profile.education}</p>
            <p><strong>Profession:</strong> {profile.profession}</p>
          </div>
          <div className="profile-actions">
            <button className="interest-btn" onClick={handleInterest}>Send Interest</button>
            <button className="view-btn" onClick={() => onViewProfile(profile)}>View Profile</button>
          </div>
        </div>
      </div>

      {showInterestModal && (
        <InterestModal 
          profile={profile}
          onClose={() => setShowInterestModal(false)}
          isLoggedIn={isLoggedIn}
          onNavigateToLogin={onNavigateToLogin}
          onNavigateToRegister={onNavigateToRegister}
        />
      )}
    </>
  );
}

export default ProfileCard;

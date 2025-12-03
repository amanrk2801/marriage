import React, { useState, useEffect } from 'react';
import './ProfileView.css';
import InterestModal from './InterestModal';
import MessageModal from './MessageModal';
import { getImageUrl, profileViewAPI } from '../services/api';

function ProfileView({ profile, onClose, onAddToShortlist, isShortlisted, isLoggedIn, onNavigateToLogin, onNavigateToRegister }) {
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Record profile view
  useEffect(() => {
    if (profile && isLoggedIn && profile._id) {
      profileViewAPI.recordView(profile._id).catch(err => {
        console.error('Failed to record profile view:', err);
      });
    }
  }, [profile, isLoggedIn]);

  if (!profile) return null;

  const profileImageUrl = profile.profileImage ? getImageUrl(profile.profileImage) : null;

  return (
    <div className="profile-view-overlay" onClick={onClose}>
      <div className="profile-view-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="profile-view-content">
          <div className="profile-view-header">
            <div className={`profile-view-image ${profile.gender}`}>
              {profileImageUrl && !imageError ? (
                <img 
                  src={profileImageUrl} 
                  alt={profile.name}
                  className="profile-view-photo"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="emoji">{profile.image}</span>
              )}
            </div>
            <div className="profile-view-basic">
              <h2>
                {profile.name}
                {profile.idVerified && (
                  <span className="verified-badge-large" title="ID Verified - Trusted Profile">
                    ✓ Verified
                  </span>
                )}
              </h2>
              <p className="profile-id">Profile ID: {profile.id}00{profile.age}</p>
              <p className="profile-status">✓ Verified Profile</p>
            </div>
          </div>

          <div className="profile-view-sections">
            <section className="info-section">
              <h3>Basic Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Age:</span>
                  <span className="value">{profile.age} years</span>
                </div>
                <div className="info-item">
                  <span className="label">Height:</span>
                  <span className="value">{profile.height}</span>
                </div>
                <div className="info-item">
                  <span className="label">Gender:</span>
                  <span className="value">{profile.gender === 'groom' ? 'Male' : 'Female'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Marital Status:</span>
                  <span className="value">Never Married</span>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h3>Religious Background</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Religion:</span>
                  <span className="value">{profile.religion}</span>
                </div>
                <div className="info-item">
                  <span className="label">Caste:</span>
                  <span className="value">{profile.caste}</span>
                </div>
                <div className="info-item">
                  <span className="label">Mother Tongue:</span>
                  <span className="value">Hindi</span>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h3>Location</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">City:</span>
                  <span className="value">{profile.location}</span>
                </div>
                <div className="info-item">
                  <span className="label">State:</span>
                  <span className="value">India</span>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h3>Education & Career</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Education:</span>
                  <span className="value">{profile.education}</span>
                </div>
                <div className="info-item">
                  <span className="label">Profession:</span>
                  <span className="value">{profile.profession}</span>
                </div>
                <div className="info-item">
                  <span className="label">Annual Income:</span>
                  <span className="value">₹8-10 Lakhs</span>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h3>Family Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Father's Occupation:</span>
                  <span className="value">Business</span>
                </div>
                <div className="info-item">
                  <span className="label">Mother's Occupation:</span>
                  <span className="value">Homemaker</span>
                </div>
                <div className="info-item">
                  <span className="label">Siblings:</span>
                  <span className="value">1 Brother, 1 Sister</span>
                </div>
                <div className="info-item">
                  <span className="label">Family Type:</span>
                  <span className="value">Joint Family</span>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h3>About</h3>
              <p className="about-text">
                {profile.about || `I am a ${profile.profession?.toLowerCase() || 'professional'} based in ${profile.location || 'India'}. I come from a well-educated and respected family. I am looking for a life partner who is understanding, caring, and shares similar values. I enjoy traveling, reading, and spending quality time with family and friends.`}
              </p>
            </section>

            {profile.partnerPreferences && (
              <section className="info-section">
                <h3>Partner Preferences</h3>
                {(profile.partnerPreferences.ageRange || 
                  profile.partnerPreferences.heightRange || 
                  profile.partnerPreferences.religion || 
                  profile.partnerPreferences.caste ||
                  profile.partnerPreferences.education ||
                  profile.partnerPreferences.profession ||
                  profile.partnerPreferences.location) && (
                  <div className="info-grid" style={{ marginBottom: '20px' }}>
                    {profile.partnerPreferences.ageRange && (
                      <div className="info-item">
                        <span className="label">Age Range:</span>
                        <span className="value">{profile.partnerPreferences.ageRange}</span>
                      </div>
                    )}
                    {profile.partnerPreferences.heightRange && (
                      <div className="info-item">
                        <span className="label">Height Range:</span>
                        <span className="value">{profile.partnerPreferences.heightRange}</span>
                      </div>
                    )}
                    {profile.partnerPreferences.religion && (
                      <div className="info-item">
                        <span className="label">Religion:</span>
                        <span className="value">{profile.partnerPreferences.religion}</span>
                      </div>
                    )}
                    {profile.partnerPreferences.caste && (
                      <div className="info-item">
                        <span className="label">Caste:</span>
                        <span className="value">{profile.partnerPreferences.caste}</span>
                      </div>
                    )}
                    {profile.partnerPreferences.education && (
                      <div className="info-item">
                        <span className="label">Education:</span>
                        <span className="value">{profile.partnerPreferences.education}</span>
                      </div>
                    )}
                    {profile.partnerPreferences.profession && (
                      <div className="info-item">
                        <span className="label">Profession:</span>
                        <span className="value">{profile.partnerPreferences.profession}</span>
                      </div>
                    )}
                    {profile.partnerPreferences.location && (
                      <div className="info-item">
                        <span className="label">Location:</span>
                        <span className="value">{profile.partnerPreferences.location}</span>
                      </div>
                    )}
                  </div>
                )}
                <p className="about-text">
                  {profile.partnerPreferences.description || `Looking for a well-educated partner from a good family background. Should be understanding, caring, and family-oriented. Age between ${profile.age - 3} to ${profile.age + 3} years. Preferably from ${profile.location || 'nearby cities'}.`}
                </p>
              </section>
            )}
          </div>

          <div className="profile-view-actions">
            <button 
              className="action-btn interest-btn"
              onClick={() => setShowInterestModal(true)}
            >
              Send Interest
            </button>
            <button 
              className="action-btn message-btn"
              onClick={() => setShowMessageModal(true)}
            >
              Send Message
            </button>
            <button 
              className={`action-btn shortlist-btn ${isShortlisted ? 'shortlisted' : ''}`}
              onClick={() => !isShortlisted && onAddToShortlist && onAddToShortlist(profile)}
              disabled={isShortlisted}
            >
              {isShortlisted ? '✓ Shortlisted' : 'Add to Shortlist'}
            </button>
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

      {showMessageModal && (
        <MessageModal 
          profile={profile}
          onClose={() => setShowMessageModal(false)}
          isLoggedIn={isLoggedIn}
          onNavigateToLogin={onNavigateToLogin}
          onNavigateToRegister={onNavigateToRegister}
        />
      )}
    </div>
  );
}

export default ProfileView;

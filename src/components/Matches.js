import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import ProfileView from './ProfileView';
import { profileAPI } from '../services/api';
import './ProfileList.css';

// Generate matches from API
const generateMatches = async (currentUser) => {
  try {
    // Fetch profiles of opposite gender
    const oppositeGender = currentUser?.gender === 'male' ? 'female' : 'male';
    const response = await profileAPI.getProfiles({
      gender: oppositeGender,
      limit: 6
    });

    if (response.data.success) {
      return response.data.profiles.map((p, index) => ({
        ...p,
        id: p._id,
        image: p.gender === 'male' ? '👨' : '👩',
        gender: p.gender === 'male' ? 'groom' : 'bride',
        profileImage: p.profileImage,
        matchScore: 95 - (index * 2) // Simulated match score
      }));
    }
  } catch (error) {
    console.error('Failed to fetch matches:', error);
  }
  
  // Fallback to sample data
  const allProfiles = [
    { id: 1, name: 'Rahul Sharma', age: 28, gender: 'groom', height: '5\'10"', religion: 'Hindu', caste: 'Brahmin', location: 'Mumbai', education: 'MBA', profession: 'Software Engineer', image: '👨', matchScore: 95 },
    { id: 2, name: 'Priya Patel', age: 25, gender: 'bride', height: '5\'5"', religion: 'Hindu', caste: 'Patel', location: 'Delhi', education: 'B.Tech', profession: 'Doctor', image: '👩', matchScore: 92 },
    { id: 4, name: 'Sneha Reddy', age: 27, gender: 'bride', height: '5\'6"', religion: 'Hindu', caste: 'Reddy', location: 'Hyderabad', education: 'MBA', profession: 'Marketing Manager', image: '👩', matchScore: 88 },
    { id: 6, name: 'Anjali Verma', age: 24, gender: 'bride', height: '5\'4"', religion: 'Hindu', caste: 'Brahmin', location: 'Pune', education: 'B.Com', profession: 'Teacher', image: '👩', matchScore: 85 },
    { id: 3, name: 'Amit Kumar', age: 30, gender: 'groom', height: '5\'11"', religion: 'Hindu', caste: 'Rajput', location: 'Bangalore', education: 'M.Tech', profession: 'Business Analyst', image: '👨', matchScore: 90 },
    { id: 7, name: 'Vikram Malhotra', age: 29, gender: 'groom', height: '5\'9"', religion: 'Hindu', caste: 'Khatri', location: 'Mumbai', education: 'B.Tech', profession: 'Data Scientist', image: '👨', matchScore: 87 },
  ];

  const oppositeGender = currentUser?.gender === 'male' ? 'bride' : 'groom';
  return allProfiles.filter(p => p.gender === oppositeGender);
};

function Matches({ currentUser, onAddToShortlist, shortlistedIds, isLoggedIn, onNavigateToLogin, onNavigateToRegister }) {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      if (isLoggedIn && currentUser) {
        setLoading(true);
        const matchedProfiles = await generateMatches(currentUser);
        setMatches(matchedProfiles);
        setLoading(false);
      }
    };
    
    fetchMatches();
  }, [isLoggedIn, currentUser]);

  if (!isLoggedIn) {
    return (
      <div className="profile-list">
        <div className="profile-container">
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2 style={{ fontSize: '2rem', color: '#333', marginBottom: '20px' }}>
              🔒 Login Required
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              Please login to view your personalized matches
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-list">
        <div className="profile-container">
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <div className="spinner" style={{ width: '60px', height: '60px', margin: '0 auto 20px' }}></div>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>Loading your matches...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="profile-list">
        <div className="profile-container">
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '2rem', color: '#333', marginBottom: '10px' }}>
              💝 Your Perfect Matches
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              Based on your preferences and profile
            </p>
          </div>
          <h3>{matches.length} Matches Found</h3>
          <div className="profiles-grid">
            {matches.map(profile => (
              <div key={profile.id} style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: '#4caf50',
                  color: 'white',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  zIndex: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  {profile.matchScore}% Match
                </div>
                <ProfileCard 
                  profile={profile} 
                  onViewProfile={setSelectedProfile}
                  onAddToShortlist={onAddToShortlist}
                  isShortlisted={shortlistedIds.includes(profile.id)}
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
          onAddToShortlist={onAddToShortlist}
          isShortlisted={shortlistedIds.includes(selectedProfile.id)}
          isLoggedIn={isLoggedIn}
          onNavigateToLogin={onNavigateToLogin}
          onNavigateToRegister={onNavigateToRegister}
        />
      )}
    </>
  );
}

export default Matches;

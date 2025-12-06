import React, { useState, useEffect, useRef } from 'react';
import ProfileCard from './ProfileCard';
import ProfileView from './ProfileView';
import { profileAPI } from '../services/api';
import './ProfileList.css';

const PROFILES_PER_PAGE = 6;

function ProfileList({ filters, onAddToShortlist, shortlistedIds, isLoggedIn, onNavigateToLogin, onNavigateToRegister }) {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const loaderRef = useRef(null);

  // Sample profiles for demo when backend is not available
  const sampleProfiles = [
    { id: 1, name: 'Rahul Sharma', age: 28, gender: 'groom', height: '5\'10"', religion: 'Hindu', caste: 'Brahmin', location: 'Mumbai', education: 'MBA', profession: 'Software Engineer', image: '👨' },
    { id: 2, name: 'Priya Patel', age: 25, gender: 'bride', height: '5\'5"', religion: 'Hindu', caste: 'Patel', location: 'Delhi', education: 'B.Tech', profession: 'Doctor', image: '👩' },
    { id: 3, name: 'Amit Kumar', age: 30, gender: 'groom', height: '5\'11"', religion: 'Hindu', caste: 'Rajput', location: 'Bangalore', education: 'M.Tech', profession: 'Business Analyst', image: '👨' },
    { id: 4, name: 'Sneha Reddy', age: 27, gender: 'bride', height: '5\'6"', religion: 'Hindu', caste: 'Reddy', location: 'Hyderabad', education: 'MBA', profession: 'Marketing Manager', image: '👩' },
    { id: 5, name: 'Arjun Singh', age: 32, gender: 'groom', height: '6\'0"', religion: 'Sikh', caste: 'Jat', location: 'Chandigarh', education: 'CA', profession: 'Chartered Accountant', image: '👨' },
    { id: 6, name: 'Anjali Verma', age: 24, gender: 'bride', height: '5\'4"', religion: 'Hindu', caste: 'Brahmin', location: 'Pune', education: 'B.Com', profession: 'Teacher', image: '👩' },
    { id: 7, name: 'Vikram Malhotra', age: 29, gender: 'groom', height: '5\'9"', religion: 'Hindu', caste: 'Khatri', location: 'Mumbai', education: 'B.Tech', profession: 'Data Scientist', image: '👨' },
    { id: 8, name: 'Neha Kapoor', age: 26, gender: 'bride', height: '5\'5"', religion: 'Hindu', caste: 'Khatri', location: 'Delhi', education: 'M.Sc', profession: 'Pharmacist', image: '👩' },
    { id: 9, name: 'Rohan Gupta', age: 31, gender: 'groom', height: '5\'11"', religion: 'Hindu', caste: 'Vaishya', location: 'Jaipur', education: 'MBA', profession: 'Business Owner', image: '👨' },
    { id: 10, name: 'Kavya Iyer', age: 23, gender: 'bride', height: '5\'3"', religion: 'Hindu', caste: 'Iyer', location: 'Chennai', education: 'B.Sc', profession: 'Software Developer', image: '👩' },
    { id: 11, name: 'Karan Mehta', age: 29, gender: 'groom', height: '5\'10"', religion: 'Hindu', caste: 'Brahmin', location: 'Ahmedabad', education: 'B.Tech', profession: 'Civil Engineer', image: '👨' },
    { id: 12, name: 'Divya Shah', age: 26, gender: 'bride', height: '5\'4"', religion: 'Hindu', caste: 'Patel', location: 'Surat', education: 'MBA', profession: 'HR Manager', image: '👩' }
  ];

  // Fetch profiles from API
  const fetchProfiles = async (pageNum = 1, append = false) => {
    setIsLoading(true);
    setError('');

    try {
      // Convert bride/groom to male/female for backend
      let genderValue = undefined;
      if (filters.gender !== 'all') {
        genderValue = filters.gender === 'groom' ? 'male' : filters.gender === 'bride' ? 'female' : filters.gender;
      }

      const params = {
        page: pageNum,
        limit: PROFILES_PER_PAGE,
        gender: genderValue,
        ageMin: filters.ageRange[0],
        ageMax: filters.ageRange[1],
        religion: filters.religion !== 'all' ? filters.religion : undefined,
        caste: filters.caste !== 'all' ? filters.caste : undefined,
        location: filters.location || undefined
      };

      console.log('Fetching profiles with params:', params);
      const response = await profileAPI.getProfiles(params);

      if (response.data.success) {
        console.log('Backend returned profiles:', response.data.profiles.length);
        console.log('Profile data:', response.data.profiles);
        
        const newProfiles = response.data.profiles.map(p => ({
          ...p,
          id: p._id,
          image: p.gender === 'male' ? '👨' : '👩',
          gender: p.gender === 'male' ? 'groom' : 'bride',
          profileImage: p.profileImage // Keep the profile image path
        }));

        if (append) {
          setProfiles(prev => [...prev, ...newProfiles]);
        } else {
          setProfiles(newProfiles);
        }
        
        setTotalPages(response.data.pagination.pages);
        setPage(pageNum);
        
        // Show info message if we have real profiles
        if (newProfiles.length > 0 && newProfiles.length < 6) {
          setError(`Showing ${newProfiles.length} real profile${newProfiles.length > 1 ? 's' : ''} from database.`);
        }
      }
    } catch (err) {
      console.error('Fetch profiles error:', err);
      
      // Use sample profiles as fallback
      if (!append && pageNum === 1) {
        // Filter sample profiles based on current filters
        const filteredSamples = sampleProfiles.filter(profile => {
          if (filters.gender !== 'all' && profile.gender !== filters.gender) return false;
          if (profile.age < filters.ageRange[0] || profile.age > filters.ageRange[1]) return false;
          if (filters.religion !== 'all' && profile.religion.toLowerCase() !== filters.religion) return false;
          if (filters.caste !== 'all' && profile.caste.toLowerCase() !== filters.caste) return false;
          if (filters.location && !profile.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
          return true;
        });
        
        setProfiles(filteredSamples);
        setTotalPages(Math.ceil(filteredSamples.length / PROFILES_PER_PAGE));
        setError('Backend server not connected. Showing sample profiles for demo.');
      } else {
        setError('Failed to load more profiles. Please check if backend server is running.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch profiles on mount and filter change
  useEffect(() => {
    fetchProfiles(1, false);
  }, [filters]);

  const hasMore = page < totalPages;

  // Load more profiles
  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchProfiles(page + 1, true);
    }
  };

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, isLoading, page]);

  // Show initial loading
  if (isLoading && profiles.length === 0 && !error) {
    return (
      <div className="profile-list">
        <div className="profile-container">
          <div className="loading-initial">
            <div className="spinner"></div>
            <p>Loading profiles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="profile-list">
        <div className="profile-container">
          {error && profiles.length === 0 && (
            <div className="error-state">
              <div className="error-icon">⚠️</div>
              <h3>Connection Issue</h3>
              <p>{error}</p>
              <button className="retry-btn" onClick={() => fetchProfiles(1, false)}>
                🔄 Try Again
              </button>
            </div>
          )}
          {profiles.length > 0 && (
            <h3>
              {profiles.length} Profile{profiles.length !== 1 ? 's' : ''} Found
            </h3>
          )}
          {profiles.length === 0 && !error && !isLoading && (
            <div className="empty-state">
              <div className="error-icon">🔍</div>
              <h3>No Profiles Found</h3>
              <p>Try adjusting your search filters to see more results.</p>
            </div>
          )}
          <div className="profiles-grid">
            {profiles.map((profile, index) => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                onViewProfile={setSelectedProfile}
                onAddToShortlist={onAddToShortlist}
                isShortlisted={shortlistedIds.includes(profile.id)}
                isLoggedIn={isLoggedIn}
                onNavigateToLogin={onNavigateToLogin}
                onNavigateToRegister={onNavigateToRegister}
                priority={index < 4}
              />
            ))}
          </div>

          {/* Infinite scroll trigger */}
          {hasMore && (
            <div ref={loaderRef} className="load-more-container">
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading more profiles...</p>
                </div>
              ) : (
                <button className="load-more-btn" onClick={loadMore}>
                  Load More Profiles
                </button>
              )}
            </div>
          )}

          {!hasMore && profiles.length > 0 && (
            <div className="end-message">
              <p>🎉 You've seen all matching profiles!</p>
            </div>
          )}
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

export default ProfileList;

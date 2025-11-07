import React, { useState, useEffect } from 'react';
import { interestAPI } from '../services/api';
import { getImageUrl } from '../services/api';
import './Interests.css';

function Interests({ isLoggedIn, currentUser }) {
  const [activeTab, setActiveTab] = useState('received');
  const [sentInterests, setSentInterests] = useState([]);
  const [receivedInterests, setReceivedInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      fetchInterests();
    }
  }, [isLoggedIn]);

  const fetchInterests = async () => {
    try {
      console.log('Fetching interests...');
      const [sentRes, receivedRes] = await Promise.all([
        interestAPI.getSentInterests(),
        interestAPI.getReceivedInterests()
      ]);

      console.log('Sent interests response:', sentRes.data);
      console.log('Received interests response:', receivedRes.data);

      if (sentRes.data.success) {
        console.log('Setting sent interests:', sentRes.data.interests.length);
        setSentInterests(sentRes.data.interests);
      }
      if (receivedRes.data.success) {
        console.log('Setting received interests:', receivedRes.data.interests.length);
        setReceivedInterests(receivedRes.data.interests);
      }
    } catch (error) {
      console.error('Failed to fetch interests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (interestId) => {
    setActionLoading({ ...actionLoading, [interestId]: 'accepting' });
    try {
      await interestAPI.acceptInterest(interestId);
      // Remove from local state immediately for better UX
      setReceivedInterests(receivedInterests.filter(i => i._id !== interestId));
      // Also refresh to get updated data
      setTimeout(() => fetchInterests(), 500);
    } catch (error) {
      console.error('Failed to accept interest:', error);
      alert(error.response?.data?.message || 'Failed to accept interest');
      // Refresh on error to restore state
      fetchInterests();
    } finally {
      setActionLoading({ ...actionLoading, [interestId]: null });
    }
  };

  const handleReject = async (interestId) => {
    setActionLoading({ ...actionLoading, [interestId]: 'rejecting' });
    try {
      await interestAPI.rejectInterest(interestId);
      // Remove from local state immediately for better UX
      setReceivedInterests(receivedInterests.filter(i => i._id !== interestId));
      // Also refresh to get updated data
      setTimeout(() => fetchInterests(), 500);
    } catch (error) {
      console.error('Failed to reject interest:', error);
      alert(error.response?.data?.message || 'Failed to reject interest');
      // Refresh on error to restore state
      fetchInterests();
    } finally {
      setActionLoading({ ...actionLoading, [interestId]: null });
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: 'Pending', class: 'status-pending' },
      accepted: { text: 'Accepted', class: 'status-accepted' },
      rejected: { text: 'Rejected', class: 'status-rejected' }
    };
    return badges[status] || badges.pending;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="interests-page">
        <div className="interests-container">
          <div className="empty-state">
            <div className="empty-icon">💝</div>
            <h2>Login Required</h2>
            <p>Please login to view your interests</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="interests-page">
        <div className="interests-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading interests...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentInterests = activeTab === 'sent' ? sentInterests : receivedInterests;

  return (
    <div className="interests-page">
      <div className="interests-container">
        <div className="interests-header">
          <h2>My Interests</h2>
          <div className="interests-stats">
            <span className="stat-item">
              <strong>{sentInterests.length}</strong> Sent
            </span>
            <span className="stat-item">
              <strong>{receivedInterests.length}</strong> Received
            </span>
          </div>
        </div>

        <div className="interests-tabs">
          <button
            className={`tab-btn ${activeTab === 'received' ? 'active' : ''}`}
            onClick={() => setActiveTab('received')}
          >
            Received ({receivedInterests.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'sent' ? 'active' : ''}`}
            onClick={() => setActiveTab('sent')}
          >
            Sent ({sentInterests.length})
          </button>
        </div>

        <div className="interests-list">
          {currentInterests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💝</div>
              <h3>No {activeTab} interests</h3>
              <p>
                {activeTab === 'sent'
                  ? 'Start sending interests to profiles you like'
                  : 'No one has sent you an interest yet'}
              </p>
            </div>
          ) : (
            currentInterests.map((interest) => {
              const profile = activeTab === 'sent' ? interest.to : interest.from;
              const statusBadge = getStatusBadge(interest.status);

              return (
                <div key={interest._id} className="interest-card">
                  <div className="interest-avatar">
                    {profile.profileImage ? (
                      <img src={getImageUrl(profile.profileImage)} alt={profile.name} />
                    ) : (
                      <span className="avatar-emoji">
                        {profile.gender === 'male' ? '👨' : '👩'}
                      </span>
                    )}
                  </div>

                  <div className="interest-info">
                    <h3>{profile.name}</h3>
                    <p className="interest-details">
                      {profile.age} years • {profile.location}
                    </p>
                    <p className="interest-meta">
                      {profile.education} • {profile.profession}
                    </p>
                    <p className="interest-date">
                      {formatDate(interest.createdAt)}
                    </p>
                  </div>

                  <div className="interest-actions">
                    <span className={`status-badge ${statusBadge.class}`}>
                      {statusBadge.text}
                    </span>

                    {activeTab === 'received' && interest.status === 'pending' && (
                      <div className="action-buttons">
                        <button
                          className="accept-btn"
                          onClick={() => handleAccept(interest._id)}
                          disabled={actionLoading[interest._id]}
                        >
                          {actionLoading[interest._id] === 'accepting' ? '⏳' : '✓'} Accept
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleReject(interest._id)}
                          disabled={actionLoading[interest._id]}
                        >
                          {actionLoading[interest._id] === 'rejecting' ? '⏳' : '✕'} Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Interests;

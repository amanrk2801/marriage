import React, { useState } from 'react';
import { interestAPI } from '../services/api';
import './InterestModal.css';

function InterestModal({ profile, onClose, isLoggedIn, onNavigateToLogin, onNavigateToRegister }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    setSending(true);
    setError('');

    try {
      // Use profile._id or profile.id
      const profileId = profile._id || profile.id;
      
      const response = await interestAPI.sendInterest(profileId);
      
      if (response.data.success) {
        setSent(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error('Send interest error:', err);
      const errorMsg = err.response?.data?.message || 'Failed to send interest';
      setError(errorMsg);
    } finally {
      setSending(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>🔒 Login Required</h3>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
          <div className="modal-body">
            <div className="interest-message">
              <p>Please login or register to send interest to profiles and connect with potential matches.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-btn modal-btn-cancel" 
                onClick={() => {
                  onClose();
                  onNavigateToRegister();
                }}
              >
                Register Free
              </button>
              <button 
                className="modal-btn modal-btn-send" 
                onClick={() => {
                  onClose();
                  onNavigateToLogin();
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-body">
            <div className="success-animation">
              <div className="success-icon">✅</div>
              <h3>Interest Sent Successfully!</h3>
              <p>We'll notify you when {profile.name} responds to your interest.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>💝 Send Interest</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="profile-preview">
            <div className={`preview-avatar ${profile.gender}`}>
              <span>{profile.image}</span>
            </div>
            <div className="preview-info">
              <h4>{profile.name}</h4>
              <p>{profile.age} years • {profile.location}</p>
              <p>{profile.profession}</p>
            </div>
          </div>

          <div className="interest-message">
            <p>
              <strong>What happens next?</strong><br />
              • {profile.name} will be notified about your interest<br />
              • If they accept, you can start messaging<br />
              • You'll receive a notification about their response
            </p>
          </div>

          {error && (
            <div className="error-message" style={{ 
              color: '#f44336', 
              padding: '10px', 
              background: '#ffebee', 
              borderRadius: '5px',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button 
              className="modal-btn modal-btn-cancel" 
              onClick={onClose}
              disabled={sending}
            >
              Cancel
            </button>
            <button 
              className="modal-btn modal-btn-send" 
              onClick={handleSend}
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Interest'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterestModal;

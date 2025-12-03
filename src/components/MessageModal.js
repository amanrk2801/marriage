import React, { useState, useEffect } from 'react';
import { messageAPI, interestAPI } from '../services/api';
import './InterestModal.css';

function MessageModal({ profile, onClose, isLoggedIn, onNavigateToLogin, onNavigateToRegister }) {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [canMessage, setCanMessage] = useState(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');
  const maxLength = 500;

  useEffect(() => {
    if (isLoggedIn) {
      // MVP: Skip permission check - allow all messaging
      setCanMessage(true);
      setChecking(false);
      
      // Uncomment below when enabling interest-based messaging
      // checkMessagingPermission();
    }
  }, [isLoggedIn]);

  const checkMessagingPermission = async () => {
    try {
      // Check if there's a mutual accepted interest
      const [sentRes, receivedRes] = await Promise.all([
        interestAPI.getSentInterests(),
        interestAPI.getReceivedInterests()
      ]);

      const profileId = profile._id || profile.id;
      
      // Check if we sent interest and it was accepted
      const sentAccepted = sentRes.data.interests?.some(
        i => (i.to._id === profileId || i.to === profileId) && i.status === 'accepted'
      );
      
      // Check if they sent interest and we accepted
      const receivedAccepted = receivedRes.data.interests?.some(
        i => (i.from._id === profileId || i.from === profileId) && i.status === 'accepted'
      );

      setCanMessage(sentAccepted || receivedAccepted);
    } catch (err) {
      console.error('Check messaging permission error:', err);
      setCanMessage(false);
    } finally {
      setChecking(false);
    }
  };

  const handleSend = async () => {
    if (message.trim().length < 10) {
      setError('Please write at least 10 characters');
      return;
    }

    try {
      await messageAPI.sendMessage(profile._id || profile.id, message.trim());
      
      setSent(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Send message error:', err);
      const errorMsg = err.response?.data?.message || 'Failed to send message. Please try again.';
      setError(errorMsg);
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
              <p>Please login or register to send messages to profiles and start meaningful conversations.</p>
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

  if (checking) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-body">
            <div className="success-animation">
              <div className="spinner" style={{
                width: '50px',
                height: '50px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '20px auto'
              }}></div>
              <p>Checking messaging permissions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (canMessage === false) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>🔒 Interest Required</h3>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
          <div className="modal-body">
            <div className="interest-message">
              <p style={{ marginBottom: '15px' }}>
                <strong>You can only message users when:</strong>
              </p>
              <p style={{ marginBottom: '10px' }}>
                ✓ You sent them an interest and they accepted it<br />
                ✓ They sent you an interest and you accepted it
              </p>
              <p style={{ marginTop: '15px', color: '#667eea' }}>
                💡 Send an interest first to start connecting!
              </p>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-btn modal-btn-send" 
                onClick={onClose}
                style={{ width: '100%' }}
              >
                Got it
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
              <div className="success-icon">✉️</div>
              <h3>Message Sent Successfully!</h3>
              <p>Your message has been delivered to {profile.name}.</p>
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
          <h3>💬 Send Message</h3>
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

          <form className="message-form" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <div className="form-group-modal">
              <label>Your Message *</label>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value.slice(0, maxLength));
                  setError('');
                }}
                placeholder="Introduce yourself and express your interest..."
                required
              />
              <div className="char-count">
                {message.length}/{maxLength} characters
              </div>
            </div>

            {error && (
              <div style={{
                color: '#f44336',
                background: '#ffebee',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '15px',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            <div className="interest-message">
              <p>
                <strong>💡 Tips for a great first message:</strong><br />
                • Introduce yourself briefly<br />
                • Mention what caught your attention<br />
                • Be respectful and genuine<br />
                • Ask a thoughtful question
              </p>
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="modal-btn modal-btn-cancel" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="modal-btn modal-btn-send"
                disabled={message.trim().length < 10}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;

import React, { useState, useEffect } from 'react';
import './AdminIDReview.css';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function AdminIDReview() {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [notes, setNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchPendingVerifications();
  }, []);

  const fetchPendingVerifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/id-verification/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setVerifications(response.data.verifications);
      }
    } catch (error) {
      console.error('Failed to fetch verifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (filename) => {
    return `${API_URL.replace('/api', '')}/uploads/id-documents/${filename}`;
  };

  const handleReview = async (verificationId, action) => {
    if (action === 'reject' && !rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    setProcessing(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/id-verification/review/${verificationId}`,
        {
          action: action,
          rejectionReason: action === 'reject' ? rejectionReason : undefined,
          notes: notes
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        alert(action === 'approve' ? 'Verification approved!' : 'Verification rejected');
        setSelectedVerification(null);
        setRejectionReason('');
        setNotes('');
        fetchPendingVerifications();
      }
    } catch (error) {
      alert('Failed to process verification: ' + (error.response?.data?.message || error.message));
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-panel">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading verifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🛡️ ID Verification Review Panel</h1>
        <div className="stats">
          <span className="stat-badge">
            📋 Pending: {verifications.length}
          </span>
        </div>
      </div>

      {verifications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✅</div>
          <h3>All caught up!</h3>
          <p>No pending ID verifications to review</p>
        </div>
      ) : (
        <div className="verifications-grid">
          {verifications.map((verification) => (
            <div key={verification._id} className="verification-card">
              <div className="card-header">
                <div className="user-info">
                  <h3>{verification.userId.name}</h3>
                  <p>{verification.userId.age} years • {verification.userId.gender}</p>
                  <p className="location">{verification.userId.location}</p>
                </div>
                <div className="id-type-badge">
                  {verification.idType.replace('_', ' ').toUpperCase()}
                </div>
              </div>

              <div className="card-body">
                <div className="id-details">
                  <strong>ID Number:</strong> {verification.idNumber}
                </div>
                <div className="submission-date">
                  <strong>Submitted:</strong> {new Date(verification.submittedAt).toLocaleString()}
                </div>
                <div className="contact-info">
                  <p>📧 {verification.userId.email}</p>
                  <p>📱 {verification.userId.mobile}</p>
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="btn-review"
                  onClick={() => setSelectedVerification(verification)}
                >
                  🔍 Review Documents
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedVerification && (
        <div className="review-modal-overlay" onClick={() => setSelectedVerification(null)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Review ID Documents</h2>
              <button className="close-btn" onClick={() => setSelectedVerification(null)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="user-details">
                <h3>{selectedVerification.userId.name}</h3>
                <p>{selectedVerification.idType.replace('_', ' ').toUpperCase()}: {selectedVerification.idNumber}</p>
              </div>

              <div className="documents-grid">
                <div className="document-item">
                  <h4>ID Front Side</h4>
                  <img
                    src={getImageUrl(selectedVerification.idImageFront)}
                    alt="ID Front"
                    className="document-image"
                  />
                </div>

                {selectedVerification.idImageBack && (
                  <div className="document-item">
                    <h4>ID Back Side</h4>
                    <img
                      src={getImageUrl(selectedVerification.idImageBack)}
                      alt="ID Back"
                      className="document-image"
                    />
                  </div>
                )}

                <div className="document-item">
                  <h4>Selfie with ID</h4>
                  <img
                    src={getImageUrl(selectedVerification.selfieWithId)}
                    alt="Selfie"
                    className="document-image"
                  />
                </div>
              </div>

              <div className="review-form">
                <div className="form-group">
                  <label>Rejection Reason (if rejecting)</label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="e.g., ID image is blurry, selfie doesn't match, etc."
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Internal Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any internal notes..."
                    rows="2"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-reject"
                onClick={() => handleReview(selectedVerification._id, 'reject')}
                disabled={processing}
              >
                {processing ? 'Processing...' : '❌ Reject'}
              </button>
              <button
                className="btn-approve"
                onClick={() => handleReview(selectedVerification._id, 'approve')}
                disabled={processing}
              >
                {processing ? 'Processing...' : '✅ Approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminIDReview;

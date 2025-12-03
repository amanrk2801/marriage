import React, { useState } from 'react';
import './IDVerification.css';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function IDVerification({ onVerificationComplete, onSkip }) {
  const [step, setStep] = useState(1);
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idImageFront, setIdImageFront] = useState(null);
  const [idImageBack, setIdImageBack] = useState(null);
  const [selfieWithId, setSelfieWithId] = useState(null);
  const [previewFront, setPreviewFront] = useState(null);
  const [previewBack, setPreviewBack] = useState(null);
  const [previewSelfie, setPreviewSelfie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const idTypes = [
    { value: 'pan', label: 'PAN Card', requiresBack: false },
    { value: 'driving_license', label: 'Driving License', requiresBack: true },
    { value: 'voter_id', label: 'Voter ID Card', requiresBack: true },
    { value: 'passport', label: 'Passport', requiresBack: false },
    { value: 'aadhaar', label: 'Aadhaar Card', requiresBack: true }
  ];

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG, PNG, and PDF files are allowed');
      return;
    }

    setError('');

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'front') {
          setPreviewFront(reader.result);
          setIdImageFront(file);
        } else if (type === 'back') {
          setPreviewBack(reader.result);
          setIdImageBack(file);
        } else if (type === 'selfie') {
          setPreviewSelfie(reader.result);
          setSelfieWithId(file);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // For PDF files
      if (type === 'front') {
        setIdImageFront(file);
        setPreviewFront('PDF');
      } else if (type === 'back') {
        setIdImageBack(file);
        setPreviewBack('PDF');
      }
    }
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('idType', idType);
      formData.append('idNumber', idNumber);
      formData.append('idImageFront', idImageFront);
      if (idImageBack) formData.append('idImageBack', idImageBack);
      formData.append('selfieWithId', selfieWithId);

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/id-verification/submit`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        onVerificationComplete();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedIdType = idTypes.find(t => t.value === idType);
  const canProceedToStep2 = idType && idNumber;
  const canProceedToStep3 = idImageFront && (!selectedIdType?.requiresBack || idImageBack);
  const canSubmit = selfieWithId;

  return (
    <div className="id-verification-overlay">
      <div className="id-verification-modal">
        {step === 1 && (
          <div className="verification-step">
            <div className="verification-icon">🛡️</div>
            <h2>Verify Your Identity</h2>
            <div className="verification-info">
              <h3>Why we need ID verification?</h3>
              <ul className="info-list">
                <li>✅ <strong>Prevent Fake Profiles:</strong> One ID = One Profile</li>
                <li>✅ <strong>Build Trust:</strong> Verified profiles get 5x more responses</li>
                <li>✅ <strong>Safe Community:</strong> Protect genuine users from fraud</li>
                <li>✅ <strong>Better Matches:</strong> Connect with verified members only</li>
              </ul>
              
              <div className="privacy-notice">
                <h4>🔒 Your Privacy is Protected</h4>
                <p>
                  • Your ID is <strong>securely stored and encrypted</strong><br/>
                  • Used <strong>only for verification purposes</strong><br/>
                  • <strong>Never shared</strong> with other users<br/>
                  • Reviewed by our team within 24-48 hours<br/>
                  • You can delete your account anytime
                </p>
              </div>

              <div className="accepted-ids">
                <h4>📄 Accepted Government IDs</h4>
                <div className="id-types-grid">
                  <span>🆔 PAN Card</span>
                  <span>🚗 Driving License</span>
                  <span>🗳️ Voter ID</span>
                  <span>✈️ Passport</span>
                  <span>🏛️ Aadhaar Card</span>
                </div>
              </div>
            </div>
            
            <div className="verification-actions">
              <button 
                className="btn-primary" 
                onClick={() => setStep(2)}
              >
                Continue with ID Verification
              </button>
              <button 
                className="btn-skip" 
                onClick={onSkip}
              >
                Skip for Now (Verify Later)
              </button>
            </div>
            
            <p className="verification-note">
              ⚠️ Unverified profiles have 80% less visibility and may not receive interest requests.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="verification-step">
            <div className="verification-icon">📄</div>
            <h2>Select Your ID Type</h2>
            <p className="step-description">Choose the government ID you want to upload</p>

            <form className="id-form">
              <div className="form-group">
                <label>ID Type *</label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  required
                >
                  <option value="">Select ID Type</option>
                  {idTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>ID Number *</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value.toUpperCase())}
                  placeholder="Enter your ID number"
                  required
                />
                <small>Enter the number exactly as shown on your ID</small>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button 
                  type="button" 
                  className="btn-primary"
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep2}
                >
                  Next: Upload Documents
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="verification-step">
            <div className="verification-icon">📸</div>
            <h2>Upload ID Documents</h2>
            <p className="step-description">
              Upload clear photos of your {selectedIdType?.label}
            </p>

            <div className="upload-section">
              <div className="upload-item">
                <label className="upload-label">
                  <div className="upload-box">
                    {previewFront ? (
                      previewFront === 'PDF' ? (
                        <div className="pdf-preview">📄 PDF Uploaded</div>
                      ) : (
                        <img src={previewFront} alt="ID Front" />
                      )
                    ) : (
                      <>
                        <div className="upload-icon">📷</div>
                        <p>Front Side *</p>
                        <small>Click to upload</small>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileChange(e, 'front')}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              {selectedIdType?.requiresBack && (
                <div className="upload-item">
                  <label className="upload-label">
                    <div className="upload-box">
                      {previewBack ? (
                        previewBack === 'PDF' ? (
                          <div className="pdf-preview">📄 PDF Uploaded</div>
                        ) : (
                          <img src={previewBack} alt="ID Back" />
                        )
                      ) : (
                        <>
                          <div className="upload-icon">📷</div>
                          <p>Back Side *</p>
                          <small>Click to upload</small>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, 'back')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="upload-tips">
              <h4>📌 Tips for clear photos:</h4>
              <ul>
                <li>✓ Ensure all text is readable</li>
                <li>✓ No glare or shadows</li>
                <li>✓ Full document visible</li>
                <li>✓ Good lighting</li>
              </ul>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => setStep(4)}
                disabled={!canProceedToStep3}
              >
                Next: Selfie Verification
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="verification-step">
            <div className="verification-icon">🤳</div>
            <h2>Selfie with ID</h2>
            <p className="step-description">
              Take a selfie holding your {selectedIdType?.label}
            </p>

            <div className="selfie-instructions">
              <h4>📸 How to take the selfie:</h4>
              <ol>
                <li>Hold your ID next to your face</li>
                <li>Ensure your face is clearly visible</li>
                <li>ID details should be readable</li>
                <li>Good lighting, no filters</li>
              </ol>
            </div>

            <div className="upload-section">
              <div className="upload-item full-width">
                <label className="upload-label">
                  <div className="upload-box selfie-box">
                    {previewSelfie ? (
                      <img src={previewSelfie} alt="Selfie with ID" />
                    ) : (
                      <>
                        <div className="upload-icon">🤳</div>
                        <p>Upload Selfie with ID *</p>
                        <small>Click to upload or take photo</small>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={(e) => handleFileChange(e, 'selfie')}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setStep(3)}
                disabled={loading}
              >
                Back
              </button>
              <button 
                type="button" 
                className="btn-primary"
                onClick={handleSubmit}
                disabled={!canSubmit || loading}
              >
                {loading ? 'Submitting...' : 'Submit for Verification'}
              </button>
            </div>

            <div className="security-badge">
              <span>🔐</span> Your documents are encrypted and secure
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IDVerification;

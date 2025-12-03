import React, { useState } from 'react';
import './Login.css';
import { authAPI } from '../services/api';
import IDVerification from './IDVerification';

function Register({ onSwitchToLogin, onClose, onRegister }) {
  const [formData, setFormData] = useState({
    profileFor: 'self',
    name: '',
    email: '',
    password: '',
    mobile: '',
    gender: '',
    dateOfBirth: '',
    religion: '',
    caste: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showIDVerification, setShowIDVerification] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.mobile || !formData.gender) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      
      if (response.data.success) {
        // Store token
        localStorage.setItem('token', response.data.token);
        
        setSuccess('Registration successful!');
        setRegisteredUser(response.data.user);
        
        // Show ID verification after 1 second
        setTimeout(() => {
          setShowIDVerification(true);
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleIDVerificationComplete = () => {
    setShowIDVerification(false);
    onRegister(registeredUser);
  };

  const handleSkipID = () => {
    setShowIDVerification(false);
    onRegister(registeredUser);
  };

  if (showIDVerification) {
    return (
      <IDVerification 
        onVerificationComplete={handleIDVerificationComplete}
        onSkip={handleSkipID}
      />
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: '550px' }}>
        <div className="auth-header">
          <h2>Create Your Profile</h2>
          <p>Join thousands of happy couples</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Profile For *</label>
            <select
              name="profileFor"
              value={formData.profileFor}
              onChange={handleChange}
              required
            >
              <option value="self">Self</option>
              <option value="son">Son</option>
              <option value="daughter">Daughter</option>
              <option value="brother">Brother</option>
              <option value="sister">Sister</option>
              <option value="friend">Friend</option>
              <option value="relative">Relative</option>
            </select>
          </div>

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile *</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              placeholder="Create password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Religion</label>
              <select
                name="religion"
                value={formData.religion}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="hindu">Hindu</option>
                <option value="muslim">Muslim</option>
                <option value="christian">Christian</option>
                <option value="sikh">Sikh</option>
                <option value="buddhist">Buddhist</option>
                <option value="jain">Jain</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Caste</label>
              <input
                type="text"
                name="caste"
                placeholder="Enter caste"
                value={formData.caste}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register Free'}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="social-login">
          <button className="social-btn">
            <span className="icon">🔵</span>
            Continue with Facebook
          </button>
          <button className="social-btn">
            <span className="icon">🔴</span>
            Continue with Google
          </button>
        </div>

        <div className="auth-footer">
          Already have an account?{' '}
          <a onClick={onSwitchToLogin}>Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;

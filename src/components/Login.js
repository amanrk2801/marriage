import React, { useState } from 'react';
import './Login.css';
import { authAPI } from '../services/api';

function Login({ onSwitchToRegister, onClose, onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      
      if (response.data.success) {
        // Store token
        localStorage.setItem('token', response.data.token);
        
        setSuccess('Login successful! Redirecting...');
        
        setTimeout(() => {
          onLogin(response.data.user);
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Welcome Back!</h2>
          <p>Login to find your perfect match</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <a href="#forgot" style={{ color: '#667eea', fontSize: '0.9rem' }}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
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
          Don't have an account?{' '}
          <a onClick={onSwitchToRegister}>Register Free</a>
        </div>
      </div>
    </div>
  );
}

export default Login;

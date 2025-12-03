import React, { useState } from 'react';
import './InfoPages.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, send to backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Contact Us</h1>
        <p className="subtitle">We're here to help! Reach out to us anytime.</p>

        <div className="contact-grid">
          <div className="contact-info-section">
            <h2>Get In Touch</h2>
            
            <div className="contact-card">
              <span className="contact-icon">📧</span>
              <h3>Email Us</h3>
              <p>support@matrimonyhub.com</p>
              <p className="small">We'll respond within 24 hours</p>
            </div>

            <div className="contact-card">
              <span className="contact-icon">📞</span>
              <h3>Call Us</h3>
              <p>+91 1800-123-4567</p>
              <p className="small">Mon-Sat: 9AM - 6PM IST</p>
            </div>

            <div className="contact-card">
              <span className="contact-icon">📍</span>
              <h3>Visit Us</h3>
              <p>MatrimonyHub Office</p>
              <p>Mumbai, Maharashtra 400001</p>
              <p>India</p>
            </div>

            <div className="contact-card">
              <span className="contact-icon">💬</span>
              <h3>Live Chat</h3>
              <p>Available on website</p>
              <p className="small">Mon-Sat: 9AM - 6PM IST</p>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            
            {submitted ? (
              <div className="success-message">
                <span className="success-icon">✅</span>
                <h3>Message Sent!</h3>
                <p>Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="payment">Payment Issue</option>
                    <option value="profile">Profile Related</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

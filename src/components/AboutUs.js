import React from 'react';
import './InfoPages.css';

function AboutUs() {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>About MatrimonyHub</h1>
        
        <section className="info-section">
          <h2>🎯 Our Mission</h2>
          <p>
            MatrimonyHub is India's most trusted matrimonial service dedicated to helping people find their perfect life partner. 
            We believe that everyone deserves to find true love and companionship, and we're here to make that journey easier, 
            safer, and more meaningful.
          </p>
        </section>

        <section className="info-section">
          <h2>💡 Our Story</h2>
          <p>
            Founded in 2024, MatrimonyHub was born from a simple idea: to create a platform where genuine people can connect 
            with compatible matches in a secure and respectful environment. We understand the importance of finding the right 
            life partner, and we've built our platform with care, keeping Indian values and traditions at heart.
          </p>
        </section>

        <section className="info-section">
          <h2>✨ What Makes Us Different</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🔒</span>
              <h3>Verified Profiles</h3>
              <p>All profiles are manually verified to ensure authenticity and safety</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🎯</span>
              <h3>Smart Matching</h3>
              <p>Advanced algorithm to find compatible matches based on preferences</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔐</span>
              <h3>Privacy First</h3>
              <p>Your data is secure and shared only with your consent</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💬</span>
              <h3>Easy Communication</h3>
              <p>Connect with matches through our secure messaging system</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>📊 Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>10,000+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-card">
              <h3>500+</h3>
              <p>Success Stories</p>
            </div>
            <div className="stat-card">
              <h3>50+</h3>
              <p>Cities Covered</p>
            </div>
            <div className="stat-card">
              <h3>98%</h3>
              <p>Satisfaction Rate</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>🤝 Our Values</h2>
          <ul className="values-list">
            <li><strong>Trust:</strong> We build trust through transparency and genuine connections</li>
            <li><strong>Respect:</strong> We respect Indian traditions, values, and family importance</li>
            <li><strong>Safety:</strong> We prioritize user safety and data security above all</li>
            <li><strong>Quality:</strong> We focus on quality matches over quantity</li>
            <li><strong>Support:</strong> We provide dedicated support throughout your journey</li>
          </ul>
        </section>

        <section className="info-section cta-section">
          <h2>Ready to Find Your Perfect Match?</h2>
          <p>Join thousands of happy couples who found their life partner through MatrimonyHub</p>
          <button className="cta-button">Register Free Today</button>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;

import React from 'react';
import './InfoPages.css';

function HelpSupport() {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Help & Support</h1>
        <p className="subtitle">We're here to assist you every step of the way</p>

        <div className="help-grid">
          <div className="help-card">
            <span className="help-icon">📚</span>
            <h3>Getting Started</h3>
            <ul>
              <li>How to create your profile</li>
              <li>Completing your profile</li>
              <li>Uploading photos</li>
              <li>Setting partner preferences</li>
            </ul>
          </div>

          <div className="help-card">
            <span className="help-icon">🔍</span>
            <h3>Finding Matches</h3>
            <ul>
              <li>Using search filters</li>
              <li>Viewing profiles</li>
              <li>Understanding match scores</li>
              <li>Shortlisting profiles</li>
            </ul>
          </div>

          <div className="help-card">
            <span className="help-icon">💝</span>
            <h3>Sending Interests</h3>
            <ul>
              <li>How to send interest</li>
              <li>Accepting/rejecting interests</li>
              <li>Viewing sent interests</li>
              <li>Managing received interests</li>
            </ul>
          </div>

          <div className="help-card">
            <span className="help-icon">💬</span>
            <h3>Messaging</h3>
            <ul>
              <li>Starting conversations</li>
              <li>Message etiquette</li>
              <li>Blocking users</li>
              <li>Reporting issues</li>
            </ul>
          </div>

          <div className="help-card">
            <span className="help-icon">💳</span>
            <h3>Payment & Billing</h3>
            <ul>
              <li>Publishing your profile</li>
              <li>Payment methods</li>
              <li>Transaction history</li>
              <li>Refund policy</li>
            </ul>
          </div>

          <div className="help-card">
            <span className="help-icon">🔒</span>
            <h3>Privacy & Safety</h3>
            <ul>
              <li>Profile visibility settings</li>
              <li>Blocking users</li>
              <li>Reporting fake profiles</li>
              <li>Safety tips</li>
            </ul>
          </div>
        </div>

        <section className="info-section">
          <h2>Contact Support</h2>
          <div className="support-options">
            <div className="support-option">
              <span className="support-icon">📧</span>
              <h3>Email Support</h3>
              <p>support@matrimonyhub.com</p>
              <p className="small">Response within 24 hours</p>
            </div>

            <div className="support-option">
              <span className="support-icon">📞</span>
              <h3>Phone Support</h3>
              <p>+91 1800-123-4567</p>
              <p className="small">Mon-Sat: 9AM - 6PM IST</p>
            </div>

            <div className="support-option">
              <span className="support-icon">💬</span>
              <h3>Live Chat</h3>
              <p>Available on website</p>
              <p className="small">Instant responses</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>Safety Tips</h2>
          <div className="safety-tips">
            <div className="tip">
              <span>🔒</span>
              <p>Never share personal contact information in initial messages</p>
            </div>
            <div className="tip">
              <span>⚠️</span>
              <p>Be cautious of users asking for money or financial help</p>
            </div>
            <div className="tip">
              <span>👥</span>
              <p>Meet in public places for first meetings</p>
            </div>
            <div className="tip">
              <span>🚫</span>
              <p>Report suspicious profiles immediately</p>
            </div>
            <div className="tip">
              <span>✅</span>
              <p>Verify information before making any commitments</p>
            </div>
            <div className="tip">
              <span>👨‍👩‍👧</span>
              <p>Involve family members in important decisions</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HelpSupport;

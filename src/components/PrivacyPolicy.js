import React from 'react';
import './InfoPages.css';

function PrivacyPolicy() {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: December 3, 2024</p>

        <section className="info-section">
          <h2>1. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email, phone number, date of birth, gender</li>
            <li><strong>Profile Information:</strong> Photos, education, profession, family details, partner preferences</li>
            <li><strong>Usage Data:</strong> How you interact with our platform, search history, profile views</li>
            <li><strong>Payment Information:</strong> Transaction details (processed securely through Razorpay)</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Create and manage your profile</li>
            <li>Match you with compatible profiles</li>
            <li>Facilitate communication between members</li>
            <li>Process payments and subscriptions</li>
            <li>Send notifications about interests and messages</li>
            <li>Improve our services and user experience</li>
            <li>Prevent fraud and ensure platform security</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>3. Information Sharing</h2>
          <p>We do NOT sell your personal information. We may share your information:</p>
          <ul>
            <li><strong>With Other Users:</strong> Your profile is visible to other registered users</li>
            <li><strong>With Service Providers:</strong> Payment processors, hosting services (with strict confidentiality)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>4. Data Security</h2>
          <p>We implement industry-standard security measures:</p>
          <ul>
            <li>SSL/TLS encryption for data transmission</li>
            <li>Secure password hashing (bcrypt)</li>
            <li>Regular security audits and updates</li>
            <li>Restricted access to personal data</li>
            <li>Secure payment processing through Razorpay</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Update or correct your information</li>
            <li>Delete your account and data</li>
            <li>Control profile visibility</li>
            <li>Opt-out of marketing communications</li>
            <li>Request data portability</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>6. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, remember your preferences, 
            and analyze platform usage. You can control cookie settings through your browser.
          </p>
        </section>

        <section className="info-section">
          <h2>7. Data Retention</h2>
          <p>
            We retain your data as long as your account is active. After account deletion, we may retain 
            certain information for legal compliance, fraud prevention, and dispute resolution.
          </p>
        </section>

        <section className="info-section">
          <h2>8. Children's Privacy</h2>
          <p>
            Our service is intended for users 18 years and older. We do not knowingly collect information 
            from individuals under 18.
          </p>
        </section>

        <section className="info-section">
          <h2>9. Changes to Privacy Policy</h2>
          <p>
            We may update this policy periodically. We'll notify you of significant changes via email or 
            platform notification.
          </p>
        </section>

        <section className="info-section">
          <h2>10. Contact Us</h2>
          <p>For privacy-related questions or concerns:</p>
          <ul className="contact-list">
            <li>📧 Email: privacy@matrimonyhub.com</li>
            <li>📞 Phone: +91 1800-123-4567</li>
            <li>📍 Address: Mumbai, Maharashtra, India</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;

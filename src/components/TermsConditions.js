import React from 'react';
import './InfoPages.css';

function TermsConditions() {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Terms & Conditions</h1>
        <p className="last-updated">Last Updated: December 3, 2024</p>

        <section className="info-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using MatrimonyHub, you accept and agree to be bound by these Terms and Conditions. 
            If you do not agree, please do not use our services.
          </p>
        </section>

        <section className="info-section">
          <h2>2. Eligibility</h2>
          <ul>
            <li>You must be at least 18 years old (21 for males, 18 for females as per Indian law)</li>
            <li>You must be legally eligible to marry</li>
            <li>You must provide accurate and truthful information</li>
            <li>One person can have only one active account</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>3. Account Registration</h2>
          <ul>
            <li>You are responsible for maintaining account confidentiality</li>
            <li>You must not share your login credentials</li>
            <li>You must notify us immediately of any unauthorized access</li>
            <li>We reserve the right to suspend or terminate accounts that violate our terms</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>4. Profile Guidelines</h2>
          <p>Your profile must:</p>
          <ul>
            <li>Contain accurate and truthful information</li>
            <li>Use your own photos (not celebrities or models)</li>
            <li>Not contain offensive, inappropriate, or misleading content</li>
            <li>Respect cultural and social norms</li>
            <li>Not promote any business or commercial activity</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>5. Prohibited Activities</h2>
          <p>You must NOT:</p>
          <ul>
            <li>Harass, abuse, or harm other users</li>
            <li>Create fake or fraudulent profiles</li>
            <li>Solicit money or financial information</li>
            <li>Share contact information publicly</li>
            <li>Use automated systems or bots</li>
            <li>Copy or scrape data from the platform</li>
            <li>Engage in any illegal activities</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>6. Payment Terms</h2>
          <ul>
            <li>Profile publishing fee: ₹499 (one-time)</li>
            <li>All payments are processed securely through Razorpay</li>
            <li>Fees are non-refundable except as required by law</li>
            <li>We reserve the right to change pricing with notice</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>7. Communication Guidelines</h2>
          <ul>
            <li>Be respectful and courteous in all communications</li>
            <li>Do not share personal contact information in initial messages</li>
            <li>Report any suspicious or inappropriate behavior</li>
            <li>We may monitor communications to ensure compliance</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>8. Intellectual Property</h2>
          <p>
            All content, trademarks, and intellectual property on MatrimonyHub are owned by us. 
            You may not copy, reproduce, or distribute any content without permission.
          </p>
        </section>

        <section className="info-section">
          <h2>9. Disclaimer</h2>
          <ul>
            <li>We do not guarantee that you will find a match</li>
            <li>We are not responsible for the accuracy of user-provided information</li>
            <li>We do not conduct background checks on users</li>
            <li>Users are responsible for their own safety and decisions</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>10. Limitation of Liability</h2>
          <p>
            MatrimonyHub is not liable for any damages arising from use of our services, including but not 
            limited to direct, indirect, incidental, or consequential damages.
          </p>
        </section>

        <section className="info-section">
          <h2>11. Termination</h2>
          <p>We reserve the right to:</p>
          <ul>
            <li>Suspend or terminate accounts that violate these terms</li>
            <li>Remove profiles or content at our discretion</li>
            <li>Refuse service to anyone for any reason</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>12. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes will be subject to the exclusive 
            jurisdiction of courts in Mumbai, Maharashtra.
          </p>
        </section>

        <section className="info-section">
          <h2>13. Contact</h2>
          <p>For questions about these terms:</p>
          <ul className="contact-list">
            <li>📧 Email: legal@matrimonyhub.com</li>
            <li>📞 Phone: +91 1800-123-4567</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default TermsConditions;

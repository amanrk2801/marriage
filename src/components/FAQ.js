import React, { useState } from 'react';
import './InfoPages.css';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I register on MatrimonyHub?",
      answer: "Click on 'Register Free' button, fill in your basic details, verify your email, and complete your profile. It's quick and easy!"
    },
    {
      question: "Is registration free?",
      answer: "Yes, registration is completely free. However, to publish your profile and make it visible to others, there's a one-time fee of ₹499."
    },
    {
      question: "How does the payment work?",
      answer: "We use Razorpay, a secure payment gateway. You can pay using Credit/Debit Card, UPI, Net Banking, or Wallets. Your payment information is completely secure."
    },
    {
      question: "Can I message anyone?",
      answer: "You can only message users after there's a mutual interest acceptance. This ensures meaningful connections and prevents spam."
    },
    {
      question: "How do I send an interest?",
      answer: "View any profile and click 'Send Interest'. The user will be notified and can accept or reject your interest."
    },
    {
      question: "What happens after interest is accepted?",
      answer: "Once your interest is accepted (or you accept someone's interest), you can start messaging each other through our secure chat system."
    },
    {
      question: "Is my data safe?",
      answer: "Yes! We use industry-standard encryption, secure servers, and follow strict privacy policies. Your data is never sold to third parties."
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account anytime from Profile Settings. All your data will be permanently removed."
    },
    {
      question: "How do I upload photos?",
      answer: "Go to Profile Settings, click on 'Upload Photo', select an image (max 5MB, JPG/PNG), and upload. Your photo will be visible after upload."
    },
    {
      question: "What if I face technical issues?",
      answer: "Contact our support team at support@matrimonyhub.com or call +91 1800-123-4567. We're available Mon-Sat, 9AM-6PM."
    },
    {
      question: "Can I get a refund?",
      answer: "Refunds are processed as per our refund policy. Contact support within 7 days if you're not satisfied with our service."
    },
    {
      question: "How do I report fake profiles?",
      answer: "Click on the profile, find the 'Report' button, select the reason, and submit. We take immediate action on reported profiles."
    }
  ];

  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Frequently Asked Questions</h1>
        <p className="subtitle">Find answers to common questions about MatrimonyHub</p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <div 
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3>{faq.question}</h3>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <h2>Still have questions?</h2>
          <p>Our support team is here to help!</p>
          <button className="cta-button">Contact Support</button>
        </div>
      </div>
    </div>
  );
}

export default FAQ;

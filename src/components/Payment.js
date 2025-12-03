import React, { useState, useEffect } from 'react';
import { paymentAPI } from '../services/api';
import './Payment.css';

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function Payment({ isLoggedIn, currentUser, onPaymentSuccess }) {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      checkPaymentStatus();
      loadRazorpayScript();
    }
  }, [isLoggedIn]);

  const checkPaymentStatus = async () => {
    try {
      const response = await paymentAPI.getStatus();
      if (response.data.success) {
        setPaymentStatus(response.data);
      }
    } catch (err) {
      console.error('Failed to check payment status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    setError('');

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        setError('Failed to load payment gateway. Please try again.');
        setProcessing(false);
        return;
      }

      // Create order
      const orderResponse = await paymentAPI.createOrder();
      
      if (orderResponse.data.success) {
        const { order, user } = orderResponse.data;

        // Razorpay options
        const options = {
          key: order.key,
          amount: order.amount,
          currency: order.currency,
          name: 'MatrimonyHub',
          description: 'Profile Publishing Fee',
          image: '/logo192.png',
          order_id: order.orderId,
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.contact || ''
          },
          theme: {
            color: '#667eea'
          },
          handler: async function (response) {
            try {
              // Verify payment
              const verifyResponse = await paymentAPI.verifyPayment(
                response.razorpay_order_id,
                response.razorpay_payment_id,
                response.razorpay_signature
              );

              if (verifyResponse.data.success) {
                setPaymentStatus({
                  profilePublished: true,
                  isPremium: true,
                  paymentStatus: 'completed'
                });
                
                if (onPaymentSuccess) {
                  onPaymentSuccess();
                }

                alert('🎉 Payment successful! Your profile is now published and visible to all users.');
              }
            } catch (err) {
              console.error('Payment verification error:', err);
              setError(err.response?.data?.message || 'Payment verification failed');
            } finally {
              setProcessing(false);
            }
          },
          modal: {
            ondismiss: function() {
              setProcessing(false);
              setError('Payment cancelled');
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.message || 'Failed to process payment');
      setProcessing(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="empty-state">
            <div className="empty-icon">🔒</div>
            <h2>Login Required</h2>
            <p>Please login to publish your profile</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus?.profilePublished) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="success-state">
            <div className="success-icon">✅</div>
            <h2>Profile Already Published!</h2>
            <p>Your profile is live and visible to all users.</p>
            <div className="payment-details">
              <h3>Payment Details</h3>
              <div className="detail-item">
                <span>Status:</span>
                <span className="status-badge success">Completed</span>
              </div>
              {paymentStatus.paymentDetails && (
                <>
                  <div className="detail-item">
                    <span>Amount Paid:</span>
                    <span>₹{paymentStatus.paymentDetails.amount}</span>
                  </div>
                  <div className="detail-item">
                    <span>Order ID:</span>
                    <span>{paymentStatus.paymentDetails.orderId}</span>
                  </div>
                  <div className="detail-item">
                    <span>Payment ID:</span>
                    <span>{paymentStatus.paymentDetails.paymentId}</span>
                  </div>
                  <div className="detail-item">
                    <span>Date:</span>
                    <span>{new Date(paymentStatus.paymentDetails.paidAt).toLocaleDateString()}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <h2>Publish Your Profile</h2>
          <p>Make your profile visible to thousands of potential matches</p>
        </div>

        <div className="pricing-card">
          <div className="price-tag">
            <span className="currency">₹</span>
            <span className="amount">499</span>
            <span className="period">one-time</span>
          </div>
          
          <div className="features-list">
            <h3>What You Get:</h3>
            <ul>
              <li>✓ Profile visible to all users</li>
              <li>✓ Unlimited profile views</li>
              <li>✓ Send unlimited interests</li>
              <li>✓ Chat with matched profiles</li>
              <li>✓ See who viewed your profile</li>
              <li>✓ Priority in search results</li>
              <li>✓ Verified badge on profile</li>
              <li>✓ Lifetime access</li>
            </ul>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="payment-methods">
            <h3>Secure Payment Gateway:</h3>
            
            <button
              className="payment-btn razorpay-payment"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? (
                <>
                  <span className="spinner-small"></span>
                  Opening Payment Gateway...
                </>
              ) : (
                <>
                  <span className="payment-icon">💳</span>
                  Pay ₹499 Now
                  <span className="payment-methods-text">Card | UPI | Net Banking | Wallet</span>
                </>
              )}
            </button>
          </div>

          <div className="payment-note">
            <p>🔒 Secure payment powered by industry-standard encryption</p>
            <p>💯 100% money-back guarantee if not satisfied</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

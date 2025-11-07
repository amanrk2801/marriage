import React, { useState, useEffect } from 'react';
import { notificationAPI, interestAPI } from '../services/api';
import { getImageUrl } from '../services/api';
import './Notifications.css';

function Notifications({ isLoggedIn, currentUser, onNotificationUpdate }) {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
      // Poll for new notifications every 10 seconds
      const interval = setInterval(fetchNotifications, 10000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getNotifications();
      if (response.data.success) {
        setNotifications(response.data.notifications);
        if (onNotificationUpdate) {
          onNotificationUpdate();
        }
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, read: true } : n
      ));
      if (onNotificationUpdate) {
        onNotificationUpdate();
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      if (onNotificationUpdate) {
        onNotificationUpdate();
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await notificationAPI.deleteNotification(id);
      setNotifications(notifications.filter(n => n._id !== id));
      if (onNotificationUpdate) {
        onNotificationUpdate();
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const handleAcceptInterest = async (notificationId, interestId) => {
    setActionLoading({ ...actionLoading, [notificationId]: 'accepting' });
    try {
      await interestAPI.acceptInterest(interestId);
      // Delete the notification from backend
      await notificationAPI.deleteNotification(notificationId);
      // Remove notification from local state
      setNotifications(notifications.filter(n => n._id !== notificationId));
      // Update notification count
      if (onNotificationUpdate) {
        onNotificationUpdate();
      }
    } catch (error) {
      console.error('Failed to accept interest:', error);
      alert(error.response?.data?.message || 'Failed to accept interest');
    } finally {
      setActionLoading({ ...actionLoading, [notificationId]: null });
    }
  };

  const handleRejectInterest = async (notificationId, interestId) => {
    setActionLoading({ ...actionLoading, [notificationId]: 'rejecting' });
    try {
      await interestAPI.rejectInterest(interestId);
      // Delete the notification from backend
      await notificationAPI.deleteNotification(notificationId);
      // Remove notification from local state
      setNotifications(notifications.filter(n => n._id !== notificationId));
      // Update notification count
      if (onNotificationUpdate) {
        onNotificationUpdate();
      }
    } catch (error) {
      console.error('Failed to reject interest:', error);
      alert(error.response?.data?.message || 'Failed to reject interest');
    } finally {
      setActionLoading({ ...actionLoading, [notificationId]: null });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="notifications-page">
        <div className="notifications-container">
          <div className="empty-notifications">
            <div className="empty-icon">🔔</div>
            <h2>Login to View Notifications</h2>
            <p>Please login to see your notifications and updates</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="notifications-page">
        <div className="notifications-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading notifications...</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'interest') return n.type.includes('interest');
    if (filter === 'messages') return n.type === 'new_message';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'interest_accepted': return '✅';
      case 'interest_received': return '💝';
      case 'new_message': return '💬';
      case 'profile_viewed': return '👁️';
      default: return '🔔';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now - notifDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return notifDate.toLocaleDateString();
  };

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        <div className="notifications-header">
          <div>
            <h2>Notifications</h2>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount} unread</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button className="mark-all-btn" onClick={markAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>

        <div className="notifications-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button 
            className={`filter-btn ${filter === 'interest' ? 'active' : ''}`}
            onClick={() => setFilter('interest')}
          >
            Interests
          </button>
          <button 
            className={`filter-btn ${filter === 'messages' ? 'active' : ''}`}
            onClick={() => setFilter('messages')}
          >
            Messages
          </button>
        </div>

        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-notifications">
              <div className="empty-icon">📭</div>
              <h3>No notifications</h3>
              <p>You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div 
                key={notification._id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => !notification.read && markAsRead(notification._id)}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-avatar">
                  {notification.from?.profileImage ? (
                    <img src={getImageUrl(notification.from.profileImage)} alt={notification.from.name} />
                  ) : (
                    <span>{notification.from?.gender === 'male' ? '👨' : '👩'}</span>
                  )}
                </div>
                <div className="notification-content">
                  <div className="notification-text">
                    <strong>{notification.from?.name}</strong> {notification.message}
                  </div>
                  <div className="notification-meta">
                    {notification.from?.age} years • {notification.from?.location} • {formatTime(notification.createdAt)}
                  </div>
                  
                  {/* Action buttons for interest requests */}
                  {notification.type === 'interest_received' && notification.relatedInterest && (
                    <div className="notification-actions-buttons">
                      <button 
                        className="accept-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptInterest(notification._id, notification.relatedInterest);
                        }}
                        disabled={actionLoading[notification._id]}
                      >
                        {actionLoading[notification._id] === 'accepting' ? '⏳' : '✓'} Accept
                      </button>
                      <button 
                        className="reject-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectInterest(notification._id, notification.relatedInterest);
                        }}
                        disabled={actionLoading[notification._id]}
                      >
                        {actionLoading[notification._id] === 'rejecting' ? '⏳' : '✕'} Reject
                      </button>
                    </div>
                  )}
                </div>
                <div className="notification-actions">
                  {!notification.read && <span className="unread-dot"></span>}
                  <button 
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification._id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;

import React, { useState, useEffect, useRef } from 'react';
import { messageAPI, profileAPI } from '../services/api';
import { getImageUrl } from '../services/api';
import './Messages.css';

function Messages({ isLoggedIn, currentUser }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesListRef = useRef(null);
  const previousMessageCountRef = useRef(0);
  const shouldScrollRef = useRef(true);

  // Fetch conversations on mount
  useEffect(() => {
    if (isLoggedIn) {
      fetchConversations();
      // Poll for new conversations every 10 seconds
      const interval = setInterval(fetchConversations, 10000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  // Fetch messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      previousMessageCountRef.current = 0;
      fetchMessages(selectedConversation.userId);
      // Scroll to bottom after a short delay to let messages load
      setTimeout(() => {
        shouldScrollRef.current = true;
        scrollToBottom();
      }, 100);
      
      // Poll for new messages every 5 seconds when in a conversation
      const interval = setInterval(() => {
        fetchMessages(selectedConversation.userId);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedConversation]);

  // Auto-scroll to bottom only when new messages arrive
  useEffect(() => {
    // Only scroll if we should (new message added) and user is near bottom
    if (shouldScrollRef.current && messages.length > previousMessageCountRef.current && previousMessageCountRef.current > 0) {
      scrollToBottom();
    }
    previousMessageCountRef.current = messages.length;
  }, [messages]);

  // Check if user is at bottom of scroll
  const handleScroll = () => {
    if (messagesListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesListRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      shouldScrollRef.current = isAtBottom;
    }
  };

  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end'
      });
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await messageAPI.getConversations();
      if (response.data.success) {
        setConversations(response.data.conversations);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const response = await messageAPI.getConversation(userId);
      if (response.data.success) {
        console.log('Fetched messages count:', response.data.messages.length);
        console.log('Current user ID:', currentUser?.id || currentUser?._id);
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;

    setSending(true);
    try {
      const response = await messageAPI.sendMessage(
        selectedConversation.userId,
        newMessage.trim()
      );

      if (response.data.success) {
        // Add message to list
        shouldScrollRef.current = true; // Always scroll when sending a message
        setMessages([...messages, response.data.data]);
        setNewMessage('');
        
        // Update conversation list
        fetchConversations();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMsg = error.response?.data?.message || 'Failed to send message';
      
      if (error.response?.status === 403) {
        alert('⚠️ ' + errorMsg + '\n\nPlease accept their interest or wait for them to accept yours.');
      } else {
        alert(errorMsg);
      }
    } finally {
      setSending(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="messages-page">
        <div className="messages-container">
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h2>Login Required</h2>
            <p>Please login to view and send messages</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="messages-page">
        <div className="messages-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading messages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-page">
      <div className="messages-container">
        <div className="messages-layout">
          {/* Conversations List */}
          <div className="conversations-sidebar">
            <div className="sidebar-header">
              <h2>Messages</h2>
              <span className="conversation-count">{conversations.length}</span>
            </div>
            
            <div className="conversations-list">
              {conversations.length === 0 ? (
                <div className="no-conversations">
                  <p>No conversations yet</p>
                  <p className="hint">Send a message to start chatting!</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.userId}
                    className={`conversation-item ${selectedConversation?.userId === conv.userId ? 'active' : ''}`}
                    onClick={() => setSelectedConversation(conv)}
                  >
                    <div className="conversation-avatar">
                      {conv.profileImage ? (
                        <img src={getImageUrl(conv.profileImage)} alt={conv.name} />
                      ) : (
                        <span className="avatar-emoji">{conv.gender === 'male' ? '👨' : '👩'}</span>
                      )}
                    </div>
                    <div className="conversation-info">
                      <h4>{conv.name}</h4>
                      <p className="last-message">{conv.lastMessage}</p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <span className="unread-badge">{conv.unreadCount}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="chat-area">
            {selectedConversation ? (
              <>
                <div className="chat-header">
                  <div className="chat-user-info">
                    <div className="chat-avatar">
                      {selectedConversation.profileImage ? (
                        <img src={getImageUrl(selectedConversation.profileImage)} alt={selectedConversation.name} />
                      ) : (
                        <span className="avatar-emoji">{selectedConversation.gender === 'male' ? '👨' : '👩'}</span>
                      )}
                    </div>
                    <div>
                      <h3>{selectedConversation.name}</h3>
                      <p>{selectedConversation.age} years • {selectedConversation.location}</p>
                    </div>
                  </div>
                </div>

                <div className="messages-list" ref={messagesListRef} onScroll={handleScroll}>
                  {messages.map((msg, index) => {
                    // Handle both populated and non-populated 'from' field
                    const fromId = typeof msg.from === 'object' ? String(msg.from._id) : String(msg.from);
                    const currentUserId = String(currentUser?.id || currentUser?._id || '');
                    const isSent = fromId === currentUserId;
                    
                    return (
                      <div
                        key={msg._id || index}
                        className={`message ${isSent ? 'sent' : 'received'}`}
                      >
                        <div className="message-bubble">
                          <p>{msg.content}</p>
                          <span className="message-time">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                <form className="message-input-form" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={sending}
                    maxLength={500}
                  />
                  <button type="submit" disabled={sending || !newMessage.trim()}>
                    {sending ? '⏳' : '📤'}
                  </button>
                </form>
              </>
            ) : (
              <div className="no-chat-selected">
                <div className="empty-icon">💬</div>
                <h3>Select a conversation</h3>
                <p>Choose a conversation from the left to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;

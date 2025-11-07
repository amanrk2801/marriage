import React from 'react';
import './EventDetails.css';

function EventDetails() {
  return (
    <section className="event-details">
      <h2 className="section-title">Event Details</h2>
      <div className="events-container">
        <div className="event-card">
          <div className="event-icon">💒</div>
          <h3>Ceremony</h3>
          <p className="event-time">4:00 PM</p>
          <p className="event-location">St. Mary's Church</p>
          <p className="event-address">123 Church Street, New York, NY</p>
        </div>
        
        <div className="event-card">
          <div className="event-icon">🎉</div>
          <h3>Reception</h3>
          <p className="event-time">6:00 PM</p>
          <p className="event-location">The Grand Ballroom</p>
          <p className="event-address">456 Celebration Ave, New York, NY</p>
        </div>
        
        <div className="event-card">
          <div className="event-icon">🍽️</div>
          <h3>Dinner</h3>
          <p className="event-time">7:30 PM</p>
          <p className="event-location">The Grand Ballroom</p>
          <p className="event-address">Followed by dancing and celebration</p>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;

import React from 'react';
import './SuccessStories.css';

const stories = [
  {
    id: 1,
    couple: 'Rahul & Priya',
    image: '💑',
    location: 'Mumbai',
    date: 'Married in Dec 2024',
    story: 'We found each other on MatrimonyHub and instantly connected. Our families met, and within 6 months, we were married. Thank you for bringing us together!',
    rating: 5
  },
  {
    id: 2,
    couple: 'Amit & Sneha',
    image: '👫',
    location: 'Bangalore',
    date: 'Married in Oct 2024',
    story: 'After searching for months, we finally found our perfect match here. The platform made it so easy to connect with like-minded people.',
    rating: 5
  },
  {
    id: 3,
    couple: 'Vikram & Anjali',
    image: '💏',
    location: 'Delhi',
    date: 'Married in Nov 2024',
    story: 'We are grateful to MatrimonyHub for helping us find each other. Our journey from strangers to life partners has been beautiful.',
    rating: 5
  }
];

function SuccessStories() {
  return (
    <div className="success-stories-page">
      <div className="success-container">
        <div className="success-header">
          <h1>💝 Success Stories</h1>
          <p>Real couples who found their perfect match on MatrimonyHub</p>
        </div>

        <div className="stories-grid">
          {stories.map(story => (
            <div key={story.id} className="story-card">
              <div className="story-image">
                <span className="couple-emoji">{story.image}</span>
              </div>
              <div className="story-content">
                <h3>{story.couple}</h3>
                <div className="story-meta">
                  <span>📍 {story.location}</span>
                  <span>💒 {story.date}</span>
                </div>
                <p className="story-text">{story.story}</p>
                <div className="story-rating">
                  {'⭐'.repeat(story.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <h2>Ready to Write Your Own Success Story?</h2>
          <p>Join thousands of happy couples who found their perfect match</p>
          <button className="cta-button">Register Free Now</button>
        </div>
      </div>
    </div>
  );
}

export default SuccessStories;

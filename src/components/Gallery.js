import React from 'react';
import './Gallery.css';

function Gallery() {
  const photos = [
    { id: 1, color: '#ff6b6b', label: 'First Date' },
    { id: 2, color: '#4ecdc4', label: 'Proposal' },
    { id: 3, color: '#45b7d1', label: 'Vacation' },
    { id: 4, color: '#f9ca24', label: 'Together' },
    { id: 5, color: '#6c5ce7', label: 'Adventure' },
    { id: 6, color: '#fd79a8', label: 'Love' }
  ];

  return (
    <section className="gallery">
      <h2 className="section-title">Our Story</h2>
      <div className="gallery-grid">
        {photos.map(photo => (
          <div key={photo.id} className="gallery-item" style={{ background: photo.color }}>
            <div className="gallery-overlay">
              <span className="gallery-label">{photo.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;

import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">We're Getting Married!</h1>
        <div className="hero-names">
          <span className="name">John</span>
          <span className="ampersand">&</span>
          <span className="name">Sarah</span>
        </div>
        <p className="hero-date">December 15, 2025</p>
        <p className="hero-location">The Grand Ballroom, New York</p>
      </div>
    </div>
  );
}

export default Hero;

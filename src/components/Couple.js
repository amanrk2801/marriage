import React from 'react';
import './Couple.css';

function Couple() {
  return (
    <section className="couple">
      <h2 className="section-title">The Happy Couple</h2>
      <div className="couple-container">
        <div className="person">
          <div className="person-image groom">
            <div className="placeholder-image">J</div>
          </div>
          <h3 className="person-name">John Smith</h3>
          <p className="person-title">The Groom</p>
          <p className="person-bio">
            A software engineer with a passion for adventure and a heart full of love.
            Can't wait to start this new chapter together!
          </p>
        </div>
        
        <div className="person">
          <div className="person-image bride">
            <div className="placeholder-image">S</div>
          </div>
          <h3 className="person-name">Sarah Johnson</h3>
          <p className="person-title">The Bride</p>
          <p className="person-bio">
            An artist and dreamer who believes in fairy tales and happily ever afters.
            Excited to marry my best friend!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Couple;

import React from 'react';
import './SearchBar.css';

function SearchBar({ filters, setFilters }) {
  return (
    <div className="search-bar">
      <div className="search-container">
        <h2>Find Your Perfect Match</h2>
        <div className="filters">
          <select 
            value={filters.gender}
            onChange={(e) => setFilters({...filters, gender: e.target.value})}
          >
            <option value="all">All</option>
            <option value="bride">Bride</option>
            <option value="groom">Groom</option>
          </select>

          <input 
            type="number" 
            placeholder="Min Age"
            value={filters.ageRange[0]}
            onChange={(e) => setFilters({...filters, ageRange: [+e.target.value, filters.ageRange[1]]})}
          />

          <input 
            type="number" 
            placeholder="Max Age"
            value={filters.ageRange[1]}
            onChange={(e) => setFilters({...filters, ageRange: [filters.ageRange[0], +e.target.value]})}
          />

          <select
            value={filters.religion}
            onChange={(e) => setFilters({...filters, religion: e.target.value})}
          >
            <option value="all">All Religions</option>
            <option value="hindu">Hindu</option>
            <option value="muslim">Muslim</option>
            <option value="christian">Christian</option>
            <option value="sikh">Sikh</option>
          </select>

          <select
            value={filters.caste}
            onChange={(e) => setFilters({...filters, caste: e.target.value})}
          >
            <option value="all">All Castes</option>
            <option value="brahmin">Brahmin</option>
            <option value="rajput">Rajput</option>
            <option value="maratha">Maratha</option>
            <option value="patel">Patel (Patidar)</option>
            <option value="jat">Jat</option>
            <option value="yadav">Yadav</option>
            <option value="kayastha">Kayastha</option>
            <option value="bania">Bania</option>
            <option value="agarwal">Agarwal</option>
            <option value="khatri">Khatri</option>
            <option value="vaishya">Vaishya</option>
            <option value="kshatriya">Kshatriya</option>
            <option value="kurmi">Kurmi</option>
            <option value="gupta">Gupta</option>
            <option value="arora">Arora</option>
            <option value="saini">Saini</option>
            <option value="gujjar">Gujjar</option>
            <option value="lohar">Lohar</option>
            <option value="kumhar">Kumhar</option>
            <option value="mali">Mali</option>
            <option value="sonar">Sonar</option>
            <option value="vishwakarma">Vishwakarma</option>
            <option value="nadar">Nadar</option>
            <option value="ezhava">Ezhava</option>
            <option value="reddy">Reddy</option>
            <option value="kamma">Kamma</option>
            <option value="naidu">Naidu</option>
            <option value="vokkaliga">Vokkaliga</option>
            <option value="lingayat">Lingayat</option>
            <option value="iyer">Iyer</option>
            <option value="iyengar">Iyengar</option>
          </select>

          <input 
            type="text" 
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          />

          <button className="search-btn">Search</button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

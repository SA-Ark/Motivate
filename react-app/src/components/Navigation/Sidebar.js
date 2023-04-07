import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import searchIcon from '../../Images/search.png'

function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {

  };

  return (
    <nav>
        <ul className="nav-menu">
        <li className="nav-menu-links"><Link to="/">Home</Link></li>
        <li className="nav-menu-links"><Link to="/allgoals">Goals</Link></li>
        <li className="nav-menu-links"><Link to="/badges">Badges</Link></li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />

            <img className="search-button image" onClick={handleSearchClick}
            src={searchIcon} alt="Search" />
      </div>

    </nav>
  );
}

export default Sidebar;

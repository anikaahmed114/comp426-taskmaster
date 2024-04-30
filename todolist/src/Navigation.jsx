import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="nav-container">
      <ul className="nav-links">
        <li>
          <Link to="/home" className="nav-logo">Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin" className="nav-logo">Sign In</Link>
            </li>
            <li>
              <Link to="/signup" className="nav-logo">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

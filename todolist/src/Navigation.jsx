import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { MdLogout } from "react-icons/md";


const Navigation = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="nav-container">
      <ul className="nav-links">
        <li>
          <Link to="/home" className="nav-logo">home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <button onClick={onLogout} className='logout' ><MdLogout /></button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin" className="nav-logo">sign in</Link>
            </li>
            <li>
              <Link to="/signup" className="nav-logo">sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

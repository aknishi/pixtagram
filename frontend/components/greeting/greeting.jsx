import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
  if (currentUser) {
    return(
      <div>
        <h2>Welcome, {currentUser.username} !</h2>
        <button onClick={logout} className="logout-button">Sign out</button>
      </div>
    )
  } else {
    return (
      <div>
        <Link to='/login' className="session-link">Login</Link>
        <br/>
        <Link to='/signup'className="session-link">Sign Up!</Link>
      </div>
    )
  }
};

export default Greeting;

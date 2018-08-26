import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

const App = () => (
  <div>
    <header>
      <nav>
        <div className= "logo-container">
          <Link to="/" className="logo-link">
            <ul>
              <li><img src={window.cameraURL} className="camera-logo" alt="camera-logo"/></li>
              <li><h2 className="logo-text">Pixtagram</h2></li>
            </ul>
          </Link>
        </div>
      </nav>
    </header>
  </div>
);

export default App;

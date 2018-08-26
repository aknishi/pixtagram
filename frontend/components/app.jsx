import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

const App = () => (
  <div>
    <header>
      <nav>
        <div className= "logo">
          <Link to="/" className="logo-text">
            <img src="../assets/camera-logo.png" className="camera-logo"/>
            <span>Pixtagram</span>
          </Link>
        </div>
      </nav>
    </header>
  </div>
);

export default App;

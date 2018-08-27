import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import GreetingContainer from './greeting/greeting_container';

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
        <div className="greeting-container">
          <GreetingContainer />
        </div>
      </nav>
    </header>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
  </div>
);

export default App;

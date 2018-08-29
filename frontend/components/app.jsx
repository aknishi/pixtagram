import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import NavBarIconsContainer from './navbar_icons/navbar_icons_container';
import MainContainer from './main_container';
import UserShowContainer from './users/user_show_container';
import UserEditFormContainer from './users/user_edit_form_container';
import PostsIndexContainer from './posts/posts_index_container';

const App = () => (
  <div>
    <header>
      <nav>
        <div className= "logo-container">
          <Link to="/posts" className="logo-link">
            <ul>
              <li><img src={window.cameraURL} className="camera-logo" alt="camera-logo"/></li>
              <li><h2 className="logo-text">Pixtagram</h2></li>
            </ul>
          </Link>
        </div>
        <div className="greeting-container">
          <NavBarIconsContainer />
        </div>
      </nav>
    </header>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/" component={MainContainer} />
      <ProtectedRoute exact path="/users/:userId" component={UserShowContainer} />
      <ProtectedRoute exact path="/users/:userId/edit" component={UserEditFormContainer} />
      <ProtectedRoute exact path="/posts/" component={PostsIndexContainer} />
  </div>
);

export default App;

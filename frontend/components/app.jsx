import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { UserProtectedRoute } from '../util/user_protected_route';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import NavBarIconsContainer from './navbar_icons/navbar_icons_container';
import MainContainer from './main_container';
import UserShowContainer from './users/user_show_container';
import UserEditFormContainer from './users/user_edit_form_container';
import PostsIndexContainer from './posts/posts_index_container';
import PostFormContainer from './posts/post_form_container';

const App = () => (
  <div>
    <header>
      <div className="navbar-container">
        <nav>
          <div className="navbar-inner-container">
            <Link to="/posts" className="logo-container-link">
              <img src={window.cameraURL} className="camera-logo" alt="camera-logo"/>
              <h2 className="logo-text">Pixtagram</h2>
            </Link>
            <div>
              <NavBarIconsContainer />
            </div>
          </div>
        </nav>
      </div>
    </header>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/" component={MainContainer} />
      <ProtectedRoute exact path="/users/:userId" component={UserShowContainer} />
      <ProtectedRoute exact path="/users/:userId/edit" component={UserEditFormContainer} />
      <ProtectedRoute exact path="/users/:userId/upload" component={PostFormContainer} />
      <ProtectedRoute exact path="/posts/" component={PostsIndexContainer} />
  </div>
);

export default App;

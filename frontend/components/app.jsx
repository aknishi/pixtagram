import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { UserProtectedRoute } from '../util/user_protected_route';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import NavBarContainer from './navbar_icons/navbar_container';
import MainContainer from './main_container';
import UserEditFormContainer from './users/user_edit_form_container';
import PostsIndexContainer from './posts/posts_index_container';
import PostFormContainer from './posts/post_form_container';
import PostShowContainer from './posts/post_show_container';
import PostGridContainer from './posts/post_grid_container';
import UserShowContainer from './users/user_show_container';
import LikedByContainer from './posts/liked_by_container';
import SavedPostsGridContainer from './posts/saved_posts_grid_container';

const App = () => (
  <div>
    <header>
      <div className="navbar-container">
        <nav>
          <Route path="/" component={NavBarContainer} />
        </nav>
      </div>
    </header>
      <Route exact path="/" component={MainContainer} />

      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/users/accounts/:userId/edit" component={UserEditFormContainer} />
      <ProtectedRoute exact path="/posts/:postId/liked_by" component={LikedByContainer} />
      <ProtectedRoute exact path="/users/posts/:postId/liked_by" component={LikedByContainer} />
      <ProtectedRoute path="/posts" component={PostsIndexContainer} />
      <ProtectedRoute path="/users/posts/:postId" component={PostShowContainer} />
      <ProtectedRoute exact path="/users/:userId" component={UserShowContainer} />
      <ProtectedRoute exact path="/users/:userId/saved" component={UserShowContainer} />
      <ProtectedRoute exact path="/users/:userId/tagged" component={UserShowContainer} />
      <ProtectedRoute exact path="/users/:userId" component={PostGridContainer} />
      <ProtectedRoute exact path="/users/:userId/saved" component={SavedPostsGridContainer} />
      <ProtectedRoute exact path="/users/:userId/upload" component={PostFormContainer} />
  </div>
);

export default App;

import React from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';

const UserProtected = ({component: Component, path, loggedIn, currentUserId, targetUserId, exact}) => (
  <Route path={path} exact={exact} render={(props) => {
    if (currentUserId) {
      if (currentUserId == targetUserId ) {
        return (<Component {...props} />)
      } else {
        return (<Redirect to={`/users/${currentUserId}/`} />)
      }
    } else {
      return (<Redirect to="/login" />)
      }
  }}/>
);

export default withRouter(UserProtected);

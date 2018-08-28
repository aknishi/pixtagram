import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

const Main = ({ currentUser }) => {
  if (currentUser) {
    return(
      <Redirect to={`/users/${currentUser.id}`}/>
    )} else {
      return(
        <Redirect to="/login"/>
      )}
};

export default Main;

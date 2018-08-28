import { combineReducers } from 'redux';

import users from './users_reducer';
import posts from './posts_reducer';
// import comments

export default combineReducers({
  users,
  posts
});

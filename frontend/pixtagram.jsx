import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { deleteFollow, updateUser } from './actions/user_actions';
import { fetchPost, deletePost } from './actions/post_actions';
import { fetchComments } from './actions/comment_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: {[window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
    } else {
      store = configureStore();
    }
  window.deleteFollow = deleteFollow;
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  window.deletePost = deletePost;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root)
});

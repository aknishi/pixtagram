import { connect } from 'react-redux';
import { selectPostLikers } from '../../reducers/selectors';
import { fetchUsers } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/post_actions';
import { fetchComments } from '../../actions/comment_actions';

import React from 'react';
import LikedBy from './liked_by';

const mapStateToProps = (state, { match }) => {
  const users = state.entities.users;
  const currentUserId = state.session.id;
  const post = state.entities.posts[match.params.postId];
  const likers = selectPostLikers(users, post);
  return({
    likers,
    currentUserId,
    post
  });

}

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchComments: () => dispatch(fetchComments()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikedBy);

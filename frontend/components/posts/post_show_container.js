import { connect } from 'react-redux';
import { selectPost, selectUser } from '../../reducers/selectors';
import {
  fetchPost,
  createLike,
  deleteLike,
  createBookmark,
  deleteBookmark,
  deletePost
  } from '../../actions/post_actions';

import {
  createComment,
  deleteComment
  } from '../../actions/comment_actions';

import values from 'lodash/values';
import React from 'react';
import PostShow from './post_show';

const mapStateToProps = (state, { match }) => {
  const postId = parseInt(match.params.postId);
  const post = selectPost(state.entities, postId);
  const comments = values(state.entities.comments);
  const users = state.entities.users;
  const currentUserId = state.session.id;
  const user = selectUser(state.entities, post.user_id)
  return({
    post,
    user,
    currentUserId,
    comments,
    users
  });
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPost: id => dispatch(fetchPost(id)),
  fetchUser: id => dispatch(fetchUser(id)),
  createLike: like => dispatch(createLike(like)),
  createBookmark: bookmark => dispatch(createBookmark(bookmark)),
  createComment: comment => dispatch(createComment(comment)),
  deleteLike: like => dispatch(deleteLike(like)),
  deleteBookmark: bookmark => dispatch(deleteBookmark(bookmark)),
  deleteComment: comment => dispatch(deleteComment(comment)),
  deletePost: post => dispatch(deletePost(post))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostShow);

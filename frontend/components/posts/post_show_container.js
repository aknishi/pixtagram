import { connect } from 'react-redux';
import { selectPost, selectUser} from '../../reducers/selectors';
import {
  fetchPost,
  createLike,
  deleteLike } from '../../actions/post_actions';
import {
  createComment,
  deleteComment } from '../../actions/comment_actions';

import React from 'react';
import PostShow from './post_show';

const mapStateToProps = (state, { match }) => {
  const postId = parseInt(match.params.postId);
  const post = selectPost(state.entities, postId);
  const currentUserId = state.session.id;
  const user = selectUser(state.entities, post.user_id)
  return({
    post,
    user,
    currentUserId
  });
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPost: id => dispatch(fetchPost(id)),
  fetchUser: id => dispatch(fetchUser(id)),
  createLike: like => dispatch(createLike(like)),
  createComment: comment => dispatch(createComment(comment)),
  deleteLike: like => dispatch(deleteLike(like)),
  deleteComment: comment => dispatch(deleteComment(comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostShow);

import { connect } from 'react-redux';
import {
  fetchPosts,
  fetchPost,
  deletePost,
  createLike,
  deleteLike } from '../../actions/post_actions';

import {
  createComment,
  deleteComment,
  fetchComments } from '../../actions/comment_actions';

import { fetchUsers } from '../../actions/user_actions';

import PostsIndex from './posts_index';
import values from 'lodash/values';

const mapStateToProps = ( state ) => {
  const posts = values(state.entities.posts);
  const comments = values(state.entities.comments);
  const users = state.entities.users;
  const currentUserId = state.session.id;
  const loading = state.ui.loading.indexLoading;
  return ({
    posts,
    users,
    currentUserId,
    loading,
    comments
  })
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchPost: id => dispatch(fetchPost(id)),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchComments: () => dispatch(fetchComments()),
  deletePost: id => dispatch(deletePost(id)),
  createLike: like => dispatch(createLike(like)),
  createComment: comment => dispatch(createComment(comment)),
  deleteLike: like => dispatch(deleteLike(like)),
  deleteComment: comment => dispatch(deleteComment(comment))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsIndex);

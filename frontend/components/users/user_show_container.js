import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser, selectPostsFromUser } from '../../reducers/selectors';
import { fetchUsers, createFollow, deleteFollow } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/post_actions';
import { logout } from '../../actions/session_actions';
import React from 'react';
import UserShow from './user_show';

const mapStateToProps = (state, { match }) => {
  const userId = parseInt(match.params.userId);
  const user = selectUser(state.entities, userId)
  const currentUserId = state.session.id;
  const allPosts = state.entities.posts;
  const userPosts = selectPostsFromUser(allPosts, userId);
  const loading = state.ui.loading.indexLoading;
  return({
    userId,
    user,
    currentUserId,
    userPosts,
    loading
  });
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchUsers: () => dispatch(fetchUsers()),
  logout: () => dispatch(logout()),
  createFollow: follow => dispatch(createFollow(follow)),
  deleteFollow: follow => dispatch(deleteFollow(follow))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);

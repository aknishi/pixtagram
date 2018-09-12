import { connect } from 'react-redux';
import { selectUser, selectPostsFromUser } from '../../reducers/selectors';
import { fetchUser } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/post_actions';
import { fetchNotifications } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import React from 'react';
import PostGrid from './post_grid';

const mapStateToProps = (state, { match }) => {
  const userId = parseInt(match.params.userId);
  const user = selectUser(state.entities, userId)
  const currentUserId = state.session.id;
  const allPosts = state.entities.posts;
  const userPosts = selectPostsFromUser(allPosts, userId);
  const savedSelected = false;
  const gridSelected = true;
  const postsCssId = "selected-link";
  const savedCssId = "not-selected";
  const postsItemBorder = "selected-item";
  const savedItemBorder = "none";
  const loading = state.ui.loading.indexLoading;
  return({
    user,
    userId,
    currentUserId,
    userPosts,
    postsCssId,
    savedCssId,
    savedSelected,
    gridSelected,
    postsItemBorder,
    savedItemBorder,
    loading
  });

}

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchUser: id => dispatch(fetchUser(id)),
  fetchNotifications: () => dispatch(fetchNotifications())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostGrid);

import { connect } from 'react-redux';
import { selectUser, selectPostsFromUser, selectSavedPostsFromUser } from '../../reducers/selectors';
import { fetchUser } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/post_actions';
import { withRouter } from 'react-router-dom';
import React from 'react';
import PostGrid from './post_grid';

const mapStateToProps = (state, { match }) => {
  const userId = parseInt(match.params.userId);
  const user = selectUser(state.entities, userId)
  const currentUserId = state.session.id;
  const allPosts = state.entities.posts;
  const userPosts = selectSavedPostsFromUser(allPosts, user);
  const savedSelected = true;
  const gridSelected = false;
  const postsCssId = "not-selected";
  const savedCssId = "selected-link";
  const postsItemBorder = "none";
  const savedItemBorder = "selected-item";
  const loading = state.ui.loading.indexLoading;
  return({
    user,
    userId,
    currentUserId,
    userPosts,
    savedSelected,
    gridSelected,
    postsCssId,
    savedCssId,
    postsItemBorder,
    savedItemBorder,
    loading
  });

}

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchUser: id => dispatch(fetchUser(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostGrid);

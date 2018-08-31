import { connect } from 'react-redux';
import { selectUser, selectPostsFromUser } from '../../reducers/selectors';
import { fetchUser } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/post_actions';
import React from 'react';
import PostGrid from './post_grid';

const mapStateToProps = (state, { match }) => {
  const userId = parseInt(match.params.userId);
  const user = selectUser(state.entities, userId)
  const currentUserId = state.session.id;
  const allPosts = state.entities.posts;
  const userPosts = selectPostsFromUser(allPosts, userId);
  return({
    user,
    currentUserId,
    userPosts
  });
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchUser: id => dispatch(fetchUser(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostGrid);

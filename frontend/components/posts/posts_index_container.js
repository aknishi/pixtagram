import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';

import PostsIndex from './posts_index';
import values from 'lodash/values';

const mapStateToProps = ( state ) => {
  const posts = values(state.entities.posts);
  const users = state.entities.users;
  const currentUserId = state.session.id;
  return ({
    posts,
    users,
    currentUserId
  })
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchUsers: () => dispatch(fetchUsers()),
  deletePost: id => dispatch(deletePost(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsIndex);

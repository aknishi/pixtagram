import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';
import PostsIndex from './posts_index';
import values from 'lodash/values';

const mapStateToProps = ( state ) => {
  const posts = values(state.entities.posts);
  const users = state.entities.users;
  return ({
    posts,
    users
  })
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsIndex);

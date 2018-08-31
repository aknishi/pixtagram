import { connect } from 'react-redux';
import { selectPost, selectUser} from '../../reducers/selectors';
import { fetchPost } from '../../actions/post_actions';
import React from 'react';
import PostShow from './post_show';

const mapStateToProps = (state, { match }) => {
  const postId = parseInt(match.params.postId);
  const post = selectPost(state.entities, postId);
  const user = selectUser(state.entities, post.user_id)
  return({
    post,
    user
  });
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPost: id => dispatch(fetchPost(id)),
  fetchUser: id => dispatch(fetchUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostShow);

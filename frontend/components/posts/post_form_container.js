import { connect } from 'react-redux';
import { createPost, clearErrors } from '../../actions/post_actions';
import PostForm from './post_form';

const mapStateToProps = ( state, ownProps ) => ({
  currentUserId: state.session.id
});

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPost(post)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);

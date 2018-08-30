import { connect } from 'react-redux';
import { updateUser, fetchUser, clearErrors, receiveErrors } from '../../actions/user_actions';
import UserEditForm from './user_edit_form';

const mapStateToProps = (state, { match }) => {
  const user = state.entities.users[match.params.userId];
  const errors = state.errors.profile;
  const currentUserId = state.session.id
  return ({
    user,
    errors,
    currentUserId
  });
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: user => dispatch(updateUser(user)),
  fetchUser: id => dispatch(fetchUser(id)),
  clearErrors: () => dispatch(clearErrors()),
  receiveErrors: errors => dispatch(receiveErrors(errors))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEditForm);

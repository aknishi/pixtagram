import { connect } from 'react-redux';
import { logout } from '../../actions/user_actions';
import NotificationsDropdown from './notifications_dropdown';

const matchStateToProps = ({session, entities: { users } }) => ({
  currentUser: users[session.id]
});

const matchDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(NotificationsDropdown);

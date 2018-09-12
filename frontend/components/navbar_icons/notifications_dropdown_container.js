import { connect } from 'react-redux';
import { logout } from '../../actions/user_actions';
import NotificationsDropdown from './notifications_dropdown';
import values from 'lodash/values';

const matchStateToProps = ({session, entities: { users, notifications, posts } }) => ({
  currentUser: users[session.id],
  notifications: values(notifications),
  users,
  posts
});

const matchDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(NotificationsDropdown);

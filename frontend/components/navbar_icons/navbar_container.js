import { connect } from 'react-redux';
import { logout, fetchNotifications, updateNotification } from '../../actions/session_actions';
import { fetchUsers } from '../../actions/user_actions';
import NavBar from './navbar';
import values from 'lodash/values';

const matchStateToProps = ({session, entities: { users, notifications } }) => ({
  currentUser: users[session.id],
  users: values(users),
  notifications: values(notifications)
});

const matchDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchNotifications: () => dispatch(fetchNotifications()),
  fetchUsers: () => dispatch(fetchUsers()),
  updateNotification: notification => dispatch(updateNotification(notification))
})

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(NavBar);

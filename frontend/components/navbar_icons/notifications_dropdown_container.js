import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/post_actions';
import { fetchNotifications } from '../../actions/session_actions';
import NotificationsDropdown from './notifications_dropdown';
import values from 'lodash/values';

const matchStateToProps = ({session, entities: { users, notifications, posts } }) => ({
  currentUser: users[session.id],
  notifications: values(notifications),
  users,
  posts
});

const matchDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchPosts: () => dispatch(fetchPosts()),
  fetchNotifications: () => dispatch(fetchNotifications())
})

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(NotificationsDropdown);

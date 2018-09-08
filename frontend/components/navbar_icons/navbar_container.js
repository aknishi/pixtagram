import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import NavBar from './navbar';
import values from 'lodash/values';

const matchStateToProps = ({session, entities: { users } }) => ({
  currentUser: users[session.id],
  users: values(users)
});

const matchDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(NavBar);

import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import NavBarIcons from './navbar_icons';

const matchStateToProps = ({session, entities: { users } }) => ({
  currentUser: users[session.id]
});

const matchDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(NavBarIcons);

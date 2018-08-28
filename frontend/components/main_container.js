import { connect } from 'react-redux';
import Main from './main';

const matchStateToProps = ({session, entities: { users } }) => ({
  currentUser: users[session.id]
});

export default connect(
  matchStateToProps,
  null
)(Main);

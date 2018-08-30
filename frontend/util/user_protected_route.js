import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserProtected from './user_protected';

const mapStateToProps = ({ session }, { match }) => ({
  currentUserId: session.id,
  targetUserId: match.params.userId
});

export const UserProtectedRoute = withRouter(connect (
  mapStateToProps,
  null
)(UserProtected))

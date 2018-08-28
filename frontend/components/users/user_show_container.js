import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../reducers/selectors';
import { fetchUser } from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';
import React from 'react';
import UserShow from './user_show';

const mapStateToProps = (state, { match }) => {
  const userId = parseInt(match.params.userId);
  const user = selectUser(state.entities, userId)
  return({
    userId,
    user
  });
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser: id => dispatch(fetchUser(id)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);

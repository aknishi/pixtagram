import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, clearErrors } from '../../actions/session_actions';
import React from 'react';
import LoginForm from './login_form';

const mapStateToProps = ({ errors }) => ({
  errors: errors.session,
  navLink: <Link to="/signup" className="session-link">Sign Up</Link>
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: user => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

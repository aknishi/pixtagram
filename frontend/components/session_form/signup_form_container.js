import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import { Link } from 'react-router-dom';
import React from 'react';
import SignupForm from './signup_form';

const mapStateToProps = ({ errors }) => ({
  errors: errors.session,
  navLink: <Link to="/login" className="session-link">Log In</Link>
});

const mapDispatchToProps = (dispatch) => ({
  signup: user => dispatch(signup(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);

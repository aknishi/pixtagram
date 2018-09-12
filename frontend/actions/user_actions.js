import * as APIUtil from '../util/user_api_util';
import * as followAPIUtil from '../util/follow_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_PROFILE_ERRORS = 'RECEIVE_PROFILE_ERRORS';
export const CLEAR_PROFILE_ERRORS = 'CLEAR_PROFILE_ERRORS';
export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const REMOVE_FOLLOW = 'REMOVE_FOLLOW';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveErrors = errors => ({
  type: RECEIVE_PROFILE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_PROFILE_ERRORS
});

export const receiveFollow = follow => ({
  type: RECEIVE_FOLLOW,
  follow
});

export const removeFollow = follow => ({
  type: REMOVE_FOLLOW,
  follow
});

export const fetchUsers = () => dispatch => (
  APIUtil.fetchUsers().then(users => (
    dispatch(receiveUsers(users))
  ))
);

export const fetchUser = id => dispatch => (
  APIUtil.fetchUser(id).then(user => (
    dispatch(receiveUser(user))
  ))
);

export const updateUser = ({ formData, userId }) => dispatch => {
  console.log(formData);
  console.log(userId);
  return(
    APIUtil.updateUser({ formData, userId }).then(user => {
      dispatch(receiveUser(user));
    }).fail(err => dispatch(receiveErrors(err.responseJSON)))
  )
};

export const createFollow = follow => dispatch => (
  followAPIUtil.createFollow(follow).then(
    follow => dispatch(receiveFollow(follow)))
);

export const deleteFollow = follow => dispatch => (
  followAPIUtil.deleteFollow(follow).then(
    follow => dispatch(removeFollow(follow)))
);

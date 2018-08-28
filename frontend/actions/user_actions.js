import * as APIUtil from '../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_PROFILE_ERRORS = 'RECEIVE_PROFILE_ERRORS';
export const CLEAR_PROFILE_ERRORS = 'CLEAR_PROFILE_ERRORS';

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
})

export const clearErrors = () => ({
  type: CLEAR_PROFILE_ERRORS
})

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

export const updateUser = user => dispatch => (
  APIUtil.updateUser(user).then(user => {
    dispatch(receiveUser(user));
  }).fail(err => {
    console.log(err);
    return(
      dispatch(receiveErrors(err.responseJSON))
    )
  })
);

import * as APIUtil  from '../util/session_api_util';
import * as notificationsAPIUtil  from '../util/notifications_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS';
export const RECEIVE_NOTIFICATION = 'RECEIVE_NOTIFICATION';

export const login = user => dispatch => (
  APIUtil.login(user).then(user => {
    dispatch(receiveCurrentUser(user));
  }).fail(err => dispatch(receiveErrors(err.responseJSON)))
);

export const logout = () => dispatch => (
  APIUtil.logout().then( () => dispatch(logoutCurrentUser()))
);

export const signup = user => dispatch => (
  APIUtil.signup(user).then(user => {
    dispatch(receiveCurrentUser(user));
  }).fail(err => dispatch(receiveErrors(err.responseJSON)))
);

export const fetchNotifications = () => dispatch => (
  notificationsAPIUtil.fetchNotifications().then(
    notifications => { dispatch(receiveNotifications(notifications))})
)

export const updateNotification = notification => dispatch => {
  return(
    notificationsAPIUtil.updateNotification(notification).then(notification => {
      dispatch(receiveNotification(notification));
    }).fail(err => dispatch(receiveErrors(err.responseJSON)))
  )
};

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
})

const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

const receiveNotifications = notifications => ({
  type: RECEIVE_NOTIFICATIONS,
  notifications
});

const receiveNotification = notification => ({
  type: RECEIVE_NOTIFICATION,
  notification
});

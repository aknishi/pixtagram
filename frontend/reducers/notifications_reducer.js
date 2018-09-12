import { RECEIVE_NOTIFICATIONS, RECEIVE_NOTIFICATION } from '../actions/session_actions';

import merge from 'lodash/merge';

const notificationsReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_NOTIFICATIONS:
      return action.notifications;
    case RECEIVE_NOTIFICATION:
      return merge({}, state, {[action.notification.id]: action.notification});
    default:
      return state;
  }
}

export default notificationsReducer;

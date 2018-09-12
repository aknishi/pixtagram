import { RECEIVE_NOTIFICATIONS } from '../actions/session_actions';

import merge from 'lodash/merge';

const notificationsReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_NOTIFICATIONS:
      return action.notifications;
    default:
      return state;
  }
}

export default notificationsReducer;

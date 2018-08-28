import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import profile from './profile_errors_reducer';

export default combineReducers({
  session,
  profile
});

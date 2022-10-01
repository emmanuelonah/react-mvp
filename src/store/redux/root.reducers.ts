import { combineReducers } from 'redux';

import { usersReducer as users } from './users/users.reducer';

export const rootReducer = combineReducers({
  users,
});

import { USERS_TYPES } from './users.types';
import { UsersActions, UsersRejectedResponse } from 'UsersTypes';

type UsersState = {
  isLoading: boolean;
  error: string | null;
  data: UsersRejectedResponse[] | null;
};

const INITIAL_STATE: UsersState = {
  isLoading: false,
  error: null,
  data: null,
};

export function usersReducer(state = INITIAL_STATE, action: UsersActions): UsersState {
  switch (action.type) {
    case USERS_TYPES.GET_USERS_IS_LOADING:
      return { ...state, isLoading: true };

    case USERS_TYPES.GET_USERS_SUCCESSFUL:
      return { isLoading: false, error: null, data: action.payload };

    case USERS_TYPES.GET_USERS_FAILED:
      return { ...state, isLoading: false, error: action.payload };

    case USERS_TYPES.GET_USERS_RESET:
    default:
      return { ...INITIAL_STATE };
  }
}

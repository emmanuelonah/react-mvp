import { action } from 'typesafe-actions';
import request, { AxiosError } from 'axios';

import { httpGetRequest } from 'services';
import { USERS_TYPES } from './users.types';
import type { UsersRejectedResponse, UsersResolvedResponse } from 'UsersTypes';

const GENERIC_ERROR_MSG = "Sorry, we couldn't connect to the service kindly try again in few minutes";

function getUsersSuccessful(payload: UsersResolvedResponse) {
  return action(USERS_TYPES.GET_USERS_SUCCESSFUL, payload);
}

function getUsersFailed(payload: string) {
  return action(USERS_TYPES.GET_USERS_FAILED, payload);
}

function getUsers(signal?: AbortSignal) {
  return async (dispatch: (arg0: { type: string; payload?: string | UsersResolvedResponse }) => void) => {
    dispatch(action(USERS_TYPES.GET_USERS_IS_LOADING));

    try {
      const response = await httpGetRequest<UsersResolvedResponse>({ urlSuffix: 'users', otherConfigs: { signal } });

      dispatch(getUsersSuccessful(response.data));
    } catch (err) {
      const error = err as Error | AxiosError;
      const errorMsg =
        (request.isAxiosError(error) && (error.response?.data as UsersRejectedResponse)?.message) || GENERIC_ERROR_MSG;

      dispatch(getUsersFailed(errorMsg));
    }
  };
}

export { getUsersSuccessful, getUsersFailed, getUsers };

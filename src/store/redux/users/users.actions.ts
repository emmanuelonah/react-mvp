import { AxiosError } from 'axios';
import { action } from 'typesafe-actions';

import { httpGetRequest } from 'services';
import { UsersRejectedResponse, UsersResolvedResponse } from 'UsersTypes';

import { USERS_TYPES } from './users.types';

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
    } catch (error) {
      const axiosError = error as AxiosError<UsersRejectedResponse>;
      const errorMsg = axiosError.response?.data?.message || GENERIC_ERROR_MSG;

      dispatch(getUsersFailed(errorMsg));
    }
  };
}

export { getUsersSuccessful, getUsersFailed, getUsers };

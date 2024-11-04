import React, { useReducer, useCallback } from 'react';
import request, { AxiosError } from 'axios';

import { createContext } from 'utils';
import { ValueOf } from 'GlobalTypes';
import { httpGetRequest } from 'services';
import { TODOS_TYPES } from './todos.types';
import type { TodosResolvedResponse, TodosRejectedResponse } from 'TodosTypes';

const GENERIC_ERROR_MSG = "Sorry, we couldn't connect to the service kindly try again in few minutes";

type TodosState = {
  isLoading: boolean;
  error: string | null;
  data: TodosResolvedResponse | null;
};

type TodosAction = {
  type: ValueOf<typeof TODOS_TYPES>;
  payload?: Partial<{ error: string | null; data: TodosResolvedResponse | null }>;
};

const INITIAL_TODOS_STATE: TodosState = { isLoading: false, error: null, data: null };

function todosReducer(state: TodosState, action: TodosAction): TodosState {
  switch (action.type) {
    case TODOS_TYPES.GET_TODOS_IS_LOADING:
      return { ...state, isLoading: true };

    case TODOS_TYPES.GET_TODOS_SUCCESSFUL:
      return { isLoading: false, error: null, data: action.payload?.data! };

    case TODOS_TYPES.GET_TODOS_FAILED:
      return { ...state, isLoading: false, error: action.payload?.error! };

    case TODOS_TYPES.GET_TODOS_RESET:
    default:
      return { ...INITIAL_TODOS_STATE };
  }
}

interface TodosContextType extends TodosState {
  asyncGetTodos(signal?: AbortSignal): Promise<void>;
}
const [TodosProvider, useTodosContext] = createContext<TodosContextType>('@react-mvp/todos');

type TodosPropTypes = {
  children: React.ReactElement;
};
function TodosStore(props: TodosPropTypes) {
  const [state, dispatch] = useReducer(todosReducer, INITIAL_TODOS_STATE);

  const asyncGetTodos = useCallback(async (signal?: AbortSignal) => {
    dispatch({ type: TODOS_TYPES.GET_TODOS_IS_LOADING });

    try {
      const response = await httpGetRequest<TodosResolvedResponse>({ urlSuffix: 'todos', otherConfigs: { signal } });

      dispatch({ type: TODOS_TYPES.GET_TODOS_SUCCESSFUL, payload: { data: response.data } });
    } catch (err) {
      const error = err as Error | AxiosError;
      const errorMsg =
        (request.isAxiosError(error) && (error.response?.data as TodosRejectedResponse)?.message) || GENERIC_ERROR_MSG;

      dispatch({ type: TODOS_TYPES.GET_TODOS_FAILED, payload: { error: errorMsg } });
    }
  }, []);

  return <TodosProvider value={{ ...state, asyncGetTodos }}>{props.children}</TodosProvider>;
}

export default {
  Component: TodosStore,
  useTodos: useTodosContext,
};

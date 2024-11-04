/**
 * @function usePresenter
 *
 * Represents the Presenter (P) in the Model-View-Presenter (MVP) architecture.
 * It facilitates communication between the Model and the View.
 *
 * @description
 * The Presenter acts as an intermediary, managing the flow of data and user interactions:
 * 1. It receives user inputs from the View.
 * 2. Processes or validates this data if necessary.
 * 3. Passes the data to the Model for business logic operations.
 * 4. Receives results from the Model.
 * 5. Formats the data as needed for display.
 * 6. Updates the View with the processed information.
 *
 * @example
 * In a user management scenario:
 * 1. View: User enters age in a text field.
 * 2. Presenter: Receives age input from View.
 * 3. Presenter: Passes age to Model.
 * 4. Model: Processes age (e.g., API call, validation).
 * 5. Model: Returns result to Presenter.
 * 6. Presenter: Formats result for View.
 * 7. View: Displays formatted result.
 *
 * @note
 * The file name doesn't have to be 'usePresenter'. It can be named according to its
 * specific functionality, e.g., 'useUsers' for user management. The key is to maintain
 * the MVP pattern's separation of concerns.
 */
import { useEffect } from 'react';

import { useStore } from 'store';
import { UsersResolvedResponse } from 'UsersTypes';
import { getUsers } from 'store/redux/root.actions';
import { selectUsersIsLoading, selectUsers, selectUsersError } from 'store/redux/root.selectors';

export function usePresenter() {
  const { useDispatch, useSelector, useTodos } = useStore();
  const dispatch = useDispatch();
  const isLoadingUsers: boolean = useSelector(selectUsersIsLoading);
  const usersError: string = useSelector(selectUsersError);
  const usersData: UsersResolvedResponse = useSelector(selectUsers);
  const { error: todosError, isLoading: isLoadingTodos, data: todosData, asyncGetTodos } = useTodos();

  useEffect(() => {
    const controller = new AbortController();

    dispatch<any>(getUsers());
    return () => controller.abort();
  }, [dispatch]);

  useEffect(() => {
    const controller = new AbortController();

    asyncGetTodos(controller.signal);
    return () => controller.abort();
  }, [asyncGetTodos]);

  return { isLoadingTodos, todosError, todosData, isLoadingUsers, usersError, usersData };
}

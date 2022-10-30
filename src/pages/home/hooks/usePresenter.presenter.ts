/** *****************************************************************
 * @usePresenter represents ```P``` which the ```Presenter````
 * in ```MVP```. It helps communicate between the ```Model```
 * and the ```View```
 *
 * @note you mustn't name this file ```usePresenter``` it could
 * be called useUsers for example. Just understand that:
 * ```Presenter e.g usePresenter``` communicates between the
 * view and the model. e.g:
 *   1. If the ```Model``` needs an age input from the view's
 *   text-field, it speaks to the ```Presenter````
 *   2. And the ```Presenter``` speaks to the View
 *   2. The ```View``` gives it to the presenter and then
 *   3. The ```Presenter``` gives the age input to the Model and then
 *   4. The ```Model``` speaks to the api, and then the Model sends
 *   back the result to the presenter and then the presenter sends it back to the View
 */

import { useEffect } from 'react';
import { AnyAction } from 'redux';

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

  /// USERS GETTER BELOW
  /** ****************************************** */
  useEffect(() => {
    const controller = new AbortController();

    dispatch(getUsers(controller.signal) as unknown as AnyAction);

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  /// _TODOS GETTER BELOW
  /** ****************************************** */
  useEffect(() => {
    const controller = new AbortController();

    asyncGetTodos(controller.signal);

    return () => {
      controller.abort();
    };
  }, [asyncGetTodos]);

  return { isLoadingTodos, todosError, todosData, isLoadingUsers, usersError, usersData };
}

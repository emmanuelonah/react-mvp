/** ******************************************************
 * @Home is the ```V```in the MVP(Model View Presenter)
 * architecture. Its just a DUMMY component that
 * renders nodes. DUMMY component meaning it has no internal
 * logic.
 *
 * The beauty of this architectural pattern is that, when
 * business and technological changes happens, there will be
 * little or no UI update because of decoupling. Also, it makes
 * UI very testable.
 * I will be covering a new test pattern which i have been
 * experimenting on called the ```environmental-based-test```
 * in the current book i am writing. Just to give you a hint of
 * the test pattern, it suits the MVP architecture and i am utilizing the
 * Node JS runtime environment in the test pattern and thats where the
 * ```environment``` came into the name 😄 (i can't wait to write about it)
 *
 */

import { LoadingErrorDataRenderer } from 'components';

import { UsersResolvedResponse } from 'UsersTypes';
import { TodosResolvedResponse } from 'TodosTypes';

import { usePresenter } from './hooks/usePresenter';

export default function Home() {
  const { isLoadingTodos, todosError, todosData, isLoadingUsers, usersError, usersData } = usePresenter();

  return (
    <>
      <h3>Welcome to React MVP Experiment 🧪 </h3>

      <LoadingErrorDataRenderer<UsersResolvedResponse>
        endpoint="get/users"
        isLoading={isLoadingUsers}
        error={usersError}
        data={usersData}
        hasData={!!usersData?.length}
      >
        {(users) => (
          <>
            <h4>Users 👨‍🏫</h4>

            {users?.slice(0, 5).map(({ id, name, email, address }) => (
              <ul key={id}>
                <li>{name}</li>
                <li>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
                <li>
                  <address>{`${address.street} ${address.city}`}</address>
                </li>
              </ul>
            ))}
          </>
        )}
      </LoadingErrorDataRenderer>

      <LoadingErrorDataRenderer<TodosResolvedResponse>
        endpoint="get/todos"
        isLoading={isLoadingTodos}
        error={todosError}
        data={todosData!}
        hasData={!!todosData?.length}
      >
        {(todos) => (
          <>
            <h4>TODOS 📝</h4>

            {todos?.slice(0, 5).map(({ id, userId, title, completed }) => (
              <ul key={id}>
                <li>{userId}</li>
                <li>{title}</li>
                <li>{completed}</li>
              </ul>
            ))}
          </>
        )}
      </LoadingErrorDataRenderer>
    </>
  );
}

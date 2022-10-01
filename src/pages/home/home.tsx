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

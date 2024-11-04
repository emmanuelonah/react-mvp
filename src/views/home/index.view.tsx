/**
 * @component Home
 *
 * @description
 * Represents the View (V) in the Model-View-Presenter (MVP) architecture.
 * This is a "dummy" component that solely renders UI elements without
 * containing any internal business logic.
 *
 * @responsibilities
 * - Render UI elements based on data provided by the Presenter
 * - Capture and forward user interactions to the Presenter
 * - Update the display in response to changes in the application state
 *
 * @benefits
 * 1. Decoupling: Separates UI concerns from business logic
 * 2. Maintainability: Facilitates easier UI updates without affecting core logic
 * 3. Testability: Simplifies UI testing due to absence of complex internal logic
 * 4. Flexibility: Allows for easy adaptation to business and technological changes
 *
 * @usage
 * This component should be used in conjunction with a corresponding Presenter
 * and Model to form a complete MVP triad.
 *
 * @example
 * <Home
 *   data={presenterProvidedData}
 *   onUserAction={presenterHandleUserAction}
 * />
 *
 * @see Related components: HomePresenter, HomeModel
 */

import { AsyncRenderer } from 'components';
import { UsersResolvedResponse } from 'UsersTypes';
import { TodosResolvedResponse } from 'TodosTypes';

import { usePresenter } from './usePresenter.presenter';
import { STATUS_TYPES, WrapperParent, Title, Wrapper, Item, StatusTag, Email } from './index.style';

export default function Home() {
  const { isLoadingTodos, todosError, todosData, isLoadingUsers, usersError, usersData } = usePresenter();

  return (
    <>
      <AsyncRenderer<UsersResolvedResponse>
        endpoint="get/users"
        isLoading={isLoadingUsers}
        error={usersError}
        data={usersData}
        hasData={!!usersData?.length}
      >
        {(users) => (
          <section>
            <Title>Users 👨‍🏫</Title>
            <WrapperParent>
              {users?.slice(0, 6).map(({ id, name, email, address }) => (
                <Wrapper key={id}>
                  <ul>
                    <Item>{name}</Item>
                    <Item>
                      <Email href={`mailto:${email}`}>{email}</Email>
                    </Item>
                    <Item>
                      <address>{`${address.street} ${address.city}`}</address>
                    </Item>
                  </ul>
                </Wrapper>
              ))}
            </WrapperParent>
          </section>
        )}
      </AsyncRenderer>

      <AsyncRenderer<TodosResolvedResponse>
        endpoint="get/todos"
        isLoading={isLoadingTodos}
        error={todosError}
        data={todosData!}
        hasData={!!todosData?.length}
      >
        {(todos) => (
          <section>
            <Title>TODOS 📝</Title>
            <WrapperParent>
              {todos?.slice(0, 6).map(({ id, userId, title, completed }) => {
                const status = completed ? STATUS_TYPES.COMPLETED : STATUS_TYPES.NOT_COMPLETED;

                return (
                  <Wrapper key={id}>
                    <ul>
                      <Item>
                        <StatusTag status={status}>{status}</StatusTag>
                      </Item>
                      <Item>{title}</Item>
                      <Item>{userId}</Item>
                    </ul>
                  </Wrapper>
                );
              })}
            </WrapperParent>
          </section>
        )}
      </AsyncRenderer>
    </>
  );
}

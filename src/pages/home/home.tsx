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

import styled from 'styled-components';

import { Main } from 'layouts';
import { ValueOf } from 'GlobalTypes';
import { usePresenter } from './hooks/usePresenter';
import { UsersResolvedResponse } from 'UsersTypes';
import { TodosResolvedResponse } from 'TodosTypes';
import { LoadingErrorDataRenderer, Card } from 'components';

/// UTILS BELOW
/** ***************************************************** */
const STATUS_TYPES = {
  COMPLETED: 'Completed',
  NOT_COMPLETED: 'Not completed',
};

const Container = styled(Main)`
  padding: 1rem;
`;

const Heading = styled.h1`
  font-size: 1.3rem;
  text-align: center;
`;

const WrapperParent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  font-size: 0.9rem;
`;

const Wrapper = styled(Card)`
  margin: 0 0.5em;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  & li {
    padding: 0.3rem 0;
    font-size: 0.9rem;

    & a {
      color: dodgerblue;
      font-size: 0.75rem;
      text-decoration: underline;
    }

    & address {
      font-style: normal;
    }
  }
`;

const StatusTag = styled.div<{ status: ValueOf<typeof STATUS_TYPES> }>`
  background-color: ${(props) => (props.status === 'Completed' ? '#1e90ff' : '#fcd666')};
  border: 0;
  color: ${(props) => (props.status === 'Completed' ? '#fff' : '#000')};
  font-size: 0.8em;
  padding: 5px;
  width: fit-content;
`;

///  COMPONENT BELOW
/** ***************************************************** */
export default function Home() {
  const { isLoadingTodos, todosError, todosData, isLoadingUsers, usersError, usersData } = usePresenter();

  return (
    <Container>
      <Heading>Welcome to React MVP Experiment 🧪 </Heading>

      <LoadingErrorDataRenderer<UsersResolvedResponse>
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
              {users?.slice(0, 5).map(({ id, name, email, address }) => (
                <Wrapper key={id}>
                  <List>
                    <li>{name}</li>
                    <li>
                      <a href={`mailto:${email}`}>{email}</a>
                    </li>
                    <li>
                      <address>{`${address.street} ${address.city}`}</address>
                    </li>
                  </List>
                </Wrapper>
              ))}
            </WrapperParent>
          </section>
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
          <section>
            <Title>TODOS 📝</Title>

            <WrapperParent>
              {todos?.slice(0, 5).map(({ id, userId, title, completed }) => {
                const status = completed ? STATUS_TYPES.COMPLETED : STATUS_TYPES.NOT_COMPLETED;

                return (
                  <Wrapper key={id}>
                    <List>
                      <li>
                        <StatusTag status={status}>{status}</StatusTag>
                      </li>
                      <li>{title}</li>
                      <li>{userId}</li>
                    </List>
                  </Wrapper>
                );
              })}
            </WrapperParent>
          </section>
        )}
      </LoadingErrorDataRenderer>
    </Container>
  );
}

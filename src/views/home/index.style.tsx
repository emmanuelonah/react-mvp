import styled from 'styled-components';

import { Card } from 'components';
import { ValueOf } from 'GlobalTypes';

enum STATUS_TYPES {
  COMPLETED = 'Completed',
  NOT_COMPLETED = 'Not completed',
}

const WrapperParent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 0.9rem;
  padding: 0.5rem 0;
`;

const Wrapper = styled(Card)`
  margin: 0 0.5em;
  margin-bottom: 1rem;
`;

const Item = styled.li`
  li {
    padding: 0.3rem 0;
    font-size: 0.9rem;

    & address {
      font-style: normal;
    }
  }
`;

const Email = styled.a`
  color: #1e90ff;
  font-size: 0.75rem;
  text-decoration: underline;
`;

const StatusTag = styled.div<{ status: ValueOf<typeof STATUS_TYPES> }>`
  background-color: ${(props) => (props.status === 'Completed' ? '#1e90ff' : '#fcd666')};
  border: 0;
  color: ${(props) => (props.status === 'Completed' ? '#fff' : '#000')};
  font-size: 0.8em;
  padding: 5px;
  width: fit-content;
`;

export { STATUS_TYPES, WrapperParent, Title, Wrapper, Item, StatusTag, Email };

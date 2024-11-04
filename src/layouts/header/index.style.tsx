import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

const HeaderNode = styled.header`
  padding: 1rem;
  border-bottom: solid 1px #eee;

  & * {
    font-size: 1.3rem;
  }
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.pageWidth.maxWidth};
`;

const Item = styled.li``;

const Important = styled.p`
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;

  & a {
    color: #1e90ff;
  }
`;

const Title = styled.h3`
  color: #333;
  padding-top: 0.3rem;
  font-size: 1.2rem;
`;

const Message = styled.p`
  padding: 0.5rem 0;
  border-bottom: dashed 1px #bab8b8;
`;

const NoNotification = styled.p`
  color: #bab8b8;
  font-size: 0.8rem;
`;

const Home = styled(NavLink)`
  font-style: bold;
  font-size: 1.5rem;
`;

const Jokes = styled(NavLink)`
  font-style: bold;
  font-size: 1rem;
`;

export { HeaderNode, List, Item, Home, Jokes, Important, Title, Message, NoNotification };

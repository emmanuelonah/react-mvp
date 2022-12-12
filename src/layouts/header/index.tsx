import * as React from 'react';
import styled from 'styled-components';

import { Notification, If } from 'components';
import { useNotificationPollBridge } from
  'components/__example__/notification/hooks/useNotificationPollBridge.presenter';

const HeaderNode = styled.header`
  padding: 1rem;
  border-bottom: solid 1px #eee;

  & * {
    font-size: 1.3rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.pageWidth.maxWidth};

  & li {
    list-style: none;
  }
`;

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

type PrimitiveHeaderPropTypes = React.ComponentPropsWithoutRef<'header'>;
type HeaderElement = React.ElementRef<'header'>;
interface HeaderPropTypes extends PrimitiveHeaderPropTypes {}

export const Header = React.forwardRef<HeaderElement, HeaderPropTypes>(function Header(props, forwardedRef) {
  const { hasNotification, notifications, hasNewNotification, openNotification, closeNotification } =
    useNotificationPollBridge();

  return (
    <HeaderNode {...props} ref={forwardedRef}>
      <Wrapper>
        <h1>Welcome to React MVP Experiment 🧪</h1>

        <Notification.Root onOpen={openNotification} onClose={closeNotification}>
          <Notification.Icon hasNewNotification={hasNewNotification} />

          <Notification.Content.Root>
            <Notification.Content.Heading>
              Whats New ✨
              <Important>
                Stay up to date with the newest updates and improvements in React MVP experiment.{' '}
                <a href="https://github.com/emmanuelonah/react-mvp" target="_blank" rel="noreferrer">
                  Visit codebase
                </a>
              </Important>
            </Notification.Content.Heading>

            <Notification.Content.Body>
              <If
                condition={hasNotification}
                do={
                  <ul>
                    {notifications.map(({ id, title, message }) => (
                      <li key={id}>
                        <Title>{title}</Title>
                        <Message>{message}</Message>
                      </li>
                    ))}
                  </ul>
                }
                else={<NoNotification>Has no notification 🛌</NoNotification>}
              />
            </Notification.Content.Body>
          </Notification.Content.Root>
        </Notification.Root>
      </Wrapper>
    </HeaderNode>
  );
});

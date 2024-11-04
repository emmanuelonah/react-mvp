import React from 'react';

import { ROUTES } from 'routes';
import { Notification, If } from 'components';
import { useNotificationPollBridge }
  from 'components/__example__/notification/hooks/useNotificationPollBridge.presenter';

import { HeaderNode, List, Home, Item, Important, Title, Message, NoNotification, Jokes } from './index.style';

type PrimitiveHeaderPropTypes = React.ComponentPropsWithoutRef<'header'>;
type HeaderElement = React.ElementRef<'header'>;
interface HeaderPropTypes extends PrimitiveHeaderPropTypes {}

export const Header = React.forwardRef<HeaderElement, HeaderPropTypes>(function Header(props, forwardedRef) {
  const { hasNotification, notifications, hasNewNotification, openNotification, closeNotification } =
    useNotificationPollBridge();

  return (
    <HeaderNode {...props} ref={forwardedRef}>
      <List>
        <Item>
          <Home to={ROUTES.HOME}>Welcome to React MVP Experiment 🧪</Home>
        </Item>
        <Item>
          <Jokes to={ROUTES.JOKES}>Jokes 🎭</Jokes>
        </Item>
        <Item>
          <Notification.Root onOpen={openNotification} onClose={closeNotification}>
            <Notification.Icon hasNewNotification={hasNewNotification} />
            <Notification.Content.Root>
              <Notification.Content.Heading>
                Whats New ✨
                <Important>
                  Stay up to date with the newest updates and improvements in React MVP experiment.{' '}
                  <a href="https://github.com/emmanuelonah/react-mvp" target="_blank" rel="noopener noreferrer">
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
        </Item>
      </List>
    </HeaderNode>
  );
});

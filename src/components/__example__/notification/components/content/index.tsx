import * as React from 'react';
import styled from 'styled-components';

import { ModalWrapper, Overlay, Card, If } from 'components';
import { ChildrenPropTypes } from 'components/__example__/notification/index.view';

import { HeadingPropTypes, Heading } from './heading';

const Container = styled(Card)`
  width: 90%;
  max-width: 675px;
  position: fixed;
  z-index: ${(props) => props.theme.zIndexes.modal};
  top: 10%;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 90vh;
  max-height: 675px;
  padding: 0;
`;

type CloseNotification = {
  closeNotification?: () => void;
};

interface ContentPropTypes extends ChildrenPropTypes {
  children: React.ReactElement<CloseNotification> | React.ReactElement<CloseNotification>[];
}

export function Content({ shown, closeNotification, children }: ContentPropTypes) {
  return (
    <If
      condition={!!shown}
      do={
        <Overlay>
          <ModalWrapper elementType="notification" lock isOpen={shown} onClose={closeNotification}>
            <Container>
              {React.Children.map(children, function renderEachChildComponent(child) {
                const validChild = child as React.ReactElement<
                  React.PropsWithChildren<HeadingPropTypes & ContentPropTypes>
                >;

                if (React.isValidElement(validChild) && validChild.type === Heading) {
                  return React.cloneElement(validChild, { closeNotification });
                }

                return child;
              })}
            </Container>
          </ModalWrapper>
        </Overlay>
      }
    />
  );
}

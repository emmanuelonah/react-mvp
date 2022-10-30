import * as React from 'react';
import styled from 'styled-components';

import { ModalWrapper, Overlay, Card, If } from 'components';
import { ChildrenPropTypes } from '../../notification.view';

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

const HEADING_COMPONENT_INDEX = 0;

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
              {React.Children.map(children, function renderEachChildComponent(child, i) {
                if (React.isValidElement(child) && i === HEADING_COMPONENT_INDEX) {
                  return React.cloneElement(child, { closeNotification });
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

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

interface ContentPropTypes extends ChildrenPropTypes {
  children: React.ReactNode;
}

export function Content({ shown, closeNotification, children }: ContentPropTypes) {
  return (
    <If
      condition={!!shown}
      do={
        <Overlay>
          <ModalWrapper elementType="notification" lock isOpen={shown} onClose={closeNotification}>
            <Container>{children}</Container>
          </ModalWrapper>
        </Overlay>
      }
    />
  );
}

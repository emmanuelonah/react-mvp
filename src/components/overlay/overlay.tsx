import * as React from 'react';
import styled from 'styled-components';

import { useBodyLocker } from 'hooks';

const Container = styled.div<{ opacity?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.theme.zIndexes.overlay};
  background-color: ${(props) => `rgba(65, 65, 65, ${props.opacity ?? '0.7'})`};
`;

type OverlayPropTypes = {
  withLock?: boolean;
  opacity?: number;
  children: React.ReactNode;
};

export function Overlay({ withLock, opacity, children }: OverlayPropTypes) {
  useBodyLocker(withLock);

  return <Container opacity={opacity}>{children}</Container>;
}

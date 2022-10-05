import * as React from 'react';
import styled from 'styled-components';

const HeaderNode = styled.header`
  text-align: center;
  padding: 1rem;

  & > * {
    font-size: 1.3rem;
  }
`;

type PrimitiveHeaderPropTypes = React.ComponentPropsWithoutRef<'header'>;
type HeaderElement = React.ElementRef<'header'>;
interface HeaderPropTypes extends PrimitiveHeaderPropTypes {}

export const Header = React.forwardRef<HeaderElement, HeaderPropTypes>(function Header(props, forwardedRef) {
  return (
    <HeaderNode {...props} ref={forwardedRef}>
      <h1>Welcome to React MVP Experiment 🧪</h1>
    </HeaderNode>
  );
});

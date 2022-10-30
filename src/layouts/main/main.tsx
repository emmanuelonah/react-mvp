import * as React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  padding: 1rem;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.pageWidth.maxWidth};
`;

type PrimitiveMainPropTypes = React.ComponentPropsWithoutRef<'main'>;
type MainElement = React.ElementRef<'main'>;
interface MainPropTypes extends PrimitiveMainPropTypes {}

export const Main = React.forwardRef<MainElement, MainPropTypes>(function Main(props, forwardedRef) {
  return <Container {...props} ref={forwardedRef} id="main" data-testid="main" />;
});

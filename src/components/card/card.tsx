import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 150px;
  max-width: 300px;
  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(184, 183, 183, 0.25);
  backdrop-filter: blur(15px);
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

type PrimitiveDivPropTypes = React.ComponentPropsWithoutRef<'div'>;
type CardElement = React.ElementRef<'div'>;
interface CardPropTypes extends PrimitiveDivPropTypes {}

export const Card = React.forwardRef<CardElement, CardPropTypes>(function Card(props, forwardedRef) {
  return <Container {...props} ref={forwardedRef} />;
});

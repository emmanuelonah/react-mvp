import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
`;

type BodyPropTypes = {
  children: React.ReactNode;
};

export function Body(props: BodyPropTypes) {
  return <Container>{props.children}</Container>;
}

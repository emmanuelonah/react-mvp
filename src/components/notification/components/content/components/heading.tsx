import * as React from 'react';
import styled from 'styled-components';

import { AccessibleIcon } from 'components';

const Container = styled.h1`
  border-bottom: solid 1px #eee;
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  padding: 1rem;

  & button {
    background-color: transparent;
    border: 0;
    border: none;
    width: 30px;
    height: 30px;
    transition: all 0.5s ease-out;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #eee;
      border-radius: 50%;
    }
  }
`;

export type HeadingPropTypes = {
  closeNotification?: () => void;
  children: React.ReactNode;
};

export function Heading(props: HeadingPropTypes) {
  return (
    <Container>
      <div>{props.children}</div>

      <button type="button" onClick={props.closeNotification}>
        <AccessibleIcon label="Click to close Notifications">
          <React.Fragment>&#10005;</React.Fragment>
        </AccessibleIcon>
      </button>
    </Container>
  );
}

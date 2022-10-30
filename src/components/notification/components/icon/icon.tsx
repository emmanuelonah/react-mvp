import styled from 'styled-components';

import { If } from 'components';

import { ChildrenPropTypes } from '../../notification.view';
import { IconNotification } from './assets/icon-notification.svg';

const Parent = styled.div`
  padding: 1rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #eee;
    border-radius: 50%;
  }
`;

const Container = styled.button`
  background-color: transparent;
  border: 0;
  border: none;
  position: relative;
`;

const Indicator = styled.span`
  position: absolute;
  top: -4px;
  right: -5px;
  background: ${(props) => props.theme.colors.error.dark};
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;

interface IconPropTypes extends ChildrenPropTypes {
  hasNewNotification: boolean;
}

export function Icon({ hasNewNotification, openNotification }: IconPropTypes) {
  return (
    <Parent>
      <Container type="button" onClick={openNotification}>
        <IconNotification />

        <If condition={hasNewNotification} do={<Indicator />} />
      </Container>
    </Parent>
  );
}

import * as React from 'react';
import styled from 'styled-components';

import icnEmmanuelOnah from 'assets/icn-emmanuelonah.png';
import { AccessibleIcon } from 'components/accessible-icon';

import { IconGithub } from './assets/icn-github.svg';

const Container = styled.footer`
  border-top: solid 1px #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  padding: 1rem;

  & p {
    display: flex;
    align-items: center;
    padding-right: 2rem;

    & img {
      width: 30px;
      height: 30px;
    }
  }

  & a {
    width: 30px;
    height: 30px;
  }

  & .emoji-love {
    color: red;
    padding: 0 5px;
  }
`;

type PrimitiveFooterPropTypes = React.ComponentPropsWithoutRef<'footer'>;
type FooterElement = React.ElementRef<'footer'>;
interface FooterPropTypes extends PrimitiveFooterPropTypes {}

export const Footer = React.forwardRef<FooterElement, FooterPropTypes>(function Footer(props, forwardedRef) {
  return (
    <Container {...props} ref={forwardedRef} data-testid="footer">
      <p>
        Made with
        <AccessibleIcon label="love">
          <span className="emoji-love"> ❤️ </span>
        </AccessibleIcon>
        by <img src={icnEmmanuelOnah} alt="Emmanuel Onah" />
      </p>

      <AccessibleIcon label="Click to see github project">
        <a target="_blank" href="https://github.com/emmanuelonah/react-mvp" rel="noreferrer">
          <IconGithub />
        </a>
      </AccessibleIcon>
    </Container>
  );
});

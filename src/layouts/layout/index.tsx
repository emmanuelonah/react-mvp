import * as React from 'react';

import { Header, Main, Footer } from '..';

type LayoutPropTypes = {
  children: React.ReactNode;
};

export function Layout(props: LayoutPropTypes) {
  return (
    <>
      <Header />

      <Main>{props.children}</Main>

      <Footer />
    </>
  );
}

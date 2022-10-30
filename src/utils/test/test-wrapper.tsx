import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyle } from 'styles';

type TestWrapperPropTypes = {
  children: React.ReactNode;
};

export function TestWrapper(props: TestWrapperPropTypes) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {props.children}
      </ThemeProvider>
    </BrowserRouter>
  );
}

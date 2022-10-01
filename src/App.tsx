import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyle } from 'styles';
import { Routes } from 'routes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <a href="#main" className="skip-content">
        Skip to main content
      </a>

      <Routes />
    </ThemeProvider>
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { Layout } from 'layouts';
import { Store } from 'store/store';
import { Csp, ErrorBoundary } from 'components';
import { theme, GlobalStyle, SkipToMainContent } from 'styles';

import { __DEV__, reportWebVitals } from 'utils';

import App from './App';

import 'utils/json-prune';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } });
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Store>
              <Csp.Component
                attributes={
                  {
                    /**
                     * @description Content Security Policy (CSP) Simulation
                     *
                     * @instruction To simulate the CSP, uncomment and add the following attribute:
                     * defaultSrc: "'self'"
                     *
                     * @example
                     * attributes={{
                     *   defaultSrc: "'self'"
                     * }}
                     *
                     * @note Enabling this will restrict the content sources to only those from the same origin.
                     *
                     * @warning Ensure your application is ready for CSP before enabling in production.
                     */
                  }
                }
              >
                <GlobalStyle />
                <SkipToMainContent />
                <Layout>
                  <App />
                </Layout>
              </Csp.Component>
            </Store>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

if (__DEV__) {
  reportWebVitals();
}

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { Csp } from 'components';
import { Store } from 'store/store';
import { __DEV__, reportWebVitals } from 'utils';

import 'utils/json-prune';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Store>
      <Csp.Component
        attributes={
          {
            /**
             * @ToSimulateTheCSP remove the comment and assign this attr to the attributes obj 👉 defaultSrc: "'self'",
             *
             */
          }
        }
      >
        <App />
      </Csp.Component>
    </Store>
  </React.StrictMode>
);

if (__DEV__) {
  reportWebVitals();
}

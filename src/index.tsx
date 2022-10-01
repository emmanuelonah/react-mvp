import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Store } from 'store/store';
import { __DEV__, reportWebVitals } from 'utils';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>
);

if (__DEV__) {
  reportWebVitals();
}

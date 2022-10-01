import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import * as Screens from 'pages';
import { ErrorBoundary } from './components/error-boundary/error-boundary';

const SCREENS_COLLECTIONS = [{ path: '/', element: <Screens.Home /> }];

export function Routes() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Switch>
          {SCREENS_COLLECTIONS.map((props, index) => (
            <Route key={index.toString()} {...props} />
          ))}
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

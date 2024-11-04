import { Routes as Switch, Route } from 'react-router-dom';

import * as Screens from 'views';

const ROUTES = {
  HOME: '/',
  JOKES: '/jokes',
};

const SCREENS_COLLECTIONS = [
  { path: ROUTES.HOME, element: <Screens.Home /> },
  { path: ROUTES.JOKES, element: <Screens.ChuckNorris /> },
];

function Routes() {
  return (
    <Switch>
      {SCREENS_COLLECTIONS.map((props, index) => (
        <Route key={index.toString()} {...props} />
      ))}
    </Switch>
  );
}

export { Routes, ROUTES };

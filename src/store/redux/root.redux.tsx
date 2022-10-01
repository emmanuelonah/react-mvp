import * as React from 'react';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { __DEV__ } from 'utils';
import { rootReducer } from './root.reducers';

const middleware: Middleware[] = [reduxThunk];

if (__DEV__) {
  middleware.push(reduxLogger);
}

const store: Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

type ReactMvpReduxStorePropTypes = {
  children: React.ReactElement;
};

function ReactMvpReduxStore(props: ReactMvpReduxStorePropTypes) {
  return <Provider store={store}>{props.children}</Provider>;
}

export default {
  Component: ReactMvpReduxStore,
};

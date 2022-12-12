import * as React from 'react';

import todos from './todos/todos.context';

/**
 * @contextComponents is a collection of the high
 * level context component.
 *
 * @information just add your context component
 * into this array and the context consumers will
 * have access to your context values
 */
const contextComponents = [todos.Component];

type ReactMvpContextStorePropTypes = { children: React.ReactElement };

function ReactMvpContextStore(props: ReactMvpContextStorePropTypes) {
  return (
    <React.Fragment>
      {contextComponents.map((Component, index) => (
        <Component key={index.toString()}>{props.children}</Component>
      ))}
    </React.Fragment>
  );
}

export default {
  Component: ReactMvpContextStore,
  useContextStore: {
    // just add your useContext hook into this object and it will be exposed in the src/store/useStore.ts
    useTodos: todos.useTodos,
  },
};

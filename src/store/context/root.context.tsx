import * as React from 'react';

import todos from './todos/todos.context';

///UTILS BELOW
/***************************************************
 * @contextComponents is a collection of the
 * high level context component.
 *
 * @information just add your context component
 * into this array and the context consumers will
 * have access to your context values
 */
const contextComponents = [todos.Component];

///COMPONENT BELOW
/*********************************************/
type RootContextPropTypes = {
  children: React.ReactElement;
};

export function RootContext(props: RootContextPropTypes) {
  return (
    <>
      {contextComponents.map((Component) => (
        <Component>{props.children}</Component>
      ))}
    </>
  );
}

export default {
  Component: RootContext,
  useRootContext: {
    //just add your useContext hook into this object and it will be exposed in the src/stor/useStore.ts
    useTodos: todos.useTodos,
  },
};

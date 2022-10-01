import * as React from 'react';

import reduxStore from './redux/root.redux';
import contextStore from './context/root.context';

/// UTILS BELOW
/** ***************************************************** */
const storeComponents = [contextStore.Component, reduxStore.Component];

/// COMPONENT BELOW
/** ***************************************************** */
type StorePropTypes = {
  children: React.ReactElement;
};

export function Store(props: StorePropTypes) {
  const childElement = React.Children.only(props.children);

  return (
    <>
      {storeComponents.map((Component) => (
        <Component>{childElement}</Component>
      ))}
    </>
  );
}

import * as React from 'react';

import reduxStore from './redux/root.redux';
import contextStore from './context/root.context';

type StorePropTypes = { children: React.ReactElement };

export function Store(props: StorePropTypes) {
  const childElement = React.Children.only(props.children);

  return (
    <reduxStore.Component>
      <contextStore.Component>{childElement}</contextStore.Component>
    </reduxStore.Component>
  );
}

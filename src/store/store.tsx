import * as React from 'react';

import { Store as Internals } from 'components';

import reduxStore from './redux/root.redux';
import mobXStore from './mobx/root.observer';
import contextStore from './context/root.context';

type StorePropTypes = { children: React.ReactElement };

export function Store(props: StorePropTypes) {
  const childElement = React.Children.only(props.children);

  return (
    <reduxStore.Component>
      <mobXStore.Component>
        <contextStore.Component>
          <Internals>{childElement}</Internals>
        </contextStore.Component>
      </mobXStore.Component>
    </reduxStore.Component>
  );
}

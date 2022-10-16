import * as React from 'react';
import { observer } from 'mobx-react-lite';

type ReactMvpMobXStorePropTypes = {
  children: React.ReactElement;
};

const ReactMvpMobXStore = observer((props: ReactMvpMobXStorePropTypes) => props.children);

export default {
  Component: ReactMvpMobXStore,
};

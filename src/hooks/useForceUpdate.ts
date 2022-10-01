import * as React from 'react';

export function useForceUpdate() {
  const [, setState] = React.useState(Object.create(null));

  return React.useCallback(() => setState(Object.create(null)), []);
}

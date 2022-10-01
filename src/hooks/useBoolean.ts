import * as React from 'react';

export function useBoolean(initialValue?: boolean | (() => boolean)) {
  const [value, setValue] = React.useState(initialValue ?? false);
  const setToFalse = React.useCallback(() => setValue(false), []);
  const setToTrue = React.useCallback(() => setValue(true), []);
  const toggle = React.useCallback(() => setValue((value) => !value), []);

  return [value, { toggle, setToFalse, setToTrue }] as const;
}

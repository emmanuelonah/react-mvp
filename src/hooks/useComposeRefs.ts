import * as React from 'react';

type PossibleRefs<T> = React.Ref<T>;

export function setRef<T>(ref: PossibleRefs<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

function composedRefs<T>(...refs: PossibleRefs<T>[]) {
  return (value: T) => {
    for (const ref of refs) {
      setRef(ref, value);
    }
  };
}

export function useComposeRefs<T>(...refs: PossibleRefs<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composedRefs(...refs), refs);
}

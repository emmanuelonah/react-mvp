import * as React from 'react';

// eslint-disable-next-line no-unused-vars
export function useCallbackRef<Cb extends (...state: any[]) => any>(callback?: Cb) {
  const callbackRef = React.useRef<Cb | undefined>(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  return React.useMemo(() => ((...args) => callbackRef.current?.(...args)) as Cb, []);
}

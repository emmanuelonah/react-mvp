import * as React from 'react';

export function useBodyLocker(shouldLockNow = true) {
  React.useEffect(
    function preventBodyFromScrolling() {
      if (!shouldLockNow) return;

      const bodyRef = document.getElementById('body');

      if (bodyRef) bodyRef.style.overflow = 'hidden';

      return function resetBodyToDefaultScrollingState() {
        if (bodyRef) bodyRef.style.overflow = 'scroll';
      };
    },
    [shouldLockNow]
  );
}

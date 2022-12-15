import { useRef, useEffect, useCallback } from 'react';

import { CSPAttributes, CSP } from '../models/csp.model';

export function useCsp(attributes: CSPAttributes) {
  const { current: csp } = useRef(new CSP(attributes));

  const applyCsp = useCallback(() => {
    csp.apply();
  }, [csp]);

  useEffect(() => {
    applyCsp();
  }, [applyCsp]);
}

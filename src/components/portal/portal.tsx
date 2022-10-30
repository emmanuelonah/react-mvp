import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useForceUpdate } from 'hooks';

type PortalPropTypes = {
  elementType?: string;
  container?: React.MutableRefObject<HTMLElement>;
  children: React.ReactNode;
};

export function Portal({ elementType, container, children }: PortalPropTypes) {
  const mountedRef = useRef<HTMLSpanElement>(null);
  const portalRef = useRef<HTMLElement>(null!);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (!mountedRef.current) return;

    const ownerDocument = mountedRef.current.ownerDocument;
    const body = container?.current ?? ownerDocument.body;
    portalRef.current = ownerDocument.createElement(elementType!);

    body.appendChild(portalRef.current);
    forceUpdate();

    return function removePortalFromBodyElement() {
      if (portalRef.current && body) body.removeChild(portalRef.current);
    };
  }, [container, elementType, forceUpdate]);

  return portalRef.current ? ReactDOM.createPortal(children, portalRef.current) : <span ref={mountedRef} />;
}

Portal.defaultProps = {
  elementType: 'portal',
};

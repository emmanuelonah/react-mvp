import React, { useEffect, useRef } from 'react';

import { Portal } from 'components';
import { useComposeRefs } from 'hooks';

type PrimitiveDivProps = React.ComponentPropsWithoutRef<'div'>;
type ModalWrapperElement = React.ElementRef<'div'>;
interface ModalWrapperPropTypes extends PrimitiveDivProps {
  isOpen?: boolean;
  lock?: boolean;
  onClose?: () => void;
  elementType?: string;
}

export const ModalWrapper = React.forwardRef<ModalWrapperElement, ModalWrapperPropTypes>(function ModalWrapper(
  { onClose, elementType, isOpen, lock, children, ...restProps },
  forwardedRef
) {
  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const composedRefs = useComposeRefs<HTMLDivElement>(modalWrapperRef, forwardedRef);

  function mouseDownEventHandler(ev: React.SyntheticEvent | Event) {
    const shouldControlMouseDownEvent = isOpen && !lock && onClose;

    if (!shouldControlMouseDownEvent) return;

    if (modalWrapperRef.current && !modalWrapperRef.current.contains(ev.target as Node)) onClose();
  }

  useEffect(() => {
    document.addEventListener('mousedown', mouseDownEventHandler);

    return () => {
      document.addEventListener('mousedown', mouseDownEventHandler);
    };
  });

  return (
    <Portal elementType={elementType}>
      <div
        role="dialog"
        aria-modal="true"
        {...restProps}
        ref={composedRefs}
        onKeyDown={(ev) => {
          if (onClose && ev.key === 'Escape') onClose();
        }}
      >
        {children}
      </div>
    </Portal>
  );
});

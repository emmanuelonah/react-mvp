import * as React from 'react';

// UTILS BELOW
/** ************************************************** */
function useVisuallyHidden(props?: React.CSSProperties): { style: React.CSSProperties } {
  return {
    style: {
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      overflow: 'hidden',
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: '1px',
      ...(props ?? {}),
    },
  };
}

// COMPONENTS BELOW
/** ************************************************** */
type PrimitiveSpanTypes = React.ComponentPropsWithoutRef<'span'>;
type VisuallyHiddenElement = React.ElementRef<'span'>;
interface VisuallyHiddenPropTypes extends PrimitiveSpanTypes {}

const VisuallyHidden = React.forwardRef<VisuallyHiddenElement, VisuallyHiddenPropTypes>(function VisuallyHidden(
  props,
  forwardedRef
) {
  return <span {...props} data-testid="visuallyHidden" {...useVisuallyHidden()} ref={forwardedRef} />;
});

export type { PrimitiveSpanTypes, VisuallyHiddenElement, VisuallyHiddenPropTypes };
export { useVisuallyHidden, VisuallyHidden };

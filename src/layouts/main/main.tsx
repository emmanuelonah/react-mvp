import * as React from 'react';

type PrimitiveMainPropTypes = React.ComponentPropsWithoutRef<'main'>;
type MainElement = React.ElementRef<'main'>;
interface MainPropTypes extends PrimitiveMainPropTypes {}

export const Main = React.forwardRef<MainElement, MainPropTypes>(function Main(props, forwardedRef) {
  return <main {...props} ref={forwardedRef} id="main" data-testid="main" />;
});

/* eslint-disable max-len */
import * as React from 'react';

type PrimitiveSpanTypes = React.ComponentPropsWithoutRef<'svg'>;
type IconNotificationElement = React.ElementRef<'svg'>;
interface IconNotificationPropTypes extends PrimitiveSpanTypes {
  fill?: string;
}

export const IconNotification = React.forwardRef<IconNotificationElement, IconNotificationPropTypes>(
  function IconNotification({ fill, ...restProps }, forwardedRef) {
    return (
      <svg
        ref={forwardedRef}
        width="20"
        height="20"
        {...restProps}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.082 8.527c.102.086.208.177.318.273.8.6 1.6 1.2 1.6 2.2 0 2.8-6.1 3-8 3-1.9 0-8-.2-8-3 0-1 .8-1.6 1.6-2.2.11-.096.216-.187.318-.273C4.554 7.984 5 7.604 5 7V6c0-2.8 2.2-5 5-5s5 2.2 5 5v1c0 .604.446.984 1.082 1.527ZM10 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
          fill={fill}
        />
      </svg>
    );
  }
);

IconNotification.defaultProps = {
  fill: '#666',
};

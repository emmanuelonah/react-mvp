import * as React from 'react';

import { useBoolean } from 'hooks';

import { Icon } from './components/icon';
import { Content } from './components/content';
import { Heading } from './components/content/heading';
import { Body } from './components/content/body';

export type ChildrenPropTypes = {
  shown?: boolean;
  openNotification?: () => void;
  closeNotification?: () => void;
};
type PrimitiveDivProps = React.ComponentPropsWithoutRef<'div'>;
type NotificationElement = React.ElementRef<'div'>;
interface NotificationPropTypes extends PrimitiveDivProps {
  children: React.ReactElement<ChildrenPropTypes>[];
  isOpen?: boolean;
  onClose?(): any;
  onOpen?(): any;
}

const Notification = React.forwardRef<NotificationElement, NotificationPropTypes>(function Notification(
  { isOpen, onClose, onOpen, children, ...restProps },
  forwardedRef
) {
  const [shown, { setToTrue, setToFalse }] = useBoolean(isOpen);

  function openNotification() {
    setToTrue();
    onOpen?.();
  }

  function closeNotification() {
    setToFalse();
    onClose?.();
  }

  return (
    <div {...restProps} ref={forwardedRef}>
      {React.Children.map(children, function renderEachChildComponent(child) {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            shown,
            openNotification,
            closeNotification,
          });
        }

        return child;
      })}
    </div>
  );
});

export default {
  Root: Notification,
  Icon,
  Content: {
    Root: Content,
    Heading,
    Body,
  },
};

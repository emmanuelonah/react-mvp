import { NotificationOptions } from 'GlobalTypes';
import { throwError, __DEV__ } from 'utils';

/** ************************************************************
 * @NotificationBinder
 * currently an experiment on how i could make Browser
 * ```Notification API``` easier to use and also have a fallback
 * for browsers with no Notification API or users that denied
 * grant-access
 * *********************************************************** */
export function notificationBinderHoister() {
  const message = 'Notification API is not available on your environment';

  if (!('Notification' in globalThis)) {
    if (__DEV__) throwError('NotificationReferenceError🚨', message, arguments?.callee ?? notificationBinderHoister);

    if ('alert' in globalThis) return alert(message);

    return message;
  }

  return class NotificationBinder {
    title?: string;

    options?: NotificationOptions;

    constructor(title?: string, options?: NotificationOptions) {
      this.title = title;
      this.options = options;
    }

    updateNotificationPayload = (title: string, options?: NotificationOptions) => {
      this.title = title;
      this.options = options;
    };

    onCheckPermission = async (onSuccess?: (notification: Notification) => any, onError?: (error: Error) => any) => {
      const handleTitleMissing = () => {
        if (!this.title) {
          throwError('NotificationTitleMissingError🚨', 'you forgot to assign title', this.onCheckPermission);
        }
      };

      if (Notification.permission === 'granted') {
        handleTitleMissing();

        const notification = new Notification(this.title!, this.options);

        onSuccess?.(notification);
      } else if (Notification.permission !== 'denied') {
        try {
          const permission = await Notification.requestPermission();

          if (permission === 'granted') {
            handleTitleMissing();

            const notification = new Notification(this.title!, this.options);

            onSuccess?.(notification);
          }
        } catch (error) {
          onError?.(error as Error);
        }
      }
    };
  };
}

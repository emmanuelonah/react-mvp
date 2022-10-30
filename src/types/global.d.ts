declare module 'GlobalTypes' {
  export type ValueOf<T> = T[keyof T];

  export type KeyOf<T> = keyof T;

  type NotificationAction = {
    action: string;
    icon?: string;
    title: string;
  };

  type EpochTimeStamp = number;
  type VibratePattern = number | number[];
  type NotificationDirection = 'auto' | 'ltr' | 'rtl';

  type NotificationOptions = {
    actions?: NotificationAction[];
    badge?: string;
    body?: string;
    data?: any;
    dir?: NotificationDirection;
    icon?: string;
    image?: string;
    lang?: string;
    renotify?: boolean;
    requireInteraction?: boolean;
    silent?: boolean;
    tag?: string;
    timestamp?: EpochTimeStamp;
    vibrate?: VibratePattern;
  };
}

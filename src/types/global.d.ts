declare module 'GlobalTypes' {
  export type ValueOf<T> = T[keyof T];

  export type KeyOf<T> = keyof T;

  type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
    {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];

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

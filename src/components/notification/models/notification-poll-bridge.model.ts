export interface NotificationType {
  id: string;
  title: string;
  message: string;
}

export type NotificationPollBridgeEventDetails = {
  hasNewNotification: boolean;
  notifications: NotificationType[];
};

export interface NotificationPollBridgeEvent extends Event {
  details?: NotificationPollBridgeEventDetails;
}

function publishNotificationPollBridge(detail: NotificationPollBridgeEventDetails) {
  const event = new CustomEvent('notificationPollBridge', { detail });
  document.dispatchEvent(event);
}

function subscribeToNotificationPollBridge(listener: (event: NotificationPollBridgeEvent) => any) {
  document.addEventListener('notificationPollBridge', listener);
}

function unsubscribeFromNotificationPollBridge(listener: (event: NotificationPollBridgeEvent) => any = () => null) {
  document.removeEventListener('notificationPollBridge', listener);
}

export { publishNotificationPollBridge, subscribeToNotificationPollBridge, unsubscribeFromNotificationPollBridge };

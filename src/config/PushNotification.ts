import PushNotificationIOS, { NotificationCategory } from "@react-native-community/push-notification-ios";

const showNotification = (title: string, message: string) => {

  PushNotificationIOS.addNotificationRequest({
    id: '1',
    title: title,
    body: message,
  });
};

export {showNotification}

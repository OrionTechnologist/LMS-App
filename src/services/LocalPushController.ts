import PushNotification from 'react-native-push-notification';

interface LocalNotificationOptions {
  id?: any;
  subject?: string;
  title?: string;
  message: string;
  description?: string;
  pictureUrl?: string;
  bigPictureUrl?: string;
  ignoreInForeground?: boolean;
}

PushNotification.configure({
  onNotification(notification) {
    console.log('Local Notification', notification);
  },

  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'regular-notifications-channel',
    channelName: 'U-Pay Earn Notification Channel',
    channelDescription: 'Regular channel for user notifications',
    playSound: true,
    soundName: 'notification_sound.mp3',
    importance: 3,
    vibrate: true,
    ['vibration' as any]: 1000,
  },
  created => {
    console.log(`Channel created ${created}`);
  },
);

export const LocalNotification = (options: LocalNotificationOptions) => {
  PushNotification.localNotification({
    id: options?.id,
    channelId: 'regular-notifications-channel',
    bigText: options?.description,
    subText: options?.subject,
    title: options?.title,
    message: options?.message,
    playSound: true,
    soundName: 'notification_sound.mp3',
    importance: 'high',
    vibrate: true,
    ['vibration' as any]: 1000,
    picture: options?.pictureUrl,
    bigPictureUrl: options?.bigPictureUrl,
    ignoreInForeground: options?.ignoreInForeground,
    onlyAlertOnce: true,
    priority: 'high',
    smallIcon: 'ic_notification',
  });
};

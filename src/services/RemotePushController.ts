import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import {LocalNotification} from '@/services/LocalPushController';
import {useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';

export const RemotePushController = () => {
  const navigation = useNavigation();

  useEffect(() => {
    PushNotification.configure({
      onRegister(token) {
        console.log('FCM TOKEN: ', token?.token);
      },
      onNotification(notification) {
        const data: any = notification?.data;

        if (notification?.foreground) {
          LocalNotification({
            id: notification?.id,
            subject: data?.subject ?? undefined,
            title: data?.title ?? undefined,
            message: data?.message ?? undefined,
            description: data?.description ?? undefined,
            pictureUrl: data?.picture ?? undefined,
          });
        }

        if (notification?.userInteraction && notification?.foreground) {
          navigation.navigate(routes?.private?.notificationsScreen as never);
          PushNotification.removeDeliveredNotifications([notification?.id]);
        }
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return null;
};

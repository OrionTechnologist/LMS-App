import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {globalNotificationListener} from '@/utils/helpers';
import {RemotePushController} from '@/services/RemotePushController';
import {routes} from '@/routes';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

type RemoteMessage = FirebaseMessagingTypes.RemoteMessage;

export const NotificationService = () => {
  const navigation = useNavigation();

  const handleClickNotification = (remoteMessage: RemoteMessage) => {
    navigation.navigate(routes?.private?.notificationsScreen as never);
  };

  const pushNotificationsActivity = () => {
    globalNotificationListener();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      handleClickNotification(remoteMessage);
    });

    // When app is running and minimized, handle click notification
    messaging().onNotificationOpenedApp(remoteMessage => {
      handleClickNotification(remoteMessage);
    });

    // When a notification received
    messaging().onMessage(() => {
      console.log('New notification received!');
    });

    // Check whether an initial notification is available when the app is terminated and opened by clicking notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handleClickNotification(remoteMessage);
        }
      });
  };

  useEffect(() => {
    pushNotificationsActivity();
  }, []);

  return <RemotePushController />;
};

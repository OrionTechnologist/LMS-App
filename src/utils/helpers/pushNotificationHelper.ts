import messaging from '@react-native-firebase/messaging';
import {localStorage} from '@/services';
import {Alert, PermissionsAndroid, Platform} from 'react-native';

export async function requestUserPermission() {
  if (Platform.OS === 'ios') {
    //Request iOS permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  } else if (Platform.OS === 'android') {
    //Request Android permission (For API level 33+, for 32 or below is not required)
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
}

export async function getFCMToken() {
  let fcmToken = await localStorage.getItem('fcm-token');
  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken();

      if (fcmToken) {
        await localStorage.setItem('fcm-token', fcmToken as string);
      }
    } catch (e) {
      Alert.alert('Failed to get device FCM token!');
      console.log('Error fetching fcm token.', e);
    }
  }
  return fcmToken;
}

/*export const NotificationListener = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('Notification on foreground state...', remoteMessage);
  });
};*/

export const globalNotificationListener = () => {
  messaging()
    .subscribeToTopic('global')
    .then(() => {
      console.log('Device subscribed to topic: allDevices');
    })
    .catch(error => {
      console.error('Error subscribing to topic:', error);
    });
};

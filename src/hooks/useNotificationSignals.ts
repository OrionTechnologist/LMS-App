import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

interface UseNotificationSignalsProps {
  onReceiveUserNotification?(): void;
  onReceiveUserSupportMessage?(): void;
  onReceiveGlobalNotice?(): void;
  onReceiveVersionUpdateNotice?(): void;
  onReceiveMaintenanceNotice?(): void;
}

export const useNotificationSignals = (props: UseNotificationSignalsProps) => {
  useEffect(() => {
    const unregister = messaging().onMessage(remoteMessage => {
      if (
        props?.onReceiveUserNotification &&
        remoteMessage?.data?.action === 'INCOMING_USER_NOTIFICATION'
      ) {
        props?.onReceiveUserNotification();
      }

      if (
        props?.onReceiveUserSupportMessage &&
        remoteMessage?.data?.action === 'INCOMING_USER_SUPPORT_MESSAGE'
      ) {
        props?.onReceiveUserSupportMessage();
      }

      if (
        props?.onReceiveGlobalNotice &&
        remoteMessage?.data?.action === 'GLOBAL_NOTICE'
      ) {
        props?.onReceiveGlobalNotice();
      }

      if (
        props?.onReceiveVersionUpdateNotice &&
        remoteMessage?.data?.action === 'VERSION_UPDATE_NOTIFICATION'
      ) {
        props?.onReceiveVersionUpdateNotice();
      }

      if (
        props?.onReceiveMaintenanceNotice &&
        remoteMessage?.data?.action === 'MAINTENANCE_UPDATE_NOTIFICATION'
      ) {
        props?.onReceiveMaintenanceNotice();
      }
    });

    return () => {
      unregister();
    };
  }, []);
};

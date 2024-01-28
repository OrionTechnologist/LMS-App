import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {useEffect} from 'react';
import {requestUserPermission} from '@/utils/helpers';

export const PermissionsChecker = () => {
  useEffect(() => {
    requestMultiple([PERMISSIONS.ANDROID.POST_NOTIFICATIONS]).then(statuses => {
      console.log(
        'Notification Permission: ',
        statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS],
      );
    });

    requestUserPermission();
  }, []);

  return null;
};

import {useEffect} from 'react';
import {useAppSelector} from '@/hooks/useAppSelector';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {AppStates} from '@/types';
import {getAppStatesAction} from '@/redux/actions/httpActions';
import {convertToNumber} from '@/utils';
import {useNotificationSignals} from '@/hooks/useNotificationSignals';

export const useAppStates = () => {
  const appStatesHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_APP_STATES];
  const appStatesData: AppStates | null = appStatesHttpResponse?.data;

  const notificationsHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_NOTIFICATIONS];

  const getAppStates = () => getAppStatesAction();

  useNotificationSignals({
    onReceiveUserNotification() {
      getAppStates();
    },
    onReceiveUserSupportMessage() {
      getAppStates();
    },
  });

  useEffect(() => {
    if (notificationsHttpResponse?.success) {
      getAppStates();
    }
  }, [notificationsHttpResponse]);

  useEffect(() => {
    getAppStates();
  }, []);

  return {
    unreadNotifications: convertToNumber(appStatesData?.unread_notifications),
    unreadSupportMessages: convertToNumber(appStatesData?.unread_messages),
  };
};

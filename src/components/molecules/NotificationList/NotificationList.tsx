import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {SwipeListView} from 'react-native-swipe-list-view';
import {NotificationListItem} from '@/components/organisms/NotificationListItem';
import {DeleteRedIcon} from '@/assets/icons';
import {
  clearDeleteAllNotificationsActionResponse,
  clearDeleteNotificationActionResponse,
  clearGetNotificationsActionResponse,
  clearReadNotificationActionResponse,
  deleteAllNotificationsAction,
  deleteNotificationAction,
  getNotificationsAction,
  readNotificationAction,
} from '@/redux/actions/httpActions';
import {useAppSelector, useNavigationLayout} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {useIsFocused} from '@react-navigation/native';
import {
  DeleteNotificationParams,
  Notification,
  NotificationsCollection,
} from '@/types';
import {convertToBoolean} from '@/utils';
import {useNotificationSignals} from '@/hooks/useNotificationSignals';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';
import {EmptyPlaceholder} from '@/components/organisms/EmptyPlaceholder/EmptyPlaceholder';

interface GetNotificationOptions {
  silentRefresh?: boolean;
}

const NotificationList = () => {
  const isFocused = useIsFocused();
  const {setLayoutRefreshHandler, setIsRefreshing} = useNavigationLayout();
  const [isLayoutRefreshing, setIsLayoutRefreshing] = useState(false);
  const notificationsHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_NOTIFICATIONS];
  const notificationReadHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.READ_NOTIFICATION];
  const notificationDeleteHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.DELETE_NOTIFICATION];
  const allNotificationsDeleteHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.DELETE_ALL_NOTIFICATIONS];
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [silentRefresh, setSilentRefresh] = useState(false);
  const [notificationDetailOpen, setNotificationDetailOpen] = useState(false);

  const getNotifications = (options?: GetNotificationOptions) => {
    if (options?.silentRefresh) {
      setSilentRefresh(true);
    }
    getNotificationsAction();
  };

  const readNotification = (id: Notification['id']) => {
    if (id) {
      readNotificationAction({
        notificationId: id,
      });
    }
  };

  const deleteNotification = (
    id: DeleteNotificationParams['notificationId'],
  ) => {
    deleteNotificationAction({
      notificationId: id,
    });
  };

  const handlePressDeleteAll = () => {
    Alert.alert('Delete', 'Are you sure to delete all notifications?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress() {
          deleteAllNotificationsAction();
        },
      },
    ]);
  };

  useNotificationSignals({
    onReceiveUserNotification() {
      getNotifications();
    },
  });

  useEffect(() => {
    if (allNotificationsDeleteHttpResponse?.success) {
      clearDeleteAllNotificationsActionResponse();
      getNotifications();
    }

    if (allNotificationsDeleteHttpResponse?.error) {
      Toast.show(alertMessages.notificationDeleteFailed, Toast.SHORT);
      clearDeleteAllNotificationsActionResponse();
    }
  }, [allNotificationsDeleteHttpResponse]);

  useEffect(() => {
    if (notificationDeleteHttpResponse?.success) {
      clearDeleteNotificationActionResponse();
      getNotifications();
    }

    if (notificationDeleteHttpResponse?.error) {
      Toast.show(alertMessages.notificationDeleteFailed, Toast.SHORT);
      clearDeleteNotificationActionResponse();
    }
  }, [notificationDeleteHttpResponse]);

  useEffect(() => {
    if (notificationReadHttpResponse?.success && !notificationDetailOpen) {
      clearReadNotificationActionResponse();
      getNotifications({silentRefresh: true});
    }

    if (notificationReadHttpResponse?.error) {
      Toast.show(alertMessages.notificationReadFailed, Toast.SHORT);
      clearReadNotificationActionResponse();
    }
  }, [notificationReadHttpResponse, notificationDetailOpen]);

  useEffect(() => {
    if (notificationsHttpResponse?.success) {
      const notificationsCollection: NotificationsCollection =
        notificationsHttpResponse?.data;
      setNotifications(() => notificationsCollection?.results ?? []);
      clearGetNotificationsActionResponse();
      setSilentRefresh(false);
      setIsRefreshing(false);
      setIsLayoutRefreshing(false);
    }

    if (notificationsHttpResponse?.error) {
      Toast.show(alertMessages.getNotificationsFailed, Toast.SHORT);
      clearGetNotificationsActionResponse();
      setIsRefreshing(false);
      setIsLayoutRefreshing(false);
    }
  }, [notificationsHttpResponse]);

  useEffect(() => {
    setLayoutRefreshHandler(() => {
      setIsRefreshing(true);
      setIsLayoutRefreshing(true);
      getNotifications();
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      getNotifications();
    }
  }, [isFocused]);

  return (
    <>
      <View className={'p-[16px]'}>
        <View className={'flex flex-row justify-between items-center'}>
          {notifications?.length > 0 && (
            <>
              <Text className={'text-black font-poppins-medium text-[15px]'}>
                All Notifications
              </Text>
              <IconButton
                onPress={handlePressDeleteAll}
                icon={DeleteRedIcon}
                iconColor={'red'}
                size={22}
              />
            </>
          )}
        </View>

        <View className={'mt-[20px]'}>
          {!notificationsHttpResponse?.loading && notifications?.length > 0 && (
            <SwipeListView
              data={notifications}
              renderItem={data => (
                <NotificationListItem
                  id={data?.item?.id}
                  title={data?.item?.title}
                  message={data?.item?.message}
                  image={data?.item?.image}
                  dateTime={data?.item?.date_time}
                  unread={convertToBoolean(data?.item?.is_unread)}
                  type={data?.item?.type}
                  onPress={readNotification}
                  onOpenDetail={() => setNotificationDetailOpen(true)}
                  onCloseDetail={() => setNotificationDetailOpen(false)}
                />
              )}
              renderHiddenItem={data => (
                <View
                  className={
                    'flex flex-row justify-end items-center pr-[13px] bg-[#ffffff] rounded-[8px] h-[100%]'
                  }>
                  <IconButton
                    onPress={() => deleteNotification(data?.item?.id)}
                    icon={DeleteRedIcon}
                    iconColor={'red'}
                    size={22}
                  />
                </View>
              )}
              swipeRowStyle={{marginBottom: 15}}
              rightOpenValue={-75}
              disableRightSwipe={true}
            />
          )}

          {!notificationsHttpResponse?.loading &&
            notifications?.length === 0 && (
              <EmptyPlaceholder
                label={'No Notifications'}
                type={'notification'}
              />
            )}
        </View>
      </View>

      <ActionLoader
        show={
          !silentRefresh &&
          !isLayoutRefreshing &&
          (notificationsHttpResponse?.loading ||
            notificationDeleteHttpResponse?.loading)
        }
        label={'Loading Notifications'}
      />
    </>
  );
};

export {NotificationList};

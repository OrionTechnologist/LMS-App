import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Notification} from '@/types';
import {Button, Modal, Portal} from 'react-native-paper';
import {openImageViewerAction} from '@/redux/actions/globalActions';
import {useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';

interface NotificationListItemProps {
  unread?: boolean;
  id?: Notification['id'];
  title?: Notification['title'];
  message?: Notification['message'];
  image?: Notification['image'];
  dateTime?: Notification['date_time'];
  type?: Notification['type'];

  onPress?(id: Notification['id']): void;

  onOpenDetail?(): void;

  onCloseDetail?(): void;
}

const NotificationListItem: React.FC<NotificationListItemProps> = props => {
  const {
    id,
    unread,
    message,
    dateTime,
    title,
    image,
    type,
    onPress,
    onOpenDetail,
    onCloseDetail,
  } = props;
  const {navigate} = useNavigation();
  const [notificationDetailPopupOpen, setNotificationDetailPopupOpen] =
    useState(false);

  const closeNotificationDetailPopup = () => {
    setNotificationDetailPopupOpen(false);

    if (onCloseDetail) {
      onCloseDetail();
    }
  };

  const handlePressItem = () => {
    if (onPress && id && unread) {
      onPress(id);
    }

    switch (type) {
      case 'INFO':
        setNotificationDetailPopupOpen(true);
        if (onOpenDetail) {
          onOpenDetail();
        }
        break;
      case 'REFERRAL_ACCEPTED':
        navigate(routes?.private?.referredUsersScreen as never);
        break;
      case 'SUPPORT_MESSAGE':
        navigate(routes?.private?.supportMessagesScreen as never);
        break;
      case 'TRANSACTION':
        navigate(routes?.private?.transactionsScreen as never);
        break;
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        className={
          'flex flex-row justify-between items-center p-[14px] rounded-[8px]'
        }
        style={{
          backgroundColor: unread ? '#F5E7FF' : '#EEECF0',
        }}
        onPress={handlePressItem}>
        <View className={'flex-grow flex pr-[5px]'} style={{flex: 1}}>
          <View>
            <Text
              className={
                'text-[15px] text-black font-poppins-bold text-ellipsis'
              }>
              {title}
            </Text>
            <Text className={'text-[13px] text-[#808080] font-poppins-normal'}>
              {message}
            </Text>
            {dateTime && (
              <Text
                className={
                  'font-poppins-normal text-[#808080] text-[11px] mt-[10px]'
                }>
                {dateTime}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={notificationDetailPopupOpen}
          contentContainerStyle={{
            backgroundColor: 'white',
            marginLeft: '7%',
            marginRight: '7%',
            padding: 27,
            borderRadius: 8,
          }}
          onDismiss={closeNotificationDetailPopup}>
          <View>
            {title && (
              <Text className={'text-black font-poppins-medium text-[18px]'}>
                {title}
              </Text>
            )}

            {image && (
              <TouchableOpacity
                className={'mt-[10px]'}
                activeOpacity={0.8}
                onPress={() =>
                  openImageViewerAction({
                    images: [{uri: image}],
                  })
                }>
                <ImageBackground
                  source={{uri: image}}
                  imageStyle={{borderRadius: 8}}
                  className={'w-[100%] h-[250px] rounded-[8px]'}
                />
              </TouchableOpacity>
            )}

            {message && (
              <ScrollView style={{maxHeight: 180, marginTop: 10}}>
                <Text className={'text-black font-poppins-normal text-[14px]'}>
                  {message}
                </Text>
              </ScrollView>
            )}
          </View>

          <View className={'flex justify-end flex-row items-center mt-[27px]'}>
            <View className={'w-[70px]'}>
              <Button
                onPress={closeNotificationDetailPopup}
                className={'bg-primary'}
                textColor={'white'}>
                OK
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export {NotificationListItem};

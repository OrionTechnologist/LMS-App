import React, {useEffect} from 'react';
import {View} from 'react-native';
import {MessageReplyForm} from '@/components/molecules/SupportChat/MessageReplyForm';
import {MessagesScrollView} from '@/components/molecules/SupportChat/MessagesScrollView';
import {
  getSupportMessagesAction,
  getSupportNewUnreadMessagesAction,
} from '@/redux/actions/httpActions';
import {useNotificationSignals} from '@/hooks/useNotificationSignals';

const SupportChatContainer = () => {
  const getMessages = () =>
    getSupportMessagesAction({
      page: 1,
      per_page: 10,
      update_unread: 1,
    });

  const getNewUnreadMessages = () =>
    getSupportNewUnreadMessagesAction({
      only_new_unread: 1,
      update_unread: 1,
    });

  useNotificationSignals({
    onReceiveUserSupportMessage() {
      getNewUnreadMessages();
    },
  });

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <View className={'flex flex-grow'}>
        <MessagesScrollView />
        <MessageReplyForm />
      </View>
    </>
  );
};

export {SupportChatContainer};

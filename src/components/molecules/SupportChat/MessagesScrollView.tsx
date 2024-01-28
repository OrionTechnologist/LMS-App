import React, {useRef, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {EmptyPlaceholder} from '@/components/organisms/EmptyPlaceholder/EmptyPlaceholder';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {
  SupportMessage,
  SupportMessagesCollection,
  SupportMessagesSingleItem,
} from '@/types';
import {
  clearGetSupportMessagesActionResponse,
  clearGetSupportNewUnreadMessagesActionResponse,
  clearSendSupportMessageActionResponse,
  getAppStatesAction,
  getSupportMessagesAction,
} from '@/redux/actions/httpActions';
import {Messages} from '@/components/molecules/SupportChat/Messages';
import {MessagesLoading} from '@/components/molecules/SupportChat/MessagesLoading';

const MessagesScrollView = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [userScrolled, setUserScrolled] = useState<boolean>(false);
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(null);

  const supportMessagesHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_SUPPORT_MESSAGES];
  const supportMessagesCollection: SupportMessagesCollection =
    supportMessagesHttpResponse?.data;

  const newUnreadSupportMessagesHttpResponse =
    useAppSelector(selectHttpState)[
      CORRELATION_IDS.GET_SUPPORT_NEW_UNREAD_MESSAGES
    ];
  const newSupportUnreadMessagesCollection: SupportMessagesCollection =
    newUnreadSupportMessagesHttpResponse?.data;

  const messageSendHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.SEND_SUPPORT_MESSAGE];

  const getAppStates = () => getAppStatesAction();

  const getMessages = (page: number) =>
    getSupportMessagesAction({
      page,
      per_page: 10,
      update_unread: 1,
    });

  const scrollToBottom = () => {
    if (scrollViewRef?.current && !userScrolled) {
      scrollViewRef?.current?.scrollToEnd({animated: true});
    }
  };

  const fetchPreviousMessages = () => {
    if (nextPage) {
      getMessages(nextPage);
    }
  };

  const handleScroll = (event: any) => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
    const isAtBottom =
      layoutMeasurement?.height + contentOffset?.y >= contentSize?.height - 20;

    const isAtTop = contentOffset.y === 0;

    if (isAtTop) {
      fetchPreviousMessages();
    }

    setUserScrolled(!isAtBottom);
  };

  useEffect(() => {
    if (messageSendHttpResponse?.success) {
      clearSendSupportMessageActionResponse();
      getAppStates();

      const messageSingleItem: SupportMessagesSingleItem =
        messageSendHttpResponse?.data;
      const message = messageSingleItem?.result ?? null;
      if (message) {
        setSupportMessages(prevState => [...prevState, ...[message]]);
        setTimeout(() => {
          scrollToBottom();
        }, 300);
      }
    }

    if (messageSendHttpResponse?.error) {
      clearSendSupportMessageActionResponse();
    }
  }, [messageSendHttpResponse]);

  useEffect(() => {
    if (newUnreadSupportMessagesHttpResponse?.success) {
      clearGetSupportNewUnreadMessagesActionResponse();
      getAppStates();
      const newMessages = newSupportUnreadMessagesCollection?.results ?? [];
      setSupportMessages(prevState => [...prevState, ...newMessages]);

      setTimeout(() => {
        if (!userScrolled) {
          scrollToBottom();
        }
      }, 300);
    }

    if (newUnreadSupportMessagesHttpResponse?.error) {
      clearGetSupportNewUnreadMessagesActionResponse();
    }
  }, [newUnreadSupportMessagesHttpResponse]);

  useEffect(() => {
    if (supportMessagesHttpResponse?.success) {
      clearGetSupportMessagesActionResponse();
      getAppStates();

      const newMessages = supportMessagesCollection?.results ?? [];
      setSupportMessages(prevState => [...newMessages, ...prevState]);

      setNextPage(
        supportMessagesCollection?.metadata?.pagination?.nextPage ?? null,
      );
      setTimeout(() => {
        if (!userScrolled) {
          scrollToBottom();
        }
      }, 300);
    }

    if (supportMessagesHttpResponse?.error) {
      clearGetSupportMessagesActionResponse();
    }
  }, [supportMessagesHttpResponse]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        style={{flex: 1, padding: 25}}>
        {supportMessagesHttpResponse?.loading &&
        supportMessages?.length === 0 ? (
          <MessagesLoading />
        ) : (
          <>
            {supportMessages?.length > 0 ? (
              <>
                {supportMessagesHttpResponse?.loading && <MessagesLoading />}
                <Messages data={supportMessages} />
              </>
            ) : (
              <EmptyPlaceholder
                label={'No messages'}
                type={'support-messages'}
              />
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

export {MessagesScrollView};

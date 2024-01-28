import React, {Fragment} from 'react';
import {MessageItem} from './MessageItem';
import {SupportMessage} from '@/types';
import {convertToBoolean} from '@/utils';
import {MessageDivider} from './MessageDivider';

interface MessagesProps {
  data?: SupportMessage[];
}

interface GroupedMessageItem {
  dateGroup: string;
  messages: SupportMessage[];
}

const groupMessagesByDate = (
  messages: SupportMessage[],
): GroupedMessageItem[] => {
  const today = new Date();
  const groupedMessages: {[dateGroup: string]: SupportMessage[]} = {};

  messages.forEach(message => {
    if (message?.date_time?.date) {
      const messageDate = new Date(message?.date_time?.date);

      const timeDiff = today.getTime() - messageDate.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);

      let messageGroup;

      if (daysDiff < 1) {
        messageGroup = 'Today';
      } else if (daysDiff < 2) {
        messageGroup = 'Yesterday';
      } else {
        messageGroup = message.date_time.date;
      }

      if (!groupedMessages[messageGroup]) {
        groupedMessages[messageGroup] = [];
      }

      groupedMessages[messageGroup].push(message);
    }
  });
  return Object.keys(groupedMessages).map(dateGroup => ({
    dateGroup,
    messages: groupedMessages[dateGroup],
  }));
};

const Messages: React.FC<MessagesProps> = props => {
  const {data: messages} = props;
  const groupedMessages = groupMessagesByDate(messages ?? []);

  return (
    <>
      {groupedMessages?.map((groupItem, groupIndex) => (
        <Fragment key={groupIndex}>
          <MessageDivider label={groupItem?.dateGroup} />
          {groupItem?.messages?.map((message, messageIndex) => (
            <MessageItem
              key={messageIndex}
              opponent={convertToBoolean(message?.is_opponent)}
              avatarSrc={message?.sender?.profile_photo}
              messageText={message?.message}
              dateTime={{
                date: message?.date_time?.date,
                time: message?.date_time?.time,
              }}
              imageUri={message?.attachment_image ?? null}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export {Messages};

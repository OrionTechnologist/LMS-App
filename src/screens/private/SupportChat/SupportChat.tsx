import React from 'react';
import {SupportChatContainer} from '@/components/molecules/SupportChat';
import {useNavigation} from '@react-navigation/native';
import {PageHeader} from '@/components/molecules/PageHeader';

const SupportChat = () => {
  const {goBack} = useNavigation();

  return (
    <>
      <PageHeader
        variant={'title-bar'}
        titleInfoProps={{
          title: 'Support Chat',
        }}
        showBackButton={true}
        onClickBackButton={goBack}
      />
      <SupportChatContainer />
    </>
  );
};

export default SupportChat;

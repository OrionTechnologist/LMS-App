import React from 'react';
import {Text, View} from 'react-native';

interface MessageDividerProps {
  label?: string;
}

const MessageDivider: React.FC<MessageDividerProps> = props => {
  const {label} = props;

  return (
    <>
      <View className={'mb-[40px] bg-[red]'}>
        <View className={'flex flex-row items-center'}>
          <View className={'flex-grow bg-[#cccccc] h-[1px]'} />
          <View className={'px-[10px]'}>
            <Text className={'text-[#595959]'}>{label}</Text>
          </View>
          <View className={'flex-grow bg-[#cccccc] h-[1px]'} />
        </View>
      </View>
    </>
  );
};

export {MessageDivider};

import React from 'react';
import {View} from 'react-native';
import {Modal, Portal, Text, ActivityIndicator} from 'react-native-paper';
import {colors} from '@/config/colors';

interface ActionLoaderProps {
  show?: boolean;
  label?: string;
}

const ActionLoader: React.FC<ActionLoaderProps> = props => {
  const {show = false, label = 'loading'} = props;

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 70,
    borderRadius: 8,
  };
  return (
    <>
      <Portal>
        <Modal visible={show} contentContainerStyle={containerStyle}>
          <View
            className={'flex flex-row gap-[20px] items-center justify-center'}>
            <ActivityIndicator animating={true} color={colors.primary} />
            <Text className={'text-[#1E232C]'}>{label}</Text>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export {ActionLoader};

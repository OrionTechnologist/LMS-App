import React from 'react';
import {colors} from '@/config/colors';
import {ActivityIndicator} from 'react-native-paper';
import {View} from 'react-native';

const MessagesLoading = () => {
  return (
    <>
      <View className={'mt-[10px] mb-[20px]'}>
        <ActivityIndicator animating={true} color={colors.primary} />
      </View>
    </>
  );
};

export {MessagesLoading};

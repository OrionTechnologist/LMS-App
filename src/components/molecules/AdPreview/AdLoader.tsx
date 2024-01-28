import React from 'react';
import {Text, View} from 'react-native';

interface AdLoaderProps {
  loading?: boolean;
  failed?: boolean;
}

const AdLoader: React.FC<AdLoaderProps> = props => {
  const {loading = true, failed} = props;
  return (
    <View
      className={
        'absolute top-[0] left-[0] right-[0] bottom-[0] flex flex-grow justify-center items-center bg-[#000000]'
      }>
      <Text className={'text-[#ffffff] font-poppins-bold text-[15px]'}>
        {loading && !failed && 'Loading Ad...'}
        {failed && 'Failed to load ad.'}
      </Text>
    </View>
  );
};

export {AdLoader};

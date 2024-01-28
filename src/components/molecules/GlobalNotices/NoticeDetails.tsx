import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {GlobalNotice} from '@/types';
import {convertToString} from '@/utils';
import {openImageViewerAction} from '@/redux/actions/globalActions';

interface NoticeDetailsProps {
  data?: GlobalNotice | null;
}

const NoticeDetails: React.FC<NoticeDetailsProps> = props => {
  const {data} = props;
  return (
    <>
      <View className={'mt-[22px]'}>
        <View className={'p-[22px] py-[0]'}>
          <Text className={'text-[#000000] font-poppins-medium text-[18px]'}>
            {data?.title}
          </Text>
          {convertToString(data?.image)?.trim() !== '' && (
            <TouchableOpacity
              className={'mt-[10px] mb-[10px]'}
              activeOpacity={0.6}
              onPress={() =>
                openImageViewerAction({
                  images: [{uri: convertToString(data?.image)?.trim()}],
                })
              }>
              <Image
                source={{uri: convertToString(data?.image)?.trim()}}
                className={'w-[full] h-[150px] rounded-[10px]'}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
          )}
          <Text className={'text-[#000000] font-poppins-regular text-[14px]'}>
            {data?.description}
          </Text>
          {/*<Text
            className={
              'text-gray-500 font-poppins-regular text-[10px] mt-[10px]'
            }>
            {data?.date}
          </Text>*/}
        </View>
      </View>
    </>
  );
};

export {NoticeDetails};

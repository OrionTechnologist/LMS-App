import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {AdPlayCircleIcon} from '@/assets/icons';
import {convertToNumber} from '@/utils';

interface WatchAdsProps {
  onPressWatch?(): void;
  availableAds?: number;
  loading?: boolean;
  adRevenue?: number;
}

const WatchAds: React.FC<WatchAdsProps> = props => {
  const {availableAds, loading, adRevenue, onPressWatch} = props;

  return (
    <View className={'rounded-[9px] bg-[#298262] flex flex-col relative'}>
      {!loading && convertToNumber(availableAds) > 0 && (
        <View
          className={
            'rounded-[100px] bg-[#FA3434] absolute w-[24px] h-[24px] flex justify-center items-center border border-[#ffffff] border-[2px] right-[-10px] top-[-10px]'
          }>
          <Text className={'text-[10px] text-[#ffffff] font-poppins-bold'}>
            {availableAds}
          </Text>
        </View>
      )}

      <View
        className={
          'flex flex-grow justify-center items-center h-[59px] flex flex-row'
        }>
        <Image source={AdPlayCircleIcon} className={'h-[20px] w-[21px]'} />
        <Text className={'text-[#FFF500] text-[18px] font-[600] ml-[10px]'}>
          {loading ? 'Loading' : `${convertToNumber(adRevenue)} Credits`}
        </Text>
      </View>
      <TouchableOpacity
        className={'h-[46px] bg-[#19A875] flex justify-center items-center'}
        style={{
          borderBottomLeftRadius: 9,
          borderBottomRightRadius: 9,
        }}
        activeOpacity={0.5}
        onPress={!loading ? onPressWatch : undefined}>
        <Text className={'font-poppins-medium text-[#ffffff] text-[16px]'}>
          {loading ? 'Loading' : 'Watch Ad'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export {WatchAds};

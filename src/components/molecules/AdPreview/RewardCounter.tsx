import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {AdRewardCancelIcon, AdRewardGrantedCheckIcon} from '@/assets/icons';
import {convertToNumber} from '@/utils';

interface RewardCounterProps {
  onCloseAd?(): void;
  onClaimReward?(): void;
  minimumWatchDuration: number;
}

const RewardCounter: React.FC<RewardCounterProps> = props => {
  const {onCloseAd, onClaimReward} = props;
  let minimumWatchDuration = convertToNumber(props?.minimumWatchDuration);
  minimumWatchDuration = minimumWatchDuration <= 0 ? 20 : minimumWatchDuration;

  const [watchDone, setWatchDone] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(minimumWatchDuration);

  useEffect(() => {
    let timer: any;
    if (convertToNumber(minimumWatchDuration) > 0) {
      timer = setTimeout(() => {
        setWatchDone(true);
      }, convertToNumber(minimumWatchDuration) * 1000);
    }

    const interval = setInterval(() => {
      setSecondsElapsed(prevSeconds => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          setWatchDone(true);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      clearInterval(interval);
    };
  }, [minimumWatchDuration]);

  return (
    <>
      <View className={'p-[8px] absolute bottom-[25px] left-[0] right-[0]'}>
        <View
          className={'rounded-[10px] h-[67px]'}
          style={{backgroundColor: 'rgba(92, 90, 90, 0.32)'}}>
          {!watchDone && (
            <View className={'flex flex-grow justify-center items-center'}>
              <TouchableOpacity
                className={
                  'flex flex-row justify-between items-center h-[35px] px-[15px] rounded-[8px] bg-primary'
                }
                activeOpacity={0.8}
                onPress={onCloseAd}>
                <Text
                  className={'text-[#ffffff] font-poppins-regular text-[16px]'}>
                  Reward in {secondsElapsed} seconds
                </Text>
                <Image
                  source={AdRewardCancelIcon}
                  className={'h-[16px] w-[16px] ml-[10px]'}
                />
              </TouchableOpacity>
            </View>
          )}
          {watchDone && (
            <View
              className={
                'flex flex-grow flex-row justify-between items-center px-[23px]'
              }>
              <View className={'flex flex-row items-center'}>
                <Image
                  source={AdRewardGrantedCheckIcon}
                  className={'w-[22px] h-[22px]'}
                />
                <Text
                  className={
                    'text-[#ffffff] font-poppins-medium font-[500] text-[15px] ml-[10px]'
                  }>
                  Reward Granted
                </Text>
              </View>

              <TouchableOpacity
                className={
                  'flex flex-row justify-between items-center h-[35px] px-[15px] rounded-[8px] bg-[#1BAC78]'
                }
                activeOpacity={0.8}
                onPress={onClaimReward}>
                <Text
                  className={'text-[#ffffff] font-poppins-bold text-[16px]'}>
                  Claim
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export {RewardCounter};

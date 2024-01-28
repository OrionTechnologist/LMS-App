import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {
  claimDailyRewardAction,
  clearClaimDailyRewardResponse,
} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {ShakePulsarButton} from '@/components/atoms/Button';
import {RewardDailyCheckInIcon} from '@/assets/icons';

interface DailyRewardSectionProps {
  onSuccess?(): void;
}

const DailyRewardSection: React.FC<DailyRewardSectionProps> = props => {
  const {onSuccess} = props;

  const claimDailyRewardHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.CLAIM_DAILY_REWARD];

  const claimDailyReward = () => claimDailyRewardAction();

  useEffect(() => {
    if (claimDailyRewardHttpResponse?.success) {
      clearClaimDailyRewardResponse();

      if (onSuccess) {
        onSuccess();
      }
    }
    if (claimDailyRewardHttpResponse?.error) {
      Toast.show(alertMessages.claimDailyRewardFailed, Toast.SHORT);
      clearClaimDailyRewardResponse();
    }
  }, [claimDailyRewardHttpResponse]);

  return (
    <>
      <View className={'mt-[20px] px-[9px]'}>
        <Text className={'text-[15px] font-poppins-bold text-[#4d4d4d]'}>
          Daily Reward
        </Text>
        <Text
          className={
            'text-[12px] font-poppins-regular text-[#4d4d4d] mb-[10px]'
          }>
          Click the below button to claim daily rewards!
        </Text>

        <View
          className={'mt-[20px] mb-[30px] flex justify-center items-center'}>
          <ShakePulsarButton
            title={'Daily Check In'}
            leftAdornment={
              <Image
                source={RewardDailyCheckInIcon}
                className={'h-[20px] w-[20px] mt-[-2px] mr-[5px]'}
              />
            }
            onPress={claimDailyReward}
          />
        </View>
      </View>

      <ActionLoader
        show={claimDailyRewardHttpResponse?.loading}
        label={'Loading'}
      />
    </>
  );
};

export {DailyRewardSection};

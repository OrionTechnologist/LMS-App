import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {PriceText} from '@/components/organisms/PriceText';
import {useAuth} from '@/hooks';
import {routes} from '@/routes';
import {useNavigation} from '@react-navigation/native';

interface BalanceCardProps {
  hideWithDrawButton?: boolean;
}

const BalanceCard: React.FC<BalanceCardProps> = props => {
  const {hideWithDrawButton} = props;
  const {navigate} = useNavigation();
  const {userData} = useAuth();

  const gotoWithdrawalRequestPage = () =>
    navigate(routes.private.withdrawalRequestScreen as never);

  return (
    <>
      <View
        className={
          'p-[16px] rounded-[16px] flex flex-col bg-[#4E1174] flex flex-row'
        }>
        <View className={'w-[78%]'}>
          <Text
            className={'text-white text-[12px] font-poppins-medium font-[500]'}>
            Your current balance
          </Text>
          <Text
            className={'text-white text-[25px] font-poppins-medium font-[700]'}>
            <PriceText amount={userData?.balance} />
          </Text>
          <Text
            className={
              'text-[#dddddd] text-[12px] font-poppins-regular mt-[10px]'
            }>
            * If you keep $100, you will get $1 daily bonus.
          </Text>
        </View>
        <View className={'flex flex-row items-start justify-end w-[22%]'}>
          {!hideWithDrawButton && (
            <TouchableOpacity
              activeOpacity={0.8}
              className={
                'bg-primary flex justify-center items-center rounded-[10px] p-[4px]'
              }
              style={{elevation: 3}}
              onPress={gotoWithdrawalRequestPage}>
              <Text
                className={
                  'text-[11px] font-poppins-medium font-[600] text-white'
                }>
                Withdraw
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export {BalanceCard};

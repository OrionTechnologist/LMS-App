import React from 'react';
import {Image, Text, View} from 'react-native';
import {AdEarningMoneyBagIcon} from '@/assets/icons';
import {convertToNumber, generateAmountWithCurrency} from '@/utils';
import {useApplicationSettings} from '@/hooks/useApplicationSettings';

interface EarningTodayInfoProps {
  amount?: number | null;
  loading?: boolean;
}

const EarningTodayInfo: React.FC<EarningTodayInfoProps> = props => {
  const {amount, loading} = props;
  const {currencySymbol, currencyName} = useApplicationSettings();

  return (
    <View className={'rounded-[9px] bg-[#0288d1] flex flex-col relative'}>
      <View
        className={
          'flex flex-grow justify-center items-center h-[59px] flex flex-row'
        }>
        <Image source={AdEarningMoneyBagIcon} className={'h-[25px] w-[25px]'} />
        <Text className={'text-[#FFF500] text-[18px] font-[600] ml-[10px]'}>
          {loading
            ? 'Loading'
            : generateAmountWithCurrency({
                amount: convertToNumber(amount),
                currencyName,
                symbol: currencySymbol,
                showCurrencyName: true,
              })}
        </Text>
      </View>
      <View
        className={'h-[46px] bg-[#0277bd] flex justify-center items-center'}
        style={{
          borderBottomLeftRadius: 9,
          borderBottomRightRadius: 9,
        }}>
        <Text className={'font-poppins-medium text-[#ffffff] text-[16px]'}>
          {`Today's Earning`}
        </Text>
      </View>
    </View>
  );
};

export {EarningTodayInfo};

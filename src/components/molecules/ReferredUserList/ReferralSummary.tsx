import React from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {PriceText} from '@/components/organisms/PriceText';

interface ReferralSummaryProps {
  totalEarnings: number;
  totalSales: number;
}

const informationCards = [
  {value: 'TOTAL_REFERRAL_EARNINGS', title: 'Total Earnings'},
  {value: 'TOTAL_SALES', title: 'Total Sales'},
];

const ReferralSummary: React.FC<ReferralSummaryProps> = props => {
  const {totalSales, totalEarnings} = props;

  return (
    <>
      <SafeAreaView style={{flex: 1, width: '100%'}}>
        <FlatList
          data={informationCards}
          numColumns={2}
          renderItem={({item}) => (
            <View style={{flex: 1}}>
              {item?.value === 'TOTAL_REFERRAL_EARNINGS' && (
                <>
                  <View
                    className={
                      'flex flex-col justify-center items-center bg-[#298262] p-[10px] rounded-[10px] mr-[10px]'
                    }>
                    <Text
                      className={'text-white font-poppins-medium text-[13px]'}>
                      Total Earnings
                    </Text>
                    <Text
                      className={'text-white font-poppins-bold text-[15px]'}>
                      <PriceText amount={totalEarnings} />
                    </Text>
                  </View>
                </>
              )}
              {item?.value === 'TOTAL_SALES' && (
                <>
                  <View
                    className={
                      'flex flex-col justify-center items-center bg-[#0288D1] p-[10px] rounded-[10px] ml-[10px]'
                    }>
                    <Text
                      className={'text-white font-poppins-medium text-[13px]'}>
                      Total Sales
                    </Text>
                    <Text
                      className={'text-white font-poppins-bold text-[15px]'}>
                      <PriceText amount={totalSales} />
                    </Text>
                  </View>
                </>
              )}
            </View>
          )}
          keyExtractor={item => item.title}
        />
      </SafeAreaView>
    </>
  );
};

export {ReferralSummary};

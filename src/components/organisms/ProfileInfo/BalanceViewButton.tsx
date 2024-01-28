import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {PriceText} from '@/components/organisms/PriceText';
import {useAuth} from '@/hooks';

interface BalanceViewButtonProps {}

const BalanceViewButton: React.FC<BalanceViewButtonProps> = props => {
  const {userData} = useAuth();
  const [balanceShown, setBalanceShown] = useState(false);

  useEffect(() => {
    let timeoutId: any;

    if (balanceShown) {
      timeoutId = setTimeout(() => {
        setBalanceShown(false);
      }, 2500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [balanceShown]);

  return (
    <>
      <TouchableOpacity
        className={
          'h-[28px] flex items-center justify-center p-[5px] px-[8px] bg-white rounded-[10px]'
        }
        activeOpacity={0.8}
        style={{elevation: 3}}
        onPress={() => setBalanceShown(!balanceShown)}>
        <Text className={`text-[#7519B4] font-bold text-[12px]`}>
          {balanceShown ? (
            <PriceText amount={userData?.balance} showCurrencyName={true} />
          ) : (
            'Tap for balance'
          )}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export {BalanceViewButton};

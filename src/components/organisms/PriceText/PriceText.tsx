import React from 'react';
import {useApplicationSettings} from '@/hooks/useApplicationSettings';
import {generateAmountWithCurrency} from '@/utils';
import {Text, TextProps} from 'react-native';

interface PriceTextProps {
  amount: string | number | null | undefined;
  textProps?: TextProps;
  showCurrencyName?: boolean;
}

const PriceText: React.FC<PriceTextProps> = props => {
  const {amount, textProps, showCurrencyName} = props;
  const {currencySymbol, currencyName} = useApplicationSettings();

  const balanceText = generateAmountWithCurrency({
    amount,
    currencyName: currencyName,
    symbol: currencySymbol,
    showCurrencyName,
  });

  return (
    <>
      <Text {...textProps}>{balanceText}</Text>
    </>
  );
};

export {PriceText};

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import classNames from 'classnames';

interface AmountRadioChipProps {
  checked?: boolean;
  onSelect?(amount: number): void;
  withdrawAmount: number;
  withdrawCharge: number;
}

const AmountRadioChip: React.FC<AmountRadioChipProps> = props => {
  const {checked, withdrawAmount, withdrawCharge, onSelect} = props;

  const handlePress = () => {
    if (onSelect) {
      onSelect(withdrawAmount);
    }
  };

  return (
    <>
      <TouchableOpacity
        className={
          'flex flex-row items-center justify-center border border-[2px border-[#EDB8FF] rounded-[20px] bg-[#ffffff] h-[35px] px-[10px] mr-[8px] mt-[16px]'
        }
        activeOpacity={0.7}
        onPress={handlePress}>
        <View
          className={classNames(
            'h-[18px] w-[18px] border border-[2px] rounded-[100px]',
            {
              'border-primary bg-[#ffffff]': !checked,
              'border-[#D7B7E2] bg-primary': checked,
            },
          )}
        />
        <Text
          className={
            'font-poppins-medium text-[12px] text-[#2D3748] ml-[5px] mt-[2px]'
          }>
          ${withdrawAmount} (
          <Text className={'text-[#FF0110]'}>
            {withdrawCharge === 0 ? 'Free' : `- $${withdrawCharge} Charge`}
          </Text>
          )
        </Text>
      </TouchableOpacity>
    </>
  );
};

export {AmountRadioChip};

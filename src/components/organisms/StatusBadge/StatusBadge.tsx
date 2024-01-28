import React from 'react';
import {Text, View, ViewStyle} from 'react-native';
import {TransactionStatusType} from '@/types';

interface StatusBadgeProps {
  status: TransactionStatusType;
  style?: ViewStyle;
}

const StatusBadge: React.FC<StatusBadgeProps> = props => {
  const {status, style} = props;

  const generateStatusTextAndColor = () => {
    let text: string = status;
    let textBgColor: string = '';
    let textColor: string = '';

    switch (status) {
      case 'PENDING':
        text = 'Pending';
        textBgColor = 'rgba(0, 190, 232, 0.20)';
        textColor = '#65B3CC';
        break;
      case 'RECEIVED':
        text = 'Received';
        textBgColor = 'rgba(48, 186, 69, 0.20)';
        textColor = '#30BA45';
        break;
      case 'ACCEPTED':
        text = 'Accepted';
        textBgColor = 'rgba(48, 186, 69, 0.20)';
        textColor = '#30BA45';
        break;
      case 'CANCELLED':
        text = 'Cancelled';
        textBgColor = '#FCD7D7';
        textColor = '#F90918';
        break;
      case 'REJECTED':
        text = 'Rejected';
        textBgColor = '#FCD7D7';
        textColor = '#F90918';
        break;
    }
    return {
      text,
      textBgColor,
      textColor,
    };
  };

  const statusText = generateStatusTextAndColor();

  return (
    <>
      <View
        style={{backgroundColor: statusText.textBgColor, ...style}}
        className={
          'rounded-[15.5px] h-[32px] px-[10px] flex items-center justify-center'
        }>
        <Text
          className={'font-poppins-medium font-[600] text-[12px]'}
          style={{color: statusText.textColor}}>
          {statusText.text}
        </Text>
      </View>
    </>
  );
};

export {StatusBadge};

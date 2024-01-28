import React from 'react';
import {Image, Text, View, ViewStyle} from 'react-native';
import {
  AlertColorIcon,
  HandshakeIcon,
  MessagePlaceholderIcon,
  NotificationBellIcon,
  PlantCoinIcon,
  RedFlowerPlantIcon,
} from '@/assets/icons';

interface EmptyPlaceholderProps {
  type?:
    | 'default'
    | 'transactions'
    | 'referral-users'
    | 'notification'
    | 'support-messages'
    | 'alert';
  label?: string | React.ReactNode;
  containerStyle?: ViewStyle;
}

const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = props => {
  const {type = 'default', label, containerStyle} = props;

  const getImage = () => {
    let image: any = null;

    switch (type) {
      case 'default':
        image = RedFlowerPlantIcon;
        break;
      case 'transactions':
        image = PlantCoinIcon;
        break;
      case 'referral-users':
        image = HandshakeIcon;
        break;
      case 'notification':
        image = NotificationBellIcon;
        break;
      case 'support-messages':
        image = MessagePlaceholderIcon;
        break;
      case 'alert':
        image = AlertColorIcon;
        break;
    }
    return image;
  };

  const imageSource = getImage();

  return (
    <>
      <View
        className={'h-[200px] flex flex-col items-center justify-center'}
        style={containerStyle}>
        <Image source={imageSource} className={'w-[100px] h-[100px]'} />

        {typeof label === 'string' ? (
          <Text
            className={'text-black text-[14px] font-poppins-medium mt-[10px]'}>
            {label}
          </Text>
        ) : (
          label
        )}
      </View>
    </>
  );
};

export {EmptyPlaceholder};

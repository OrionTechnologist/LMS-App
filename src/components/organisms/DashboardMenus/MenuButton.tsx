import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';

interface MenuButtonProps {
  title?: string | React.ReactNode;
  iconSource?: any;
  onPress?(): void;
}

const MenuButton: React.FC<MenuButtonProps> = props => {
  const {title, iconSource, onPress} = props;
  return (
    <>
      <TouchableOpacity
        style={{flex: 1}}
        className={
          'flex flex-col bg-[#ffffff] h-[97px] rounded-[15px] m-[6px] justify-center items-center'
        }
        onPress={onPress}>
        <Image source={iconSource} className={'w-[45px] h-[45px]'} />
        <Text
          className={
            'text-[12px] font-poppins-regular font-[700] mt-[8px] text-[#2D3748]'
          }>
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export {MenuButton};

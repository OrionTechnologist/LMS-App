import {TouchableRipple} from 'react-native-paper';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {SettingsRightArrowIcon} from '@/assets/icons';
import React from 'react';

interface NavigationListItemProps {
  icon?: ImageSourcePropType;
  onPress?(): void;
  title?: string;
}

const NavigationListItem: React.FC<NavigationListItemProps> = props => {
  const {title, icon, onPress} = props;
  return (
    <TouchableRipple
      onPress={onPress}
      className={'h-[50px] flex flex-row items-center px-[25px]'}>
      <View className={'flex flex-row flex-grow justify-between'}>
        <View className={'flex flex-row items-center'}>
          {icon && (
            <Image source={icon} className={'w-[22px] h-[22px] mr-[20px]'} />
          )}
          <Text
            className={
              'text-[#2E3A59] text-[15px] font-poppins-medium font-[500]'
            }>
            {title}
          </Text>
        </View>
        <View className={'flex items-center mt-[5px]'}>
          <Image
            source={SettingsRightArrowIcon}
            className={'w-[8px] h-[13px]'}
          />
        </View>
      </View>
    </TouchableRipple>
  );
};

export {NavigationListItem};

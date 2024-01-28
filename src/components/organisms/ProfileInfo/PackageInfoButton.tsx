import React from 'react';
import {Image, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import classNames from 'classnames';
import {useAuth} from '@/hooks';
import {
  PackageDiamondTrophyIcon,
  PackageGoldTrophyIcon,
  PackageSilverTrophyIcon,
} from '@/assets/icons';
import {routes} from '@/routes';
import {useNavigation} from '@react-navigation/native';

interface PackageInfoButtonProps {
  className?: string;
  style?: ViewStyle;
}

const PackageInfoButton: React.FC<PackageInfoButtonProps> = props => {
  const {style} = props;
  const {userData} = useAuth();
  const {navigate} = useNavigation();

  const trophyImage =
    userData?.package?.name === 'Silver'
      ? PackageSilverTrophyIcon
      : userData?.package?.name === 'Gold'
      ? PackageGoldTrophyIcon
      : userData?.package?.name === 'Diamond'
      ? PackageDiamondTrophyIcon
      : null;

  const gotoPlansPage = () => navigate(routes.private.pricingScreen as never);

  return (
    <>
      <TouchableOpacity
        className={classNames(
          'bg-teal-700 rounded-[10px] h-[30px] px-[10px] flex justify-center items-center',
        )}
        style={{elevation: 3, ...style}}
        activeOpacity={0.8}
        onPress={gotoPlansPage}>
        <View className={'flex flex-row items-center'}>
          {trophyImage && (
            <Image source={trophyImage} className={'w-[14px] h-[14px]'} />
          )}
          <Text
            className={
              'text-[#ffffff] ml-[6px] text-[12px] font-medium font-poppins-medium'
            }>
            {userData?.package?.name}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export {PackageInfoButton};

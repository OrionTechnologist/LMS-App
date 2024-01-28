import React from 'react';
import {Image, Text, View} from 'react-native';
import {
  CheckCircleIcon,
  CloseCircleRedIcon,
  PackageDiamondTrophyIcon,
  PackageGoldTrophyIcon,
  PackageSilverTrophyIcon,
} from '@/assets/icons';
import {TouchableRipple} from 'react-native-paper';
import {Package} from '@/types';
import {convertCurrency} from '@/utils';

interface PackageCardProps {
  name?: Package['name'];
  price?: Package['price'];
  features?: {
    title?: string;
    available?: boolean;
  }[];
  currentSelected?: boolean;
  onSelect?(): void;
  hideBuyNowButton?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = props => {
  const {features, onSelect, name, price, currentSelected, hideBuyNowButton} =
    props;

  return (
    <>
      <View
        className={'w-[100%] rounded-[16px] bg-[#dfd3f8] mb-[26px] p-[22px]'}>
        <View className={'flex flex-row gap-[24px]'}>
          <View>
            {name === 'Silver' && (
              <Image
                source={PackageSilverTrophyIcon}
                className={'w-[90px] h-[90px]'}
              />
            )}

            {name === 'Gold' && (
              <Image
                source={PackageGoldTrophyIcon}
                className={'w-[90px] h-[90px]'}
              />
            )}

            {name === 'Diamond' && (
              <Image
                source={PackageDiamondTrophyIcon}
                className={'w-[90px] h-[90px]'}
              />
            )}
          </View>
          <View>
            <Text className={'text-[20px] text-[#1C2348] font-medium'}>
              {name}
            </Text>
            <Text>
              <Text className={'text-[#1C2348] text-[26px] font-bold'}>
                {convertCurrency(price)}
              </Text>
              {/*<Text className={'text-[#A4A5AA] text-[18px] font-medium'}>
                /month
              </Text>*/}
            </Text>
          </View>
        </View>
        <View
          className={'flex flex-col gap-[18px] px-[30px] mt-[15px] mb-[31px]'}>
          {features?.map((item, index) => (
            <View
              className={'flex flex-row justify-between items-center'}
              key={index}>
              <Text className={'text-[#1C2348] font-medium text-[16px]'}>
                {item?.title}
              </Text>
              {item?.available ? (
                <Image
                  source={CheckCircleIcon}
                  className={'w-[24px] h-[24px]'}
                />
              ) : (
                <Image
                  source={CloseCircleRedIcon}
                  className={'w-[26px] h-[29px]'}
                />
              )}
            </View>
          ))}
        </View>

        <View className={'mb-[10px]'}>
          {currentSelected ? (
            <View
              className={
                'bg-[#1BAC78] rounded-[8px] p-[12px] flex justify-center items-center rounded-[61px] h-[50px]'
              }>
              <Text className={'text-center text-white text-[18px] font-bold'}>
                Current Plan
              </Text>
            </View>
          ) : (
            <>
              {!hideBuyNowButton && (
                <TouchableRipple
                  className={
                    'bg-[#f0f0f5] rounded-[8px] p-[12px] flex justify-center items-center rounded-[61px] h-[50px]'
                  }
                  onPress={onSelect}>
                  <Text
                    className={
                      'text-center text-[#050D35] text-[18px] font-bold'
                    }>
                    Buy Now
                  </Text>
                </TouchableRipple>
              )}
            </>
          )}
        </View>
      </View>
    </>
  );
};

export {PackageCard};

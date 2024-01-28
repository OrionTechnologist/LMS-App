import React from 'react';
import {ProfileAvatar} from '@/components/atoms/ProfileAvatar';
import {convertToNumber, generateShortName} from '@/utils';
import {openImageViewerAction} from '@/redux/actions/globalActions';
import {Image, Text, View} from 'react-native';
import {StatusBadge} from '@/components/organisms/StatusBadge';
import {ReferralUser} from '@/types';
import {
  PackageDiamondTrophyIcon,
  PackageGoldTrophyIcon,
  PackageSilverTrophyIcon,
} from '@/assets/icons';
import {PriceText} from '@/components/organisms/PriceText';

interface ReferralUserItemProps {
  data?: ReferralUser;
}

const ReferralUserItem: React.FC<ReferralUserItemProps> = props => {
  const {data} = props;
  const referralUser = data?.referral_user;
  const packageInfo = data?.package;
  const packagePrice = convertToNumber(data?.package_price);
  const commissionPrice = convertToNumber(data?.commission_price);

  const packageTrophyImage =
    packageInfo?.name === 'Silver'
      ? PackageSilverTrophyIcon
      : packageInfo?.name === 'Gold'
      ? PackageGoldTrophyIcon
      : packageInfo?.name === 'Diamond'
      ? PackageDiamondTrophyIcon
      : null;

  return (
    <>
      <View
        className={
          'flex flex-row items-center bg-white rounded-[10px] mb-[14px] px-[12px] py-[14px]'
        }>
        <ProfileAvatar
          size={40}
          src={referralUser?.profile_photo}
          alt={generateShortName(
            referralUser?.first_name,
            referralUser?.last_name,
          )}
          onPress={() => {
            if (referralUser?.profile_photo) {
              openImageViewerAction({
                images: [{uri: referralUser?.profile_photo}],
              });
            }
          }}
          notPressAble={!referralUser?.profile_photo}
        />
        <View className={'flex flex-col flex-grow items-start ml-[15px]'}>
          <Text
            className={
              'text-[14px] font-poppins-medium font-[600] text-[#000000]'
            }>
            {referralUser?.first_name} {referralUser?.last_name}
          </Text>
          <Text
            className={
              'text-[12px] font-poppins-medium text-[#000000] opacity-[0.5]'
            }>
            @{referralUser?.user_code}
          </Text>

          <View className={'flex flex-row items-center mt-[4px]'}>
            <View
              className={
                'mr-[10px] bg-teal-700 rounded-[10px] h-[25px] px-[10px] flex flex-row justify-center items-center'
              }>
              {packageTrophyImage && (
                <Image
                  source={packageTrophyImage}
                  className={'w-[14px] h-[14px]'}
                />
              )}
              <Text
                className={
                  'text-[#ffffff] ml-[6px] text-[12px] font-medium font-poppins-medium'
                }>
                <PriceText amount={packagePrice} />
              </Text>
            </View>

            <StatusBadge
              status={'ACCEPTED'}
              style={{
                height: 25,
              }}
            />
          </View>
        </View>

        <View className={'flex flex-row items-start justify-end'}>
          <View className={'flex flex-col items-center'}>
            <Text className={'text-black font-poppins-medium text-[11px]'}>
              Commission
            </Text>
            <Text className={'text-black font-poppins-bold text-[13px]'}>
              <PriceText amount={commissionPrice} />
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export {ReferralUserItem};

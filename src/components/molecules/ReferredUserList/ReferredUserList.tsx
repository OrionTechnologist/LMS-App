import React, {useEffect} from 'react';
import {Image, Share, Text, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';
import {useAppSelector, useAuth, useNavigationLayout} from '@/hooks';
import {
  clearGetReferredUsersActionResponse,
  getReferredUsersAction,
} from '@/redux/actions/httpActions';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {ReferredUsersSingleItem} from '@/types';
import {convertToNumber} from '@/utils';
import {EmptyPlaceholder} from '@/components/organisms/EmptyPlaceholder/EmptyPlaceholder';
import {ReferralUserItem} from '@/components/molecules/ReferredUserList/ReferralUserItem';
import {ReferralSummary} from '@/components/molecules/ReferredUserList/ReferralSummary';
import {APP} from '@/config/app.config';
import {ShareAppIcon} from '@/assets/icons';
import {useApplicationSettings} from '@/hooks/useApplicationSettings';

const ReferredUserList = () => {
  const {userData} = useAuth();
  const {websiteUrl} = useApplicationSettings();
  const {setLayoutRefreshHandler} = useNavigationLayout();
  const referredUserListHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_REFERRED_USERS];
  const referredUsersResult: ReferredUsersSingleItem =
    referredUserListHttpResponse?.data;
  const referredUsers = referredUsersResult?.result?.referred_users ?? [];
  const totalReferralEarnings = convertToNumber(
    referredUsersResult?.result?.total_referral_earning,
  );
  const totalSales = convertToNumber(referredUsersResult?.result?.total_sales);

  const copyReferralCode = () => {
    if (userData?.user_code) {
      Clipboard.setString(userData?.user_code);
      Toast.show(alertMessages.referCodeCopiedSuccess, Toast.SHORT);
    }
  };

  const shareApp = async () => {
    await Share.share({
      message: `Start earning with ease on ${APP.NAME} – Download the app today! ${websiteUrl}. \n\nAlso, here is my referral code, please join with this: ${userData?.user_code}`,
    });
  };

  const getReferredUsers = () => getReferredUsersAction();

  useEffect(() => {
    setLayoutRefreshHandler(getReferredUsers);
    getReferredUsers();
    return () => {
      clearGetReferredUsersActionResponse();
    };
  }, []);

  return (
    <>
      <View className={'mt-[25px]'}>
        <View className={'p-[22px] py-[0]'}>
          <TouchableOpacity
            className={
              'h-[79px] rounded-[10px] flex flex-col bg-[#7F1BC4] justify-center items-center'
            }
            onPress={copyReferralCode}
            activeOpacity={0.8}>
            <Text
              className={
                'text-white text-[12px] font-poppins-medium font-[600] opacity-[0.67]'
              }>
              Tap to copy referral code
            </Text>

            <Text
              className={
                'text-white text-[12px] mt-[3px] font-poppins-medium font-[700]'
              }>
              {userData?.user_code}
            </Text>
          </TouchableOpacity>

          <View className={'mt-[15px]'}>
            <ReferralSummary
              totalEarnings={totalReferralEarnings}
              totalSales={totalSales}
            />
          </View>

          <View
            className={'flex flex-row justify-between items-center mt-[30px]'}>
            <Text className={'text-black font-poppins-bold text-[15px]'}>
              Referral Users
            </Text>
            <TouchableOpacity
              className={
                'rounded-[10px] flex flex-row bg-[#7F1BC4] justify-center items-center p-[5px] px-[10px]'
              }
              onPress={shareApp}
              activeOpacity={0.8}>
              <Image
                source={ShareAppIcon}
                className={'w-[15px] h-[15px] mr-[5px]'}
              />
              <Text className={'text-white text-[12px] font-poppins-medium'}>
                Share {APP.NAME}
              </Text>
            </TouchableOpacity>
          </View>

          <View className={'mt-[10px]'}>
            {referredUserListHttpResponse?.success &&
              referredUsers?.length > 0 && (
                <>
                  {referredUsers?.map((item, index) => (
                    <ReferralUserItem key={index} data={item} />
                  ))}
                </>
              )}

            {referredUserListHttpResponse?.success &&
              referredUsers?.length === 0 && (
                <EmptyPlaceholder
                  type={'referral-users'}
                  label={'No Referral Users'}
                />
              )}
          </View>
        </View>
      </View>

      <ActionLoader
        show={referredUserListHttpResponse?.loading}
        label={'Loading'}
      />
    </>
  );
};

export {ReferredUserList};

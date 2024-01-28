import React from 'react';
import {Image, View} from 'react-native';
import {Button} from '@/components/atoms/Button';
import {Text} from 'react-native-paper';
import {routes} from '@/routes';
import {useNavigation} from '@react-navigation/native';
import {SuccessMarkIcon} from '@/assets/icons';
import {PrivateLayout} from '@/components/middlewares/auth';

const PackagePurchaseRequestSuccess = () => {
  // @ts-ignore
  const {replace} = useNavigation();

  const gotoDashboardPage = () =>
    replace(routes.private.dashboardScreen as never);

  return (
    <>
      <PrivateLayout>
        <View
          className={
            'bg-white flex flex-col flex-grow p-[18px] justify-center content-center items-center'
          }>
          <View className={'flex'}>
            <View
              className={'px-[40px] flex flex-col justify-center items-center'}>
              <Image
                source={SuccessMarkIcon}
                className={'w-[100px] h-[100px] mb-[35px]'}
              />
              <Text
                className={
                  'text-public-page-title text-[25px] font-[700] text-center'
                }>
                Payment Successful
              </Text>
              <Text
                className={
                  'text-public-page-subtitle text-[16px] font-[500] mt-[15px] text-center'
                }>
                Your request has been sent successfully. We will get back to you
                soon!
              </Text>
            </View>

            <View className={'flex flex-col gap-[15px] mt-[32px]'}>
              <View>
                <Button
                  title={'Back to Dashboard'}
                  onPress={gotoDashboardPage}
                />
              </View>
            </View>
          </View>
        </View>
      </PrivateLayout>
    </>
  );
};

export default PackagePurchaseRequestSuccess;

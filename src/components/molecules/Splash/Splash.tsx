import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Text} from 'react-native-paper';
import {SplashLogo} from '@/assets/images';
import {StatusBar} from '@/components/atoms/StatusBar';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';
import {AuthService} from '@/services/AuthService';
import {ActivityIndicator} from 'react-native-paper';
import {
  handleApplicationSettingsResponse,
  storeLoginData,
} from '@/redux/actions/httpActions';
import {apiClient, endpoints} from '@/api';
import {handleUnauthorizedError} from '@/exceptions';
import {alertMessages} from '@/config/alert-messages';
import {ApplicationSettings} from '@/types';
import {getFCMToken} from '@/utils/helpers';

const Splash = () => {
  // @ts-ignore
  const {navigate, replace} = useNavigation();
  const isFocused = useIsFocused();
  const [loginChecking, setLoginChecking] = useState(true);
  const [applicationSettingsLoading, setApplicationSettingsLoading] =
    useState(true);

  const gotoPricingListPage = () =>
    navigate(routes.public.pricingListScreen as never);
  const gotoRegisterPage = () =>
    navigate(routes.public.registerScreen as never);
  const gotoLoginPage = () => navigate(routes.public.loginScreen as never);
  const gotoDashboardPage = () =>
    replace(routes.private.dashboardScreen as never);

  const checkLogin = async () => {
    setLoginChecking(true);
    const token = await new AuthService().getToken();
    if (token && typeof (token as any) === 'string') {
      apiClient
        .get({
          url: endpoints.getAuthUserProfile,
        })
        .then(async ({data}) => {
          const userData = data;
          await storeLoginData({
            loggedIn: true,
            userData,
          });

          const deviceFcmToken = await getFCMToken();
          await apiClient
            .post({
              url: endpoints.registerDeviceFcmToken,
              data: {
                token: deviceFcmToken,
              },
            })
            .then(() => {})
            .catch(() => {
              Toast.show(
                alertMessages.deviceFcmTokenRegistrationFailed,
                Toast.LONG,
              );
            });

          gotoDashboardPage();
        })
        .catch(async e => {
          setLoginChecking(false);
          if (e?.response?.status === 401) {
            await handleUnauthorizedError(e);
            return;
          }

          if (!e?.response) {
            Toast.show(alertMessages.axiosNetworkError, Toast.LONG);
          }
        });
    } else {
      setLoginChecking(false);
    }
  };

  const loadApplicationSettings = async () => {
    setApplicationSettingsLoading(true);
    apiClient
      .get({
        url: endpoints.getApplicationSettings,
      })
      .then(async ({data}) => {
        setApplicationSettingsLoading(false);
        const applicationSettingsData: ApplicationSettings = data;
        handleApplicationSettingsResponse(applicationSettingsData);
      })
      .catch(async e => {
        setApplicationSettingsLoading(false);
        if (e?.response?.status === 401) {
          await handleUnauthorizedError(e);
          return;
        }

        if (!e?.response) {
          Toast.show(alertMessages.axiosNetworkError, Toast.LONG);
        }
      });
  };

  useEffect(() => {
    getFCMToken();
    loadApplicationSettings();
    checkLogin();
  }, [isFocused]);

  return (
    <>
      <StatusBar bgColor={'primary'} />
      <View className={'flex-grow bg-primary'}>
        <View className={'absolute w-full mt-[130px]'}>
          <Text
            className={
              'text-white text-[35px] font-poppins-medium text-center'
            }>
            U-Pay Earn
          </Text>
          <View className={'flex-grow items-center mt-[24px]'}>
            <Image source={SplashLogo} className={'w-[161px] h-[161px]'} />
          </View>
        </View>

        {loginChecking || applicationSettingsLoading ? (
          <View className={'absolute w-full bottom-[71px]'}>
            <View className={'flex justify-center items-center'}>
              <ActivityIndicator animating={true} color={'#ffffff'} />
            </View>
          </View>
        ) : (
          <View className={'absolute w-full bottom-[71px]'}>
            <View className={'flex flex-row w-[full] justify-center'}>
              <Text className={'text-white text-[15px] font-poppins-regular'}>
                Don't have an account?{' '}
              </Text>
              <Text
                className={'text-splash-link text-[15px] font-poppins-bold'}
                onPress={gotoRegisterPage}>
                Register Now
              </Text>
            </View>

            <View className={'flex flex-row w-[full] justify-center mt-[4px]'}>
              <Text className={'text-white text-[15px] font-poppins-regular'}>
                Explore our{' '}
              </Text>
              <Text
                className={'text-splash-link text-[15px] font-poppins-bold'}
                onPress={gotoPricingListPage}>
                plans{' '}
              </Text>
              <Text className={'text-white text-[15px] font-poppins-regular'}>
                or{' '}
              </Text>
              <Text
                className={'text-splash-link text-[15px] font-poppins-bold'}
                onPress={gotoLoginPage}>
                login
              </Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export {Splash};

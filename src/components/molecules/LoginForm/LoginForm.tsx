import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {BackArrowIconButton, Button} from '@/components/atoms/Button';
import {TextInput} from '@/components/atoms/TextInput';
import {useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';
import {useForm, Controller} from 'react-hook-form';
import {convertToBoolean, validateEmail} from '@/utils';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {useAppSelector} from '@/hooks';
import Toast from 'react-native-simple-toast';
import {
  clearLoginActionResponse,
  loginAction,
  storeLoginData,
} from '@/redux/actions/httpActions';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {getFCMToken} from '@/utils/helpers';
import {DeviceInfoService} from '@/services';

interface LoginFormData {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  // @ts-ignore
  const {navigate, replace, goBack, canGoBack} = useNavigation();
  const loginHttpResponses =
    useAppSelector(selectHttpState)[CORRELATION_IDS.LOGIN];

  const gotoInitialPage = () => replace(routes.global.initialScreen as never);

  const gotoSignUpOtpPage = (userId: number, userEmail: string) =>
    navigate(
      routes.public.signupOtpScreen as never,
      {
        userId,
        userEmail,
      } as never,
    );

  const gotoDashboardPage = () =>
    replace(routes.private.dashboardScreen as never);

  const gotoRegisterPage = () =>
    navigate(routes.public.registerScreen as never);

  const gotoForgotPasswordPage = () =>
    navigate(routes.public.forgotPasswordScreen as never);

  const handleClickBack = () => {
    if (canGoBack()) {
      goBack();
    } else {
      gotoInitialPage();
    }
  };

  const {
    control,
    formState: {errors},
    trigger,
    setValue,
    watch,
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      email: 'upayearn@gmail.com',
      password: '12345678',
    },
  });

  const formValues = watch();

  const submitLogin = async () => {
    const formIsValid = await trigger();
    if (formIsValid) {
      const deviceFcmToken = await getFCMToken();

      const deviceUniqueId = await DeviceInfoService.getUniqueId();
      const deviceBrand = await DeviceInfoService.getBrand();
      const deviceModel = await DeviceInfoService.getModel();
      const deviceName = await DeviceInfoService.getName();
      const deviceId = await DeviceInfoService.getId();
      const deviceAdditionalInfo = await DeviceInfoService.getAdditional();

      loginAction({
        email: formValues?.email,
        password: formValues?.password,
        device_fcm_token: deviceFcmToken as string,
        device_brand: deviceBrand,
        device_model: deviceModel,
        device_name: deviceName,
        device_id: deviceId,
        device_unique_id: deviceUniqueId,
        device_additional_info: deviceAdditionalInfo,
      });
    }
  };

  const setupAuthInfo = async () => {
    const token = loginHttpResponses?.data?.token;
    const userData = loginHttpResponses?.data?.user;

    if (convertToBoolean(userData?.email_verified)) {
      await storeLoginData({
        token,
        userData,
        loggedIn: true,
      });
      gotoDashboardPage();
    } else {
      gotoSignUpOtpPage(userData?.id, userData?.email);
    }
  };

  useEffect(() => {
    if (loginHttpResponses?.success) {
      setupAuthInfo();
      clearLoginActionResponse();
    }

    if (loginHttpResponses?.error) {
      Toast.show(loginHttpResponses?.error?.data?.message, Toast.LONG);
      clearLoginActionResponse();
    }
  }, [loginHttpResponses]);

  return (
    <>
      <View style={{flex: 1}} className={'bg-white'}>
        <ScrollView>
          <View
            className={' p-[22px] flex flex-col flex-grow gap-[28px] mt-[0px]'}>
            <View className={'flex'}>
              <BackArrowIconButton onPress={handleClickBack} />
            </View>
            <View className={'flex flex-col flex-grow'}>
              <View>
                <Text
                  className={'text-public-page-title text-[25px] font-[700]'}>
                  Welcome back! Glad to see you, Again!
                </Text>
              </View>

              <View className={'flex flex-col gap-[15px] mt-[32px]'}>
                <View>
                  <Controller
                    control={control}
                    name={'email'}
                    rules={{
                      required: 'Please enter your email',
                      validate(value) {
                        if (!validateEmail(value)) {
                          return 'Please enter a valid email address';
                        }

                        return true;
                      },
                    }}
                    render={({field}) => (
                      <TextInput
                        mode={'outlined'}
                        placeholder={'Enter your email'}
                        value={field?.value}
                        onChange={async text => {
                          await setValue('email', text);
                          await trigger('email');
                        }}
                        errorMessage={errors?.email?.message}
                      />
                    )}
                  />
                </View>
                <View>
                  <Controller
                    control={control}
                    name={'password'}
                    rules={{
                      required: 'Please enter your password',
                    }}
                    render={({field}) => (
                      <TextInput
                        mode={'outlined'}
                        placeholder={'Enter your password'}
                        value={field?.value}
                        onChange={async text => {
                          await setValue('password', text);
                          await trigger('password');
                        }}
                        errorMessage={errors?.password?.message}
                        type={'password'}
                      />
                    )}
                  />
                </View>
                <View className={'flex items-end mb-[10px]'}>
                  <Text
                    className={'text-primary text-[15px] font-poppins-medium'}
                    onPress={gotoForgotPasswordPage}>
                    Forgot Password?
                  </Text>
                </View>
                <View>
                  <Button
                    title={'Login'}
                    onPress={submitLogin}
                    disabled={loginHttpResponses?.loading}
                  />
                </View>
              </View>
            </View>
            <View className={'flex'}>
              <View className={'flex flex-row w-[full] justify-center'}>
                <Text
                  className={'text-[#1E232C] text-[15px] font-poppins-regular'}>
                  Don't have an account?{' '}
                </Text>
                <Text
                  className={'text-primary text-[15px] font-poppins-bold'}
                  onPress={gotoRegisterPage}>
                  Register Now
                </Text>
              </View>
            </View>
          </View>

          <ActionLoader
            show={loginHttpResponses?.loading}
            label={'Logging In'}
          />
        </ScrollView>
      </View>
    </>
  );
};

export {LoginForm};

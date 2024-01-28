import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Text} from 'react-native-paper';
import {BackArrowIconButton, Button} from '@/components/atoms/Button';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {routes} from '@/routes';
import {OtpForm} from '@/components/organisms/OtpForm';
import {
  clearRecoverPasswordActionResponse,
  recoverPasswordAction,
} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {alertMessages} from '@/config/alert-messages';
import Toast from 'react-native-simple-toast';

const ResetPasswordOTPForm = () => {
  // @ts-ignore
  const {goBack, replace} = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const userEmail = (route.params as any)?.userEmail;
  const [otpCode, setOtpCode] = useState('');

  const verifyDisabled = otpCode?.length < 4;

  const recoverPasswordHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.RECOVER_PASSWORD];

  const gotoResetPasswordPage = () => {
    if (!verifyDisabled) {
      replace(routes.public.resetPasswordScreen as never, {
        userEmail,
        otpCode,
      });
    }
  };

  const gotoForgotPasswordPage = () =>
    replace(routes.public.forgotPasswordScreen as never);

  const resendOtp = () => {
    recoverPasswordAction({
      email: userEmail,
    });
  };

  useEffect(() => {
    if (recoverPasswordHttpResponse?.success) {
      clearRecoverPasswordActionResponse();
      Alert.alert('Success', alertMessages?.recoverPasswordOtpSent);
    }

    if (recoverPasswordHttpResponse?.error) {
      Toast.show(alertMessages.recoverPasswordOtpSendingFailed, Toast.SHORT);
      clearRecoverPasswordActionResponse();
    }
  }, [recoverPasswordHttpResponse]);

  useEffect(() => {
    if (!userEmail) {
      gotoForgotPasswordPage();
    }
  }, [isFocused, userEmail]);

  return (
    <>
      <View
        className={
          'bg-white p-[22px] flex flex-col flex-grow gap-[28px] mt-[0px]'
        }>
        <View className={'flex'}>
          <BackArrowIconButton onPress={goBack} />
        </View>
        <View className={'flex flex-col flex-grow'}>
          <View>
            <Text className={'text-public-page-title text-[25px] font-[700]'}>
              OTP Verification
            </Text>
            <Text
              className={
                'text-public-page-subtitle text-[16px] font-[500] mt-[15px]'
              }>
              Enter the verification code we just sent on your email address.
            </Text>
          </View>

          <OtpForm onChange={value => setOtpCode(value)} />

          <View className={'mt-[40px]'}>
            <Button
              title={'Verify'}
              onPress={gotoResetPasswordPage}
              disabled={verifyDisabled}
            />
          </View>
        </View>
        <View className={'flex'}>
          <View className={'flex flex-row w-[full] justify-center'}>
            <Text className={'text-[#1E232C] text-[15px] font-poppins-regular'}>
              Didn't receive code?{' '}
            </Text>
            <Text
              className={'text-primary text-[15px] font-poppins-bold'}
              onPress={resendOtp}>
              Resend
            </Text>
          </View>
        </View>
      </View>

      <ActionLoader
        label={'Resending otp'}
        show={recoverPasswordHttpResponse?.loading}
      />
    </>
  );
};

export {ResetPasswordOTPForm};

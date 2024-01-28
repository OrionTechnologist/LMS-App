import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Text} from 'react-native-paper';
import {BackArrowIconButton, Button} from '@/components/atoms/Button';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {routes} from '@/routes';
import {OtpForm} from '@/components/organisms/OtpForm';
import {
  clearRecoverPasswordActionResponse,
  clearResendSignUpOtpActionResponse,
  clearVerifySignupOtpActionResponse,
  resendSignUpOtpAction,
  verifySignupOtpAction,
} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {alertMessages} from '@/config/alert-messages';
import Toast from 'react-native-simple-toast';
import {ActionLoader} from '@/components/atoms/ActionLoader';

const SignUpOTPForm = () => {
  // @ts-ignore
  const {goBack, replace} = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const userId = (route.params as any)?.userId;
  const userEmail = (route.params as any)?.userEmail;
  const [otpCode, setOtpCode] = useState('');

  const verifySignupOtpHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.VERIFY_SIGN_UP_OTP];

  const resendSignupOtpHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.RESEND_SIGN_UP_OTP];

  const gotoLoginPage = () => replace(routes.public.loginScreen as never);

  const verifyDisabled = otpCode?.length < 4;

  const submitOtpForm = () => {
    if (!verifyDisabled) {
      verifySignupOtpAction({
        user_id: userId,
        otp: otpCode,
      });
    }
  };

  const resendOtp = () => {
    if (userEmail) {
      resendSignUpOtpAction({
        email: userEmail,
      });
    }
  };

  useEffect(() => {
    if (resendSignupOtpHttpResponse?.success) {
      clearResendSignUpOtpActionResponse();
      Alert.alert('Success', alertMessages?.resendSignupOtpSent);
    }

    if (resendSignupOtpHttpResponse?.error) {
      Toast.show(alertMessages.resendSignupOtpSendingFailed, Toast.SHORT);
      clearResendSignUpOtpActionResponse();
    }
  }, [resendSignupOtpHttpResponse]);

  useEffect(() => {
    if (verifySignupOtpHttpResponse?.success) {
      Alert.alert('Success', alertMessages?.signUpOtpVerificationSuccess, [
        {
          text: 'Login Now',
          onPress() {
            gotoLoginPage();
          },
        },
      ]);
      clearVerifySignupOtpActionResponse();
    }

    if (verifySignupOtpHttpResponse?.error) {
      const errorMessages = verifySignupOtpHttpResponse?.error?.data?.messages;
      if (errorMessages) {
        if (errorMessages?.user_id) {
          Toast.show(errorMessages?.user_id[0], Toast.LONG);
        }
        if (errorMessages?.otp) {
          Toast.show(errorMessages?.otp[0], Toast.LONG);
        }
      } else if (verifySignupOtpHttpResponse?.error?.status === 401) {
        Toast.show(
          verifySignupOtpHttpResponse?.error?.data?.message,
          Toast.SHORT,
        );
      } else {
        Toast.show(alertMessages.signUpOtpVerificationFailed, Toast.SHORT);
      }
      clearVerifySignupOtpActionResponse();
    }
  }, [verifySignupOtpHttpResponse]);

  useEffect(() => {
    if (!userId) {
      gotoLoginPage();
    }
  }, [isFocused, userId]);

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
              Email Verification
            </Text>
            <Text
              className={
                'text-public-page-subtitle text-[16px] font-[500] mt-[15px]'
              }>
              Enter the verification code we just sent on your email address:{' '}
              <Text className={'font-bold text-[#000000]'}>{userEmail}</Text>.
            </Text>
          </View>

          <OtpForm onChange={value => setOtpCode(value)} />

          <View className={'mt-[40px]'}>
            <Button
              title={'Verify'}
              onPress={submitOtpForm}
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
        show={verifySignupOtpHttpResponse?.loading}
        label={'Verifying'}
      />

      <ActionLoader
        label={'Resending otp'}
        show={resendSignupOtpHttpResponse?.loading}
      />
    </>
  );
};

export {SignUpOTPForm};

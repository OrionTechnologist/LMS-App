import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {BackArrowIconButton, Button} from '@/components/atoms/Button';
import {TextInput} from '@/components/atoms/TextInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import {routes} from '@/routes';
import {Controller, useForm} from 'react-hook-form';
import {validatePassword} from '@/utils';
import {
  clearResetPasswordActionResponse,
  resetPasswordAction,
} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';
import {ActionLoader} from '@/components/atoms/ActionLoader';

interface ResetPasswordFormData {
  password: string;
  confirm_password: string;
}

const ResetPasswordForm = () => {
  // @ts-ignore
  const {navigate, goBack, replace} = useNavigation();
  const route = useRoute();
  const userEmail = (route.params as any)?.userEmail;
  const otpCode = (route.params as any)?.otpCode;

  const {
    setValue,
    watch,
    formState: {errors},
    trigger,
    control,
  } = useForm<ResetPasswordFormData>({
    mode: 'onChange',
  });

  const formValues = watch();

  const gotoResetPasswordSuccessPage = () =>
    replace(routes.public.resetPasswordSuccessScreen as never);
  const gotoLoginPage = () => navigate(routes.public.loginScreen as never);
  const gotoForgotPasswordPage = () =>
    replace(routes.public.forgotPasswordScreen as never);

  const resetPasswordHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.RESET_PASSWORD];

  const submitResetPasswordForm = async () => {
    const isFormValid = await trigger();

    if (isFormValid) {
      resetPasswordAction({
        email: userEmail,
        otp: otpCode,
        password: formValues?.password,
        confirm_password: formValues?.confirm_password,
      });
    }
  };

  useEffect(() => {
    if (resetPasswordHttpResponse?.success) {
      clearResetPasswordActionResponse();
      gotoResetPasswordSuccessPage();
    }

    if (resetPasswordHttpResponse?.error) {
      if (resetPasswordHttpResponse?.error?.status === 401) {
        Toast.show(
          resetPasswordHttpResponse?.error?.data?.message,
          Toast.SHORT,
        );
        gotoForgotPasswordPage();
      } else {
        Toast.show(alertMessages.resetPasswordFailed, Toast.SHORT);
      }
      clearResetPasswordActionResponse();
    }
  }, [resetPasswordHttpResponse]);

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
              Create new password
            </Text>
            <Text
              className={
                'text-public-page-subtitle text-[16px] font-[500] mt-[15px]'
              }>
              Your new password must be unique from those previously used.
            </Text>
          </View>

          <View className={'mt-[32px]'}>
            <View>
              <Controller
                control={control}
                name={'password'}
                rules={{
                  required: 'Please enter a new password',
                  validate(value) {
                    if (value && !validatePassword(value).passed) {
                      return 'Your password should have at least a character, digit, uppercase and minimum length should be 8 characters';
                    }

                    return true;
                  },
                }}
                render={({field}) => (
                  <TextInput
                    mode={'outlined'}
                    placeholder={'New Password'}
                    type={'password'}
                    value={field?.value}
                    onChange={async text => {
                      await setValue('password', text);
                      await trigger('password');
                    }}
                    errorMessage={errors?.password?.message}
                  />
                )}
              />
            </View>

            <View className={'mt-[10px]'}>
              <Controller
                control={control}
                name={'confirm_password'}
                rules={{
                  required: 'Please enter confirm password',
                  validate(value) {
                    if (
                      value &&
                      formValues?.password !== formValues?.confirm_password
                    ) {
                      return 'Passwords do not match';
                    }

                    return true;
                  },
                }}
                render={({field}) => (
                  <TextInput
                    mode={'outlined'}
                    placeholder={'Confirm Password'}
                    type={'password'}
                    value={field?.value}
                    onChange={async text => {
                      await setValue('confirm_password', text);
                      await trigger('confirm_password');
                    }}
                    errorMessage={errors?.confirm_password?.message}
                  />
                )}
              />
            </View>
            <View className={'mt-[40px]'}>
              <Button
                title={'Reset Password'}
                onPress={submitResetPasswordForm}
              />
            </View>
          </View>
        </View>
        <View className={'flex'}>
          <View className={'flex flex-row w-[full] justify-center'}>
            <Text className={'text-[#1E232C] text-[15px] font-poppins-regular'}>
              Go to{' '}
            </Text>
            <Text
              className={'text-primary text-[15px] font-poppins-bold'}
              onPress={gotoLoginPage}>
              Login
            </Text>
          </View>
        </View>
      </View>

      <ActionLoader
        show={resetPasswordHttpResponse?.loading}
        label={'Changing password'}
      />
    </>
  );
};

export {ResetPasswordForm};

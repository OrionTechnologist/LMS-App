import React, {useEffect} from 'react';
import {Alert, View} from 'react-native';
import {Text} from 'react-native-paper';
import {BackArrowIconButton, Button} from '@/components/atoms/Button';
import {TextInput} from '@/components/atoms/TextInput';
import {useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';
import {Controller, useForm} from 'react-hook-form';
import {validateEmail} from '@/utils';
import {
  clearRecoverPasswordActionResponse,
  recoverPasswordAction,
} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {alertMessages} from '@/config/alert-messages';
import Toast from 'react-native-simple-toast';
import {ActionLoader} from '@/components/atoms/ActionLoader';

interface ForgotPasswordFormProps {
  email: string;
}

const ForgotPasswordForm = () => {
  const {navigate, goBack} = useNavigation();
  const recoverPasswordHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.RECOVER_PASSWORD];

  const {
    control,
    formState: {errors},
    trigger,
    setValue,
    watch,
  } = useForm<ForgotPasswordFormProps>({
    mode: 'onChange',
    defaultValues: {
      email: 'upayearn@gmail.com',
    },
  });

  const formValues = watch();

  const gotoResetPasswordOtpPage = (userEmail: string) =>
    navigate(
      routes.public.resetPasswordOtpScreen as never,
      {
        userEmail,
      } as never,
    );
  const gotoLoginPage = () => navigate(routes.public.loginScreen as never);

  const submitRecoverPasswordForm = async () => {
    const formIsValid = await trigger();

    if (formIsValid) {
      recoverPasswordAction({
        email: formValues?.email,
      });
    }
  };

  useEffect(() => {
    if (recoverPasswordHttpResponse?.success) {
      clearRecoverPasswordActionResponse();

      Alert.alert('Success', alertMessages?.recoverPasswordOtpSent, [
        {
          text: 'Verify',
          onPress() {
            gotoResetPasswordOtpPage(formValues?.email);
          },
        },
      ]);
    }

    if (recoverPasswordHttpResponse?.error) {
      if (recoverPasswordHttpResponse?.error?.status === 401) {
        Toast.show(
          recoverPasswordHttpResponse?.error?.data.message,
          Toast.SHORT,
        );
      } else {
        Toast.show(alertMessages.recoverPasswordOtpSendingFailed, Toast.SHORT);
      }

      clearRecoverPasswordActionResponse();
    }
  }, [recoverPasswordHttpResponse]);

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
              Forgot Password?
            </Text>
            <Text
              className={
                'text-public-page-subtitle text-[16px] font-[500] mt-[15px]'
              }>
              Don't worry! It occurs. Please enter the email address linked with
              your account.
            </Text>
          </View>

          <View className={'mt-[32px]'}>
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
            <View className={'mt-[40px]'}>
              <Button title={'Send Code'} onPress={submitRecoverPasswordForm} />
            </View>
          </View>
        </View>
        <View className={'flex'}>
          <View className={'flex flex-row w-[full] justify-center'}>
            <Text className={'text-[#1E232C] text-[15px] font-poppins-regular'}>
              Remember Password?{' '}
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
        label={'Sending otp'}
        show={recoverPasswordHttpResponse?.loading}
      />
    </>
  );
};

export {ForgotPasswordForm};

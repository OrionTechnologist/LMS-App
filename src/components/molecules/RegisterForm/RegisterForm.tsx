import React, {useEffect} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {Checkbox, Text} from 'react-native-paper';
import {BackArrowIconButton, Button} from '@/components/atoms/Button';
import {TextInput} from '@/components/atoms/TextInput';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';
import {useForm, Controller} from 'react-hook-form';
import {
  convertToBoolean,
  validateEmail,
  validateName,
  validatePassword,
} from '@/utils';
import {
  clearSignUpActionResponse,
  signUpAction,
} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {PhoneNumberInput} from '@/components/atoms/PhoneNumberInput';
import {colors} from '@/config/colors';

interface RegisterFormData {
  first_name: string;
  last_name: string;
  phone: string;
  referral_code: string;
  email: string;
  password: string;
  confirm_password: string;
  terms_and_conditions_agreement: boolean;
}

const RegisterForm = () => {
  // @ts-ignore
  const {navigate, replace, goBack, canGoBack} = useNavigation();
  const isFocused = useIsFocused();
  const signUpHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.SIGN_UP];

  const gotoInitialPage = () => replace(routes.global.initialScreen as never);
  const gotoLoginPage = () => navigate(routes.public.loginScreen as never);
  const gotoTermsAndConditionsPage = () =>
    navigate(routes.public.termsAndConditionsScreen as never);
  const gotoSignUpOtpPage = (userId: number, userEmail: string) =>
    navigate(
      routes.public.signupOtpScreen as never,
      {
        userId,
        userEmail,
      } as never,
    );

  const handleClickBack = () => {
    if (canGoBack()) {
      goBack();
    } else {
      gotoInitialPage();
    }
  };

  const initialFormValues: RegisterFormData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    referral_code: '',
    password: '',
    confirm_password: '',
    terms_and_conditions_agreement: false,
  };

  const {
    formState: {errors},
    setValue,
    trigger,
    watch,
    control,
    setError,
    reset,
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: initialFormValues,
  });

  const formValues = watch();

  const submitRegistration = async () => {
    const formIsValid = await trigger();

    if (formIsValid) {
      signUpAction({
        first_name: formValues?.first_name,
        last_name: formValues?.last_name,
        email: formValues?.email,
        phone: formValues?.phone,
        referral_code: formValues?.referral_code,
        password: formValues?.password,
      });
    }
  };

  useEffect(() => {
    if (signUpHttpResponse?.success) {
      const userId = signUpHttpResponse?.data?.id;
      Alert.alert('Success', alertMessages?.signUpSuccess, [
        {
          text: 'Verify email',
          onPress() {
            gotoSignUpOtpPage(userId, formValues?.email);
          },
        },
      ]);
      clearSignUpActionResponse();
    }

    if (signUpHttpResponse?.error) {
      const errorMessages = signUpHttpResponse?.error?.data?.messages;
      if (errorMessages) {
        if (errorMessages?.phone) {
          setError('phone', {
            message: errorMessages?.phone[0],
          });
        }
        if (errorMessages?.email) {
          setError('email', {
            message: errorMessages?.email[0],
          });
        }
      } else {
        Toast.show(alertMessages.signUpFailed, Toast.SHORT);
      }
      clearSignUpActionResponse();
    }
  }, [signUpHttpResponse]);

  useEffect(() => {
    return () => {
      reset(initialFormValues);
    };
  }, [isFocused]);

  return (
    <>
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            className={
              'bg-white p-[22px] flex flex-col flex-grow gap-[28px] mt-[0px] mb-[0] pb-[40px]'
            }>
            <View className={'flex'}>
              <BackArrowIconButton onPress={handleClickBack} />
            </View>
            <View className={'flex flex-col'}>
              <View>
                <Text
                  className={'text-public-page-title text-[25px] font-[700]'}>
                  Hello! Register to get started
                </Text>
              </View>

              <View className={'flex flex-col gap-[15px] mt-[32px]'}>
                <View>
                  <Controller
                    control={control}
                    name={'first_name'}
                    rules={{
                      required: 'Please enter first name',
                      validate(value) {
                        if (!validateName(value)) {
                          return 'Special characters are not allowed';
                        }

                        return true;
                      },
                    }}
                    render={({field}) => (
                      <TextInput
                        mode={'outlined'}
                        placeholder={'First Name'}
                        value={field?.value}
                        onChange={async text => {
                          await setValue('first_name', text);
                          await trigger('first_name');
                        }}
                        errorMessage={errors?.first_name?.message}
                      />
                    )}
                  />
                </View>
                <View>
                  <Controller
                    control={control}
                    name={'last_name'}
                    rules={{
                      required: 'Please enter last name',
                      validate(value) {
                        if (!validateName(value)) {
                          return 'Special characters are not allowed';
                        }

                        return true;
                      },
                    }}
                    render={({field}) => (
                      <TextInput
                        mode={'outlined'}
                        placeholder={'Last Name'}
                        value={field?.value}
                        onChange={async text => {
                          await setValue('last_name', text);
                          await trigger('last_name');
                        }}
                        errorMessage={errors?.last_name?.message}
                      />
                    )}
                  />
                </View>
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
                        placeholder={'Email'}
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
                    name={'phone'}
                    rules={{
                      required: 'Please enter your phone',
                    }}
                    render={({field}) => (
                      <PhoneNumberInput
                        placeholder={'Phone Number'}
                        defaultCountryCode={'US'}
                        value={field?.value}
                        onChange={async value => {
                          await setValue('phone', value);
                          await trigger('phone');
                        }}
                        errorMessage={errors?.phone?.message}
                      />
                    )}
                  />
                </View>
                <View>
                  <Controller
                    control={control}
                    name={'referral_code'}
                    render={({field}) => (
                      <TextInput
                        mode={'outlined'}
                        placeholder={'Referral Code'}
                        value={field?.value}
                        onChange={async text => {
                          await setValue('referral_code', text);
                          await trigger('referral_code');
                        }}
                        errorMessage={errors?.referral_code?.message}
                      />
                    )}
                  />
                </View>
                <View>
                  <Controller
                    control={control}
                    name={'password'}
                    rules={{
                      required: 'Please enter a password',
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
                        placeholder={'Password'}
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
                <View>
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

                <View>
                  <View className={'flex flex-row w-[full]'}>
                    <Controller
                      control={control}
                      name={'terms_and_conditions_agreement'}
                      rules={{
                        validate(value) {
                          if (!convertToBoolean(value)) {
                            return 'You must agree to our terms and conditions.';
                          }
                          return true;
                        },
                      }}
                      render={() => (
                        <Checkbox
                          color={colors.primary}
                          status={
                            formValues?.terms_and_conditions_agreement
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() =>
                            setValue(
                              'terms_and_conditions_agreement',
                              !formValues?.terms_and_conditions_agreement,
                            )
                          }
                        />
                      )}
                    />
                    <View className={'flex-grow w-[80%]'}>
                      <Text
                        className={
                          'text-[#1E232C] text-[13px] font-poppins-regular'
                        }>
                        By clicking register button you agree to our{' '}
                        <Text
                          className={
                            'text-primary text-[13px] font-poppins-bold'
                          }
                          onPress={gotoTermsAndConditionsPage}>
                          Terms & Conditions
                        </Text>
                      </Text>
                    </View>
                  </View>

                  {errors?.terms_and_conditions_agreement && (
                    <Text className={'text-[#ff4d4d] mt-[2px] text-[13px]'}>
                      {errors?.terms_and_conditions_agreement?.message}
                    </Text>
                  )}
                </View>

                <View>
                  <Button
                    title={'Register'}
                    onPress={submitRegistration}
                    disabled={signUpHttpResponse?.loading}
                  />
                </View>
              </View>

              <View className={'flex mt-[38px]'}>
                <View className={'flex flex-row w-[full] justify-center'}>
                  <Text
                    className={
                      'text-[#1E232C] text-[15px] font-poppins-regular'
                    }>
                    Already have an account?{' '}
                  </Text>
                  <Text
                    className={'text-primary text-[15px] font-poppins-bold'}
                    onPress={gotoLoginPage}>
                    Login Now
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <ActionLoader show={signUpHttpResponse?.loading} label={'Signing Up'} />
    </>
  );
};

export {RegisterForm};

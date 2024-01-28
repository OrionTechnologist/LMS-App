import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {LoginOrRegisterCurveBg} from '@/assets/images';
import {ProfileAvatar} from '@/components/atoms/ProfileAvatar';
import {Controller, useForm} from 'react-hook-form';
import {validateEmail, validateName, validatePassword} from '@/utils';
import {TextInput} from '@/components/atoms/TextInput';
import {BackArrowIconButton, Button} from '@/components/atoms/Button';
import {
  changePasswordAction,
  clearChangePasswordActionResponse,
  clearUpdateAuthUserProfileActionResponse,
  clearUploadFileActionResponse,
  storeLoginData,
  updateAuthUserProfileAction,
  uploadFileAction,
} from '@/redux/actions/httpActions';
import {useAppSelector, useAuth} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';
import {openImageViewerAction} from '@/redux/actions/globalActions';
import {DeviceInfoService, ImagePicker} from '@/services';
import {generateShortName} from '@/utils';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {FileUploadResponse} from '@/types';

interface RegisterFormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  current_password: string;
  password: string;
  confirm_password: string;
  profile_photo: string | undefined | null;
}

const EditProfileForm = () => {
  // @ts-ignore
  const {replace, goBack, canGoBack} = useNavigation();
  const {userData} = useAuth();
  const screenWidth = Dimensions.get('window').width;
  const updateProfileHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.UPDATE_AUTH_USER_PROFILE];
  const changePasswordHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.CHANGE_PASSWORD];
  const fileUploadHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.UPLOAD_FILE];

  const [profilePhotoPreviewUrl, setProfilePhotoPreviewUrl] = useState<
    string | undefined | null
  >(null);

  const initialFormValues: RegisterFormData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    current_password: '',
    password: '',
    confirm_password: '',
    profile_photo: null,
  };

  const {
    formState: {errors},
    setValue,
    trigger,
    watch,
    control,
    reset,
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: initialFormValues,
  });

  const formValues = watch();

  const profileShortName = generateShortName(
    formValues?.first_name,
    formValues?.last_name,
  );

  const gotoInitialPage = () => replace(routes.global.initialScreen as never);

  const handleClickBack = () => {
    if (canGoBack()) {
      goBack();
    } else {
      gotoInitialPage();
    }
  };

  const submitProfile = async () => {
    const formIsValid = await trigger([
      'first_name',
      'last_name',
      'email',
      'phone',
    ]);

    if (formIsValid) {
      updateAuthUserProfileAction({
        first_name: formValues?.first_name,
        last_name: formValues?.last_name,
        email: formValues?.email,
        phone: formValues?.phone,
        profile_photo: formValues?.profile_photo ?? undefined,
      });
    }
  };

  const changePassword = async () => {
    const formIsValid = await trigger([
      'current_password',
      'password',
      'confirm_password',
    ]);

    if (formIsValid) {
      const deviceUniqueId = await DeviceInfoService.getUniqueId();

      changePasswordAction({
        current_password: formValues?.current_password,
        password: formValues?.password,
        confirm_password: formValues?.confirm_password,
        device_unique_id: deviceUniqueId,
      });
    }
  };

  const handleChangePicture = async () => {
    const {files, error} = await ImagePicker.openImagePicker({
      selectionLimit: 1,
    });
    if (!error && files?.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      uploadFileAction(formData);
    }
  };

  useEffect(() => {
    if (changePasswordHttpResponse?.success) {
      clearChangePasswordActionResponse();
      reset({
        current_password: '',
        password: '',
        confirm_password: '',
      });
      Toast.show(alertMessages.passwordChangeSuccess, Toast.SHORT);
    }

    if (changePasswordHttpResponse?.error) {
      clearChangePasswordActionResponse();
      if (changePasswordHttpResponse?.error?.status === 422) {
        Toast.show(
          changePasswordHttpResponse?.error?.data?.message ??
            alertMessages.passwordChangeFailed,
          Toast.SHORT,
        );
      } else {
        Toast.show(alertMessages.passwordChangeFailed, Toast.SHORT);
      }
    }
  }, [changePasswordHttpResponse]);

  useEffect(() => {
    if (updateProfileHttpResponse?.success) {
      clearUpdateAuthUserProfileActionResponse();
      storeLoginData({shouldReloadUserData: true});
      Toast.show(alertMessages.profileUpdateSuccess, Toast.SHORT);
    }

    if (updateProfileHttpResponse?.error) {
      clearUpdateAuthUserProfileActionResponse();
      Toast.show(alertMessages.profileUpdateFailed, Toast.SHORT);
    }
  }, [updateProfileHttpResponse]);

  useEffect(() => {
    if (fileUploadHttpResponse?.success) {
      clearUploadFileActionResponse();
      const response: FileUploadResponse = fileUploadHttpResponse?.data;
      const url = response?.file_path ?? '';
      const previewUrl = response?.file_path_preview ?? '';

      setValue('profile_photo', url);
      setProfilePhotoPreviewUrl(previewUrl);
    }

    if (fileUploadHttpResponse?.error) {
      clearUploadFileActionResponse();
      Toast.show(alertMessages.photoUploadFailed, Toast.SHORT);
    }
  }, [fileUploadHttpResponse]);

  useEffect(() => {
    setValue('first_name', userData?.first_name ?? '');
    setValue('last_name', userData?.last_name ?? '');
    setValue('email', userData?.email ?? '');
    setValue('phone', userData?.phone ?? '');
    setProfilePhotoPreviewUrl(userData?.profile_photo);
  }, [userData]);

  return (
    <>
      <View className={'flex-grow flex flex-col'}>
        <View className={'flex relative h-[260px]'}>
          <Image
            source={LoginOrRegisterCurveBg}
            className={'absolute bottom-[0]'}
            style={{width: screenWidth}}
            resizeMethod={'auto'}
          />

          <View className={'absolute top-[70px] left-[0] right-[0]'}>
            <View className={'w-full relative'}>
              <View className={'flex absolute z-[1] top-[-4px] left-[22px]'}>
                <BackArrowIconButton
                  bgColor={'white'}
                  onPress={handleClickBack}
                />
              </View>

              <Text
                className={
                  'text-white text-[22px] font-poppins-medium text-center'
                }>
                Edit Profile
              </Text>
              <View className={'flex-grow items-center mt-[43px]'}>
                <ProfileAvatar
                  size={161}
                  src={profilePhotoPreviewUrl}
                  strokeColor={'light-primary'}
                  alt={profileShortName}
                  onPress={() => {
                    if (profilePhotoPreviewUrl) {
                      openImageViewerAction({
                        images: [{uri: profilePhotoPreviewUrl}],
                      });
                    }
                  }}
                  notPressAble={!profilePhotoPreviewUrl}
                />
                <TouchableOpacity
                  className={
                    'mt-[9px] bg-primary rounded-[8px] p-[5px] px-[15px]'
                  }
                  activeOpacity={0.6}
                  onPress={handleChangePicture}>
                  <Text
                    className={
                      'font-poppins-medium text-[14px] text-[#ffffff]'
                    }>
                    Change Picture
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className={'mt-[140px] mb-[30px] px-[22px]'}>
          <View>
            <View className={'mb-[10px]'}>
              <Text className={'font-poppins-bold text-[#000000]'}>
                Basic Information
              </Text>
            </View>
            <View className={'flex flex-col gap-[15px]'}>
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
                      disabled={true}
                      mode={'outlined'}
                      placeholder={'Email'}
                      value={field?.value}
                      // onChange={async text => {
                      //   await setValue('email', text);
                      //   await trigger('email');
                      // }}
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
                    <TextInput
                      mode={'outlined'}
                      placeholder={'Phone Number'}
                      value={field?.value}
                      disabled={true}
                      // onChange={async text => {
                      //   await setValue('phone', text);
                      //   await trigger('phone');
                      // }}
                      errorMessage={errors?.phone?.message}
                    />
                  )}
                />
              </View>
              <View>
                <Button
                  title={'Save'}
                  onPress={submitProfile}
                  disabled={updateProfileHttpResponse?.loading}
                />
              </View>
            </View>
          </View>

          <View className={'mt-[50px]'}>
            <View className={'mb-[10px]'}>
              <Text className={'font-poppins-bold text-[#000000]'}>
                Privacy & Security
              </Text>
            </View>
            <View className={'flex flex-col gap-[15px]'}>
              <View>
                <Controller
                  control={control}
                  name={'current_password'}
                  rules={{
                    required: 'Please enter current password',
                  }}
                  render={({field}) => (
                    <TextInput
                      mode={'outlined'}
                      placeholder={'Current Password'}
                      type={'password'}
                      value={field?.value}
                      onChange={async text => {
                        await setValue('current_password', text);
                        await trigger('current_password');
                      }}
                      errorMessage={errors?.current_password?.message}
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
                <Button
                  title={'Change Password'}
                  onPress={changePassword}
                  disabled={changePasswordHttpResponse?.loading}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <ActionLoader
        show={fileUploadHttpResponse?.loading}
        label={'Uploading'}
      />
      <ActionLoader
        show={updateProfileHttpResponse?.loading}
        label={'Updating'}
      />
      <ActionLoader
        show={changePasswordHttpResponse?.loading}
        label={'Changing'}
      />
    </>
  );
};

export {EditProfileForm};

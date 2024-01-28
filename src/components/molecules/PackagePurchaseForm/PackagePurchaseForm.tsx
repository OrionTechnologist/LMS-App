import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import {SplashLogo} from '@/assets/images';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';
import {BinanceLogo} from '@/components/organisms/BinanceLogo';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from '@/components/atoms/TextInput';
import {UploadPicker} from '@/components/organisms/ImageUploadPicker';
import {Button} from '@/components/atoms/Button';
import {openImageViewerAction} from '@/redux/actions/globalActions';
import {useAppSelector, useAuth} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {
  clearSendPackagePurchaseRequestActionResponse,
  sendPackagePurchaseRequestAction,
} from '@/redux/actions/httpActions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {routes} from '@/routes';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {useApplicationSettings} from '@/hooks/useApplicationSettings';

interface PackagePurchaseFormData {
  transaction_id: string;
  package_id: string;
  referral_code: string | null;
  attached_image: string | null;
}

const PackagePurchaseForm = () => {
  // @ts-ignore
  const {replace} = useNavigation();
  const route = useRoute();
  const {paymentMethod, paymentMethodAccountNo} = useApplicationSettings();
  const {userData} = useAuth();

  const packageId = (route.params as any)?.packageId;

  const [screenshotPreviewUrl, setScreenshotPreviewUrl] = useState<
    string | null
  >(null);

  const sendPackagePurchaseRequestHttpResponse =
    useAppSelector(selectHttpState)[
      CORRELATION_IDS.SEND_PACKAGE_PURCHASE_REQUEST
    ];

  const initialFormValues: PackagePurchaseFormData = {
    transaction_id: '',
    referral_code: '',
    package_id: '',
    attached_image: '',
  };

  const {
    formState: {errors},
    setValue,
    trigger,
    watch,
    control,
    setError,
  } = useForm<PackagePurchaseFormData>({
    mode: 'onChange',
    defaultValues: initialFormValues,
  });

  const formValues = watch();

  const gotoPackagePurchaseSuccessPage = () =>
    replace(routes.private.packagePurchaseSuccessScreen as never);

  const copyPaymentId = () => {
    if (paymentMethodAccountNo) {
      Clipboard.setString(paymentMethodAccountNo);
      Toast.show(alertMessages.paymentIdCopiedSuccess, Toast.SHORT);
    }
  };

  const sendPurchaseRequest = async () => {
    const formIsValid = await trigger();

    if (formIsValid) {
      sendPackagePurchaseRequestAction({
        package_id: formValues?.package_id,
        transaction_id: formValues?.transaction_id,
        referral_code: formValues?.referral_code,
        attached_image: formValues?.attached_image,
      });
    }
  };

  useEffect(() => {
    if (sendPackagePurchaseRequestHttpResponse?.success) {
      clearSendPackagePurchaseRequestActionResponse();
      gotoPackagePurchaseSuccessPage();
    }

    if (sendPackagePurchaseRequestHttpResponse?.error) {
      const error = sendPackagePurchaseRequestHttpResponse?.error;
      clearSendPackagePurchaseRequestActionResponse();

      if (error?.status === 422) {
        if (error?.data?.messages?.package_id) {
          Alert.alert(
            'Invalid Package',
            error?.data?.messages?.package_id[0] ??
              alertMessages?.wrongPackageSelection,
          );
        }

        if (error?.data?.messages?.transaction_id) {
          setError('transaction_id', {
            message: error?.data?.messages?.transaction_id[0],
          });
        }

        if (error?.data?.messages?.referral_code) {
          setError('referral_code', {
            message: error?.data?.messages?.referral_code[0],
          });
        }

        if (error?.data?.messages?.attached_image) {
          setError('attached_image', {
            message: error?.data?.messages?.attached_image[0],
          });
        }
      } else {
        Toast.show(alertMessages?.packagePurchaseRequestFailed, Toast.LONG);
      }
    }
  }, [sendPackagePurchaseRequestHttpResponse]);

  useEffect(() => {
    setValue('referral_code', userData?.package_referral_code ?? '');
  }, [userData]);

  useEffect(() => {
    if (packageId) {
      setValue('package_id', packageId);
    }
  }, [packageId]);

  return (
    <>
      <View className={'mt-[38px]'}>
        <View className={'p-[22px] py-[0]'}>
          <TouchableOpacity
            className={
              'p-[20px] rounded-[16px] flex flex-col bg-[#4E1174] justify-center items-center'
            }
            onPress={copyPaymentId}
            activeOpacity={0.8}>
            <Image
              source={SplashLogo}
              className={
                'h-[65px] w-[65px] border border-[#9771E8] border-[4px] rounded-full'
              }
            />

            <Text
              className={
                'text-white mt-[10px] text-[16px] font-poppins-medium font-[500]'
              }>
              U-Pay Payment ID
            </Text>

            {paymentMethod === 'BINANCE' && (
              <View
                className={'mt-[15px] flex justify-center items-center w-full'}>
                <BinanceLogo />
              </View>
            )}

            <Text
              className={
                'text-white mt-[6px] text-[16px] font-poppins-medium font-[700]'
              }>
              {paymentMethodAccountNo}
            </Text>
          </TouchableOpacity>

          <View className={'mt-[34px]'}>
            <View className={'flex flex-col gap-[15px]'}>
              <View>
                <Controller
                  control={control}
                  name={'transaction_id'}
                  rules={{
                    required: 'Please enter transaction id',
                  }}
                  render={({field}) => (
                    <TextInput
                      mode={'outlined'}
                      placeholder={'Transaction Id'}
                      value={field?.value}
                      onChange={async text => {
                        await setValue('transaction_id', text);
                        await trigger('transaction_id');
                      }}
                      errorMessage={errors?.transaction_id?.message}
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
                  name={'attached_image'}
                  rules={{
                    required: 'Please attach screenshot of the transaction',
                  }}
                  render={() => (
                    <UploadPicker
                      label={'Upload Screenshot'}
                      onUploadSuccess={async (fileUrl, previewUrl) => {
                        setValue('attached_image', fileUrl);
                        setScreenshotPreviewUrl(previewUrl);
                        await trigger('attached_image');
                      }}
                      errorMessage={errors?.attached_image?.message}
                    />
                  )}
                />
              </View>
            </View>
          </View>

          {screenshotPreviewUrl && (
            <View className={'mt-[25px]'}>
              <TouchableOpacity
                onPress={() => {
                  if (screenshotPreviewUrl) {
                    openImageViewerAction({
                      images: [{uri: screenshotPreviewUrl}],
                    });
                  }
                }}
                activeOpacity={0.8}>
                <ImageBackground
                  source={{
                    uri: screenshotPreviewUrl,
                  }}
                  className={'h-[150px] rounded-[8px] w-full'}
                  resizeMode={'cover'}
                  imageStyle={{
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                className={
                  'bg-red-600 p-[6px] flex justify-center items-center'
                }
                style={{
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
                activeOpacity={0.8}
                onPress={() => {
                  setValue('attached_image', null);
                  setScreenshotPreviewUrl(null);
                }}>
                <Text className={'text-white font-poppins-medium text-[16px]'}>
                  Remove screenshot
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View className={'mt-[25px]'}>
            <Button
              title={'Submit'}
              onPress={sendPurchaseRequest}
              disabled={sendPackagePurchaseRequestHttpResponse?.loading}
            />
          </View>
        </View>
      </View>

      <ActionLoader
        show={sendPackagePurchaseRequestHttpResponse?.loading}
        label={'Sending request'}
      />
    </>
  );
};

export {PackagePurchaseForm};

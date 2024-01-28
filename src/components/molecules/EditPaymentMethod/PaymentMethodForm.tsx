import React, {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from '@/components/atoms/TextInput';
import {Button} from '@/components/atoms/Button';
import {
  clearUpdatePaymentMethodResponse,
  storeLoginData,
  updatePaymentMethodAction,
} from '@/redux/actions/httpActions';
import {useAppSelector, useAuth} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';
import {BinanceLogo} from '@/components/organisms/BinanceLogo';
import {useApplicationSettings} from '@/hooks/useApplicationSettings';

interface PaymentMethodFormData {
  transactionId: string;
}

const PaymentMethodForm = () => {
  const {userData} = useAuth();
  const {paymentMethod} = useApplicationSettings();
  const {
    formState: {errors},
    setValue,
    trigger,
    watch,
    control,
    setError,
  } = useForm<PaymentMethodFormData>({
    mode: 'onChange',
  });

  const formValues = watch();

  const updatePaymentMethodHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.UPDATE_PAYMENT_METHOD];

  const submitForm = async () => {
    const formIsValid = await trigger();

    if (formIsValid) {
      updatePaymentMethodAction({
        transaction_id: formValues?.transactionId,
      });
    }
  };

  useEffect(() => {
    if (updatePaymentMethodHttpResponse?.success) {
      clearUpdatePaymentMethodResponse();
      storeLoginData({shouldReloadUserData: true});
      Alert.alert('Success', alertMessages?.updatePaymentMethodSuccess);
    }

    if (updatePaymentMethodHttpResponse?.error) {
      const errorMessages =
        updatePaymentMethodHttpResponse?.error?.data?.messages;
      if (errorMessages) {
        if (errorMessages?.transaction_id) {
          setError('transactionId', {
            message: errorMessages?.transaction_id[0],
          });
        }
      } else {
        Toast.show(alertMessages.updatePaymentMethodFailed, Toast.SHORT);
      }
      clearUpdatePaymentMethodResponse();
    }
  }, [updatePaymentMethodHttpResponse]);

  useEffect(() => {
    if (userData) {
      setValue('transactionId', userData?.transaction_account_no ?? '');
    }
  }, [userData]);

  return (
    <>
      <View className={'mt-[22px]'}>
        <View className={'p-[22px] py-[0]'}>
          <View
            className={
              'bg-[#e9e9e9] rounded-[10px] p-[20px] flex flex-col justify-center items-center'
            }>
            <Text className={'text-black text-[20px] font-poppins-medium'}>
              We accept
            </Text>
            {paymentMethod === 'BINANCE' && (
              <View className={'mt-[10px]'}>
                <BinanceLogo
                  style={{
                    height: 40,
                    width: 120,
                  }}
                />
              </View>
            )}
          </View>

          <View className={'mt-[40px] mb-[20px]'}>
            <Text
              className={
                'text-poppins-medium text-[16px] text-black font-poppins-medium'
              }>
              Transaction Id
            </Text>
            <Controller
              control={control}
              name={'transactionId'}
              rules={{
                required: 'Please enter transaction id',
              }}
              render={({field}) => (
                <TextInput
                  mode={'outlined'}
                  placeholder={'Transaction Id'}
                  value={field?.value}
                  onChange={async text => {
                    await setValue('transactionId', text);
                    await trigger('transactionId');
                  }}
                  errorMessage={errors?.transactionId?.message}
                />
              )}
            />
          </View>

          <View>
            <Button
              title={'Save'}
              onPress={submitForm}
              disabled={updatePaymentMethodHttpResponse?.loading}
            />
          </View>
        </View>
      </View>

      <ActionLoader
        show={updatePaymentMethodHttpResponse?.loading}
        label={'Loading'}
      />
    </>
  );
};

export {PaymentMethodForm};

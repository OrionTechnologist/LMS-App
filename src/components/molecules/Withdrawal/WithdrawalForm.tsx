import React, {useEffect, useState} from 'react';
import {BalanceCard} from '@/components/molecules/BalanceCard';
import {Alert, TouchableOpacity, View} from 'react-native';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {AmountRadioChip} from '@/components/molecules/Withdrawal/AmountRadioChip';
import {TextInput} from '@/components/atoms/TextInput';
import {Button} from '@/components/atoms/Button';
import {
  clearSendWithdrawalRequestActionResponse,
  sendWithdrawalRequestAction,
} from '@/redux/actions/httpActions';
import {convertToNumber} from '@/utils';
import {useAppSelector, useAuth} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';
import {EmptyPlaceholder} from '@/components/organisms/EmptyPlaceholder/EmptyPlaceholder';

const WithdrawalForm = () => {
  const {userData} = useAuth();
  const {navigate} = useNavigation();
  const userBalanceAmount = convertToNumber(userData?.balance);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [transactionId, setTransactionId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const userHasPackage = convertToNumber(userData?.package_id) > 0;

  const gotoPlansPage = () => navigate(routes.private.pricingScreen as never);

  const gotoPaymentMethodPage = () =>
    navigate(routes.private.paymentMethodEditScreen as never);

  const sendWithdrawalRequestHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.SEND_WITHDRAWAL_REQUEST];
  const loading = sendWithdrawalRequestHttpResponse?.loading;

  const requestSubmitEnabled =
    convertToNumber(selectedAmount) <= userBalanceAmount;

  const sendWithdrawRequest = () => {
    if (!selectedAmount) {
      Alert.alert('Error', 'Please select amount');
      return;
    }

    if (transactionId?.trim() === '') {
      Alert.alert('Error', 'Please enter transaction id');
      return;
    }

    if (password === '') {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    sendWithdrawalRequestAction({
      amount: convertToNumber(selectedAmount),
      transaction_id: transactionId,
      password,
    });
  };

  useEffect(() => {
    if (sendWithdrawalRequestHttpResponse?.success) {
      clearSendWithdrawalRequestActionResponse();
      setSelectedAmount(null);
      setPassword('');
    }

    if (sendWithdrawalRequestHttpResponse?.error) {
      console.log(
        'sendWithdrawalRequestHttpResponse',
        sendWithdrawalRequestHttpResponse?.error,
      );
      Alert.alert(
        'Withdrawal Request Failed',
        sendWithdrawalRequestHttpResponse?.error?.data?.message ??
          sendWithdrawalRequestHttpResponse?.error?.data?.error ??
          'Failed to send withdraw request!',
      );
      clearSendWithdrawalRequestActionResponse();
    }
  }, [sendWithdrawalRequestHttpResponse]);

  useEffect(() => {
    if (userData) {
      setTransactionId(userData?.transaction_account_no ?? '');
    }
  }, [userData]);

  return (
    <>
      <View className={'mt-[38px]'}>
        <View className={'p-[22px] py-[0]'}>
          <BalanceCard hideWithDrawButton={true} />

          {userHasPackage ? (
            <View className={'mt-[42px]'}>
              <Text
                className={'text-[#000000] font-poppins-medium text-[14px]'}>
                Select Withdrawal Amount
              </Text>

              <View className={'flex flex-row flex-wrap items-center'}>
                <AmountRadioChip
                  withdrawAmount={10}
                  withdrawCharge={1}
                  checked={selectedAmount === 10}
                  onSelect={setSelectedAmount}
                />
                <AmountRadioChip
                  withdrawAmount={30}
                  withdrawCharge={2}
                  checked={selectedAmount === 30}
                  onSelect={setSelectedAmount}
                />
                <AmountRadioChip
                  withdrawAmount={50}
                  withdrawCharge={3}
                  checked={selectedAmount === 50}
                  onSelect={setSelectedAmount}
                />
                <AmountRadioChip
                  withdrawAmount={100}
                  withdrawCharge={0}
                  checked={selectedAmount === 100}
                  onSelect={setSelectedAmount}
                />
              </View>

              <View className={'mt-[10px]'}>
                <Text
                  className={'text-[#000000] font-poppins-medium text-[14px]'}>
                  Transaction ID -{' '}
                  <Text
                    className={'text-primary font-poppins-bold'}
                    onPress={gotoPaymentMethodPage}>
                    Edit
                  </Text>
                </Text>
                <TextInput
                  mode={'outlined'}
                  placeholder={'Transaction Id'}
                  value={transactionId}
                  disabled={true}
                  // onChange={text => setTransactionId(text)}
                />

                <Text
                  className={
                    'text-[#000000] font-poppins-medium text-[14px] mt-[20px]'
                  }>
                  Password
                </Text>
                <TextInput
                  mode={'outlined'}
                  placeholder={'Password'}
                  value={password}
                  type={'password'}
                  onChange={text => setPassword(text)}
                />
              </View>

              <View className={'mt-[36px]'}>
                <Text
                  className={'font-poppins-medium text-[#2D3748] text-[14px]'}>
                  * Every withdraws 72 Hour gap
                </Text>
              </View>

              <View className={'mt-[22px] mb-[20px]'}>
                {convertToNumber(selectedAmount) > 0 ? (
                  <>
                    {requestSubmitEnabled ? (
                      <Button
                        title={'Submit'}
                        onPress={sendWithdrawRequest}
                        disabled={loading}
                      />
                    ) : (
                      <Text
                        className={
                          'font-poppins-medium text-[15px] text-[#FF0110] text-center'
                        }>{`You don't have sufficient balance to withdraw the selected amount`}</Text>
                    )}
                  </>
                ) : (
                  <Text
                    className={
                      'font-poppins-medium text-[15px] text-[#FF0110] text-center'
                    }>
                    Select an amount to withdraw
                  </Text>
                )}
              </View>
            </View>
          ) : (
            <View className={'mt-[20px]'}>
              <EmptyPlaceholder
                containerStyle={{
                  height: 'auto',
                }}
                label={
                  <View
                    className={'flex flex-col items-center w-[90%] mt-[20px]'}>
                    <Text className={'font-poppins-medium'}>
                      You have to purchase a package first to withdraw your
                      balance.
                    </Text>
                    <TouchableOpacity
                      className={'bg-primary mt-[20px] p-[10px] rounded-[10px]'}
                      activeOpacity={0.8}
                      onPress={gotoPlansPage}>
                      <Text
                        className={
                          'font-poppins-medium text-white text-[14px]'
                        }>
                        Purchase
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
                type={'alert'}
              />
            </View>
          )}
        </View>
      </View>

      <ActionLoader show={loading} label={'Loading'} />
    </>
  );
};

export {WithdrawalForm};

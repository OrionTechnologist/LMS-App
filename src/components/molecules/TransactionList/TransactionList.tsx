import React, {useEffect} from 'react';
import {BalanceCard} from '@/components/molecules/BalanceCard';
import {Text, View} from 'react-native';
import {StatusBadge} from '@/components/organisms/StatusBadge';
import {useAppSelector, useNavigationLayout} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {TransactionsCollection, TransactionType} from '@/types';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {PriceText} from '@/components/organisms/PriceText';
import {
  clearGetTransactionsActionResponse,
  getTransactionsAction,
} from '@/redux/actions/httpActions';
import {EmptyPlaceholder} from '@/components/organisms/EmptyPlaceholder/EmptyPlaceholder';

const TransactionList = () => {
  const {setLayoutRefreshHandler} = useNavigationLayout();
  const transactionsHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_TRANSACTIONS];
  const transactionsCollection: TransactionsCollection =
    transactionsHttpResponse?.data;
  const transactions = transactionsCollection?.results ?? [];

  const getTransactionTypeText = (type: TransactionType) => {
    let text = '';

    switch (type) {
      case 'DEPOSIT':
        text = 'Deposit';
        break;
      case 'COMMISSION_RECEIVED':
        text = 'Commission Received';
        break;
      case 'PACKAGE_PURCHASE':
        text = 'Package Purchase';
        break;
      case 'WITHDRAWAL':
        text = 'Withdrawal';
        break;
    }

    return text;
  };

  const getTransactions = () => getTransactionsAction();

  useEffect(() => {
    setLayoutRefreshHandler(getTransactions);
    getTransactions();

    return () => {
      clearGetTransactionsActionResponse();
    };
  }, []);

  return (
    <>
      <View className={'mt-[38px] mb-[20px]'}>
        <View className={'p-[22px] py-[0]'}>
          <BalanceCard />

          <View className={'mt-[42px]'}>
            {transactionsHttpResponse?.success && transactions?.length > 0 && (
              <>
                <View className={'mb-[20px]'}>
                  <Text
                    className={
                      'text-[#2D3748] font-[600] font-poppins-medium text-[16px]'
                    }>
                    Transactions
                  </Text>
                </View>
                <View className={'flex flex-col gap-[12px]'}>
                  {transactions?.map((item, index) => (
                    <View
                      key={index}
                      style={{backgroundColor: 'rgba(233, 233, 233, 0.35)'}}
                      className={
                        'flex flex-row items-center border-[1px] border-[#dddddd] h-[85px] px-[13px] rounded-[12px]'
                      }>
                      <View className={'flex flex-col flex-grow'}>
                        <Text
                          className={
                            'text-[15px] font-poppins-medium font-[700] text-[#2D3748] uppercase'
                          }>
                          {getTransactionTypeText(item?.type)}
                        </Text>
                        <Text
                          className={
                            'text-[14px] font-poppins-medium text-[#2D3748]'
                          }>
                          <PriceText amount={item?.amount} />
                        </Text>
                        <Text
                          className={
                            'text-[12px] font-poppins-medium text-[#2D3748] opacity-[0.6] mt-[4px]'
                          }>
                          {item?.date}
                        </Text>
                      </View>
                      <View>
                        <StatusBadge status={item?.status} />
                      </View>
                    </View>
                  ))}
                </View>
              </>
            )}

            {transactionsHttpResponse?.success &&
              transactions?.length === 0 && (
                <EmptyPlaceholder
                  label={'No Transactions'}
                  type={'transactions'}
                />
              )}
          </View>
        </View>
      </View>

      <ActionLoader
        show={transactionsHttpResponse?.loading}
        label={'Loading'}
      />
    </>
  );
};

export {TransactionList};

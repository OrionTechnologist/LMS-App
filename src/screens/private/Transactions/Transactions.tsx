import React from 'react';
import {PageHeader} from '@/components/molecules/PageHeader';
import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import {PrivateLayout} from '@/components/middlewares/auth';
import {TransactionList} from '@/components/molecules/TransactionList';
import {useNavigation} from '@react-navigation/native';

const Transactions = () => {
  const {goBack} = useNavigation();
  return (
    <PrivateLayout>
      <NavigationTabLayout>
        <PageHeader
          variant={'title-bar'}
          titleInfoProps={{
            title: 'Transactions',
          }}
          showBackButton={true}
          onClickBackButton={goBack}
        />
        <TransactionList />
      </NavigationTabLayout>
    </PrivateLayout>
  );
};

export default Transactions;

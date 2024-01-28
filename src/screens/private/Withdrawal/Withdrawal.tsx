import React from 'react';
import {PageHeader} from '@/components/molecules/PageHeader';
import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import {PrivateLayout} from '@/components/middlewares/auth';
import {WithdrawalForm} from '@/components/molecules/Withdrawal';
import {useNavigation} from '@react-navigation/native';

const Withdrawal = () => {
  const {goBack} = useNavigation();
  return (
    <PrivateLayout>
      <NavigationTabLayout>
        <PageHeader
          variant={'title-bar'}
          titleInfoProps={{
            title: 'Withdrawal',
          }}
          showBackButton={true}
          onClickBackButton={goBack}
        />
        <WithdrawalForm />
      </NavigationTabLayout>
    </PrivateLayout>
  );
};

export default Withdrawal;

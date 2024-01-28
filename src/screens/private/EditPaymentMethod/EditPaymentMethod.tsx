import React from 'react';
import {PageHeader} from '@/components/molecules/PageHeader';
import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import {PrivateLayout} from '@/components/middlewares/auth';
import {useNavigation} from '@react-navigation/native';
import {PaymentMethodForm} from '@/components/molecules/EditPaymentMethod';

const EditPaymentMethod = () => {
  const {goBack} = useNavigation();
  return (
    <PrivateLayout>
      <NavigationTabLayout>
        <PageHeader
          variant={'title-bar'}
          titleInfoProps={{
            title: 'Payment Method',
          }}
          showBackButton={true}
          onClickBackButton={goBack}
        />
        <PaymentMethodForm />
      </NavigationTabLayout>
    </PrivateLayout>
  );
};

export default EditPaymentMethod;

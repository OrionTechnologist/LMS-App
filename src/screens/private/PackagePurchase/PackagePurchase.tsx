import React from 'react';
import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import {PageHeader} from '@/components/molecules/PageHeader';
import {PrivateLayout} from '@/components/middlewares/auth';
import {PackagePurchaseForm} from '@/components/molecules/PackagePurchaseForm';

const PackagePurchase = () => {
  return (
    <>
      <PrivateLayout>
        <NavigationTabLayout>
          <PageHeader
            variant={'title-bar'}
            titleInfoProps={{
              title: 'Make a Payment',
            }}
          />
          <PackagePurchaseForm />
        </NavigationTabLayout>
      </PrivateLayout>
    </>
  );
};

export default PackagePurchase;

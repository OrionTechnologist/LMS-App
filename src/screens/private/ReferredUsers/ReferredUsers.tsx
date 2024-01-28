import React from 'react';
import {PageHeader} from '@/components/molecules/PageHeader';
import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import {PrivateLayout} from '@/components/middlewares/auth';
import {ReferredUserList} from '@/components/molecules/ReferredUserList';
import {useNavigation} from '@react-navigation/native';

const ReferredUsers = () => {
  const {goBack} = useNavigation();
  return (
    <PrivateLayout>
      <NavigationTabLayout>
        <PageHeader
          variant={'title-bar'}
          titleInfoProps={{
            title: 'Referred Users',
          }}
          showBackButton={true}
          onClickBackButton={goBack}
        />
        <ReferredUserList />
      </NavigationTabLayout>
    </PrivateLayout>
  );
};

export default ReferredUsers;

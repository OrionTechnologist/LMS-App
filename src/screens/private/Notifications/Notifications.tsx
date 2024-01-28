import React from 'react';
import {PageHeader} from '@/components/molecules/PageHeader';
import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import {PrivateLayout} from '@/components/middlewares/auth';
import {NotificationList} from '@/components/molecules/NotificationList';

const Notifications = () => {
  return (
    <PrivateLayout>
      <NavigationTabLayout>
        <PageHeader
          variant={'title-bar'}
          titleInfoProps={{
            title: 'Notifications',
          }}
        />
        <NotificationList />
      </NavigationTabLayout>
    </PrivateLayout>
  );
};

export default Notifications;

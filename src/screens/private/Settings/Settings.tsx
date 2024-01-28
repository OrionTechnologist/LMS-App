import React from 'react';
import {PageHeader} from '@/components/molecules/PageHeader';
import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import {ProfileSettingsNavigation} from '@/components/molecules/ProfileSettingsNavigation';
import {PrivateLayout} from '@/components/middlewares/auth';

const Settings = () => {
  return (
    <PrivateLayout>
      <NavigationTabLayout>
        <PageHeader
          variant={'profile-info'}
          profileInfoProps={{
            showEditProfile: true,
          }}
        />
        <ProfileSettingsNavigation />
      </NavigationTabLayout>
    </PrivateLayout>
  );
};

export default Settings;

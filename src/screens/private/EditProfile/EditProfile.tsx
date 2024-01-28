import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import React from 'react';
import {EditProfileForm} from '@/components/molecules/EditProfileForm';
import {PrivateLayout} from '@/components/middlewares/auth';

const EditProfile = () => {
  return (
    <>
      <PrivateLayout>
        <NavigationTabLayout>
          <EditProfileForm />
        </NavigationTabLayout>
      </PrivateLayout>
    </>
  );
};

export default EditProfile;

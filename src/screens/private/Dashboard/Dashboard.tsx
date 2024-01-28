import React from 'react';
import {PageHeader} from '@/components/molecules/PageHeader';
import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import {PrivateLayout} from '@/components/middlewares/auth';
import {View} from 'react-native';
import {DashboardMenus} from '@/components/organisms/DashboardMenus';
import {DashboardImageSlider} from '@/components/molecules/DashboardImageSlider';
import {GlobalUsersActivityCounter} from '@/components/molecules/GlobalUsersActivityCounter';

const Dashboard = () => {
  return (
    <PrivateLayout>
      <NavigationTabLayout>
        <PageHeader
          variant={'profile-info'}
          titleInfoProps={{
            title: 'Refereed Users',
          }}
        />

        <View className={'p-[13px]'}>
          <View>
            <GlobalUsersActivityCounter />
            <DashboardImageSlider />
          </View>
          <View className={'mt-[17px]'}>
            <DashboardMenus />
          </View>
        </View>
      </NavigationTabLayout>
    </PrivateLayout>
  );
};

export default Dashboard;

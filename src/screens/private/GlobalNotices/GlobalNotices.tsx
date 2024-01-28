import React from 'react';
import {PageHeader} from '@/components/molecules/PageHeader';
import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import {PrivateLayout} from '@/components/middlewares/auth';
import {NoticeList} from '@/components/molecules/GlobalNotices';
import {useNavigation} from '@react-navigation/native';

const GlobalNotices = () => {
  const {goBack} = useNavigation();
  return (
    <PrivateLayout>
      <NavigationTabLayout>
        <PageHeader
          variant={'title-bar'}
          titleInfoProps={{
            title: 'Notices',
          }}
          showBackButton={true}
          onClickBackButton={goBack}
        />
        <NoticeList />
      </NavigationTabLayout>
    </PrivateLayout>
  );
};

export default GlobalNotices;

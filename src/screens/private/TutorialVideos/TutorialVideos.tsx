import React from 'react';
import {PageHeader} from '@/components/molecules/PageHeader';
import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import {PrivateLayout} from '@/components/middlewares/auth';
import {useNavigation} from '@react-navigation/native';
import {TutorialVideoList} from '@/components/molecules/TutorialVideos';

const TutorialVideos = () => {
  const {goBack} = useNavigation();
  return (
    <PrivateLayout>
      <NavigationTabLayout>
        <PageHeader
          variant={'title-bar'}
          titleInfoProps={{
            title: 'How to work',
          }}
          showBackButton={true}
          onClickBackButton={goBack}
        />
        <TutorialVideoList />
      </NavigationTabLayout>
    </PrivateLayout>
  );
};

export default TutorialVideos;

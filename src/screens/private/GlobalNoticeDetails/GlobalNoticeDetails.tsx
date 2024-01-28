import React from 'react';
import {PageHeader} from '@/components/molecules/PageHeader';
import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import {PrivateLayout} from '@/components/middlewares/auth';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NoticeDetails} from '@/components/molecules/GlobalNotices/NoticeDetails';
import {GlobalNotice} from '@/types';

interface GlobalNoticeDetailsProps {
  route?: RouteProp<any>;
}

const GlobalNoticeDetails: React.FC<GlobalNoticeDetailsProps> = props => {
  const {goBack} = useNavigation();
  const {route} = props;
  const noticeData: GlobalNotice | null = route?.params?.noticeData;

  return (
    <PrivateLayout>
      <NavigationTabLayout>
        <PageHeader
          variant={'title-bar'}
          titleInfoProps={{
            title: 'Notice',
          }}
          showBackButton={true}
          onClickBackButton={goBack}
        />
        <NoticeDetails data={noticeData} />
      </NavigationTabLayout>
    </PrivateLayout>
  );
};

export default GlobalNoticeDetails;

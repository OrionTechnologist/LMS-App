import React, {useEffect} from 'react';
import {Carousel, createCarouselData} from '@/components/atoms/Carousel';
import {getGlobalFeaturedNoticesAction} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {GlobalNotice, GlobalNoticesCollection} from '@/types';
import {useNotificationSignals} from '@/hooks/useNotificationSignals';
import {routes} from '@/routes';
import {useNavigation} from '@react-navigation/native';

const DashboardImageSlider = () => {
  const {navigate} = useNavigation();
  const globalNoticesHttpResponse =
    useAppSelector(selectHttpState)[
      CORRELATION_IDS.GET_GLOBAL_FEATURED_NOTICES
    ];
  const globalNoticesResult: GlobalNoticesCollection =
    globalNoticesHttpResponse?.data;
  const globalNotices = (globalNoticesResult?.results ?? [])?.filter(
    item => item?.image && item?.image !== '',
  );

  const getNotices = () => getGlobalFeaturedNoticesAction();

  const gotoNoticeDetailsPage = (noticeData: GlobalNotice) =>
    navigate(
      routes?.private?.globalNoticeDetailsScreen as never,
      {
        noticeData: noticeData,
      } as never,
    );

  const carouselData = createCarouselData(
    globalNotices?.map(item => ({
      uri: item?.image,
      onPress() {
        gotoNoticeDetailsPage(item);
      },
    })),
  );

  useNotificationSignals({
    onReceiveGlobalNotice() {
      getNotices();
    },
  });

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <>
      <Carousel data={carouselData} />
    </>
  );
};

export {DashboardImageSlider};

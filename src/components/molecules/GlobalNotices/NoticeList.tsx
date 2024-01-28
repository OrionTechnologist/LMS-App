import React, {useEffect} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppSelector, useNavigationLayout} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {GlobalNotice, GlobalNoticesCollection} from '@/types';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {
  clearGetGlobalNoticesActionResponse,
  getGlobalFeaturedNoticesAction,
  getGlobalNoticesAction,
} from '@/redux/actions/httpActions';
import {EmptyPlaceholder} from '@/components/organisms/EmptyPlaceholder/EmptyPlaceholder';
import {convertToString} from '@/utils';
import {NoticeMediaPlaceholderImage} from '@/assets/images';
import {useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';

const NoticeList = () => {
  const {navigate} = useNavigation();
  const {setLayoutRefreshHandler} = useNavigationLayout();
  const globalNoticesHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_GLOBAL_NOTICES];
  const globalNoticesResult: GlobalNoticesCollection =
    globalNoticesHttpResponse?.data;
  const globalNotices = globalNoticesResult?.results ?? [];

  const getNotices = () => getGlobalNoticesAction();

  const gotoNoticeDetailsPage = (noticeData: GlobalNotice) =>
    navigate(
      routes?.private?.globalNoticeDetailsScreen as never,
      {
        noticeData: noticeData,
      } as never,
    );

  useEffect(() => {
    setLayoutRefreshHandler(getNotices);
    getNotices();

    return () => {
      clearGetGlobalNoticesActionResponse();
    };
  }, []);

  return (
    <>
      <View className={'mt-[22px] mb-[22px]'}>
        <View className={'p-[22px] py-[0]'}>
          <View>
            {globalNoticesHttpResponse?.success &&
              globalNotices?.length > 0 && (
                <>
                  <View className={'flex flex-col gap-[12px]'}>
                    {globalNotices?.map((item, index) => {
                      const image: ImageSourcePropType =
                        convertToString(item?.image)?.trim() === ''
                          ? NoticeMediaPlaceholderImage
                          : {uri: item?.image};

                      return (
                        <TouchableOpacity
                          key={index}
                          style={{backgroundColor: 'rgba(233, 233, 233, 0.35)'}}
                          className={
                            'flex flex-row items-center border-[1px] border-[#dddddd] h-[85px] px-[13px] rounded-[12px]'
                          }
                          activeOpacity={0.5}
                          onPress={() => gotoNoticeDetailsPage(item)}>
                          <View>
                            <ImageBackground
                              source={image}
                              className={'h-[36px] w-[36px] rounded-[10px]'}
                              imageStyle={{borderRadius: 10}}
                            />
                          </View>
                          <View
                            className={
                              'flex flex-col flex-grow ml-[15px] w-[80%]'
                            }>
                            <Text
                              className={
                                'text-[15px] font-poppins-medium font-[700] text-[#2D3748] uppercase'
                              }
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {item?.title}
                            </Text>
                            <Text
                              className={
                                'text-[14px] font-poppins-regular text-[#2D3748]'
                              }
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {item?.description}
                            </Text>
                            {/*<Text
                              className={
                                'text-[12px] font-poppins-medium text-[#2D3748] opacity-[0.6] mt-[4px]'
                              }>
                              {item?.date}
                            </Text>*/}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </>
              )}

            {globalNoticesHttpResponse?.success &&
              globalNotices?.length === 0 && (
                <EmptyPlaceholder label={'No notices'} type={'notification'} />
              )}
          </View>
        </View>
      </View>

      <ActionLoader
        show={globalNoticesHttpResponse?.loading}
        label={'Loading'}
      />
    </>
  );
};

export {NoticeList};

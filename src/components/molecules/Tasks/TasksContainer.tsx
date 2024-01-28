import React, {useEffect} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {WatchAds} from '@/components/molecules/Tasks/WatchAds';
import {routes} from '@/routes';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {convertToNumber} from '@/utils';
import {EarningTodayInfo} from '@/components/molecules/Tasks/EarningTodayInfo';
import {BalanceCard} from '@/components/molecules/BalanceCard';
import {
  getUserAdInfoTodayAction,
  storeLoginData,
  updateApplicationSettings,
} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {UserAdInfoTodaySingleItem} from '@/types';
import {DailyRewardSection} from '@/components/molecules/Tasks/DailyRewardSection';

interface TasksContainerProps {}

const informationCards = [
  {value: 'WATCH_BUTTON', title: 'Watch Ads'},
  {value: 'EARNING_INFO_TODAY', title: "Today's earning"},
];

const TasksContainer: React.FC<TasksContainerProps> = () => {
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();

  const userAdInfoTodayHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_USER_AD_INFO_TODAY];
  const userAdInfoTodaySingleItem: UserAdInfoTodaySingleItem =
    userAdInfoTodayHttpResponse?.data;
  const userAdInfoToday = userAdInfoTodaySingleItem?.result;
  const loading = userAdInfoTodayHttpResponse?.loading;

  const availableAdsCount = convertToNumber(userAdInfoToday?.available_total);
  const adData = userAdInfoToday?.ad;

  const gotoAdPreviewScreen = () => {
    if (adData) {
      navigate(
        routes.private.adPreviewScreen as never,
        {
          type: adData?.type,
          previewUrl: adData?.ad_preview_url,
          minimumWatchDuration: adData?.min_watch_duration,
        } as never,
      );
    } else {
      Alert.alert('Ads Unavailable', 'No ads found in the server!');
    }
  };

  const handlePressWatchAds = () => {
    if (availableAdsCount > 0) {
      gotoAdPreviewScreen();
    } else {
      Alert.alert('Ads Unavailable', 'No ads available for today!');
    }
  };

  const getAdsInfo = () => getUserAdInfoTodayAction();

  const refreshServices = () => {
    storeLoginData({shouldReloadUserData: true});
    updateApplicationSettings({shouldReloadSettings: true});
    getAdsInfo();
  };

  useEffect(() => {
    refreshServices();
  }, [isFocused]);

  return (
    <>
      <View className={'flex flex-col flex-grow p-[10px] py-[20px]'}>
        <View style={{flex: 1}} className={'flex-grow bg-[#F6F6F7]'}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={refreshServices} />
            }>
            <View className={'px-[9px]'}>
              <BalanceCard />

              <View className={'mt-[30px]'}>
                <Text
                  className={'text-[15px] font-poppins-bold text-[#4d4d4d]'}>
                  Fast way to get earnings
                </Text>
              </View>
            </View>

            <SafeAreaView style={{flex: 1, width: '100%'}}>
              <FlatList
                data={informationCards}
                numColumns={2}
                renderItem={({item}) => (
                  <View style={{flex: 1}} className={'m-[10px]'}>
                    {item?.value === 'WATCH_BUTTON' && (
                      <WatchAds
                        adRevenue={userAdInfoToday?.per_ad_revenue}
                        availableAds={availableAdsCount}
                        onPressWatch={handlePressWatchAds}
                        loading={loading}
                      />
                    )}
                    {item?.value === 'EARNING_INFO_TODAY' && (
                      <EarningTodayInfo
                        amount={userAdInfoToday?.earning_today}
                        loading={loading}
                      />
                    )}
                  </View>
                )}
                keyExtractor={item => item.title}
              />
            </SafeAreaView>

            {userAdInfoToday?.daily_reward_available && (
              <DailyRewardSection onSuccess={refreshServices} />
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export {TasksContainer};

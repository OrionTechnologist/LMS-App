import {PackageCard} from '@/components/molecules/PackageCard';
import React, {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {routes} from '@/routes';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getPackagesAction} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {PackageCollection} from '@/types';
import {convertCurrency, convertToNumber} from '@/utils';

const PackagesPricing = () => {
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();
  const packageListHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_PACKAGES];
  const packageCollection: PackageCollection = packageListHttpResponse?.data;
  const packages = packageCollection?.results ?? [];

  const gotoLoginOrRegistrationPage = () =>
    navigate(routes.public.loginOrRegisterIntroScreen as never);

  const getPackages = () => getPackagesAction();

  useEffect(() => {
    getPackages();
  }, [isFocused]);

  return (
    <>
      <View className={'bg-primary flex flex-grow'}>
        <ScrollView>
          <View className={'h-[150px] flex items-center justify-center'}>
            <Text
              className={
                'text-center text-white text-[20px] font-bold mb-[10px]'
              }>
              Friendly Pricing
            </Text>
            <Text className={'text-center text-white text-[13px]'}>
              Start Your Earning Journey Together
            </Text>
          </View>

          <View className={'p-[22px] py-[0] flex flex-col'}>
            {packages?.map((item, index) => (
              <PackageCard
                key={index}
                name={item?.name}
                price={item?.price}
                onSelect={gotoLoginOrRegistrationPage}
                features={[
                  {
                    title: `${convertToNumber(item?.ad_limit)} Adds Daily`,
                    available: true,
                  },
                  {
                    title: `${convertCurrency(
                      item?.daily_revenue,
                    )} Daily Revenue`,
                    available: true,
                  },
                  {
                    title: `${convertCurrency(
                      item?.per_ad_revenue,
                    )} Per Ad Revenue`,
                    available: true,
                  },
                  {
                    title: `${item?.refer_commission} Refer Commission`,
                    available: true,
                  },
                ]}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default PackagesPricing;

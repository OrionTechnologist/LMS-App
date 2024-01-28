import {PackageCard} from '@/components/molecules/PackageCard';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {routes} from '@/routes';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getPackagesAction} from '@/redux/actions/httpActions';
import {useAppSelector, useAuth} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {Package, PackageCollection} from '@/types';
import {convertCurrency, convertToNumber} from '@/utils';
import {NavigationTabLayout} from '@/components/layouts/navigation-tab-layout';
import {PageHeader} from '@/components/molecules/PageHeader';
import {PrivateLayout} from '@/components/middlewares/auth';

const PackagesPricing = () => {
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();
  const {userData} = useAuth();
  const packageListHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_PACKAGES];
  const packageCollection: PackageCollection = packageListHttpResponse?.data;
  const packages = packageCollection?.results ?? [];

  const gotoPackagePurchasePage = (packageId: Package['id']) =>
    navigate(
      routes.private.packagePurchaseScreen as never,
      {
        packageId,
      } as never,
    );

  const getPackages = () => getPackagesAction();

  useEffect(() => {
    getPackages();
  }, [isFocused]);

  return (
    <>
      <PrivateLayout>
        <NavigationTabLayout>
          <PageHeader
            variant={'title-bar'}
            titleInfoProps={{
              title: 'Friendly Pricing',
              subTitle: 'Start Your Earning Journey Together',
            }}
          />

          <View className={'mt-[38px]'}>
            <View className={'p-[22px] py-[0] flex flex-col'}>
              {packages?.map((item, index) => (
                <PackageCard
                  key={index}
                  name={item?.name}
                  price={item?.price}
                  onSelect={() => {
                    gotoPackagePurchasePage(item?.id);
                  }}
                  currentSelected={
                    convertToNumber(userData?.package_id) ===
                    convertToNumber(item?.id)
                  }
                  hideBuyNowButton={convertToNumber(userData?.package_id) > 0}
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
          </View>
        </NavigationTabLayout>
      </PrivateLayout>
    </>
  );
};

export default PackagesPricing;

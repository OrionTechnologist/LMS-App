import React, {useEffect} from 'react';
import {View} from 'react-native';
import {NavigationListItem} from '@/components/organisms/NavigationListItem';
import {
  SettingsAboutIcon,
  SettingsInviteFriendsIcon,
  SettingsLogoutIcon,
  SettingsPaymentHistoryIcon,
  SettingsPaymentMethodIcon,
  SettingsTermsAndConditionsIcon,
} from '@/assets/icons';
import {
  clearLoginData,
  clearLogoutActionResponse,
  logoutUser,
} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';
import {useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';
import {ActionLoader} from '@/components/atoms/ActionLoader';

const ProfileSettingsNavigation = () => {
  // @ts-ignore
  const {navigate} = useNavigation();
  const logoutHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.LOGOUT];

  const gotoLoginPage = () => navigate(routes.public.loginScreen as never);
  const gotoReferralUsersPage = () =>
    navigate(routes.private.referredUsersScreen as never);
  const gotoTransactionsPage = () =>
    navigate(routes.private.transactionsScreen as never);
  const gotoPaymentMethodEditPage = () =>
    navigate(routes.private.paymentMethodEditScreen as never);
  const gotoTermsAndConditionsPage = () =>
    navigate(routes.private.termsAndConditionsScreen as never);
  const gotoAboutPage = () => navigate(routes.private.aboutUsScreen as never);

  const handlePressLogout = async () => {
    logoutUser();
  };

  const processLogoutResponse = async () => {
    if (logoutHttpResponse?.success) {
      clearLogoutActionResponse();
      await clearLoginData();
      Toast.show(alertMessages.logoutSuccess, Toast.LONG);
      gotoLoginPage();
    }

    if (logoutHttpResponse?.error) {
      clearLogoutActionResponse();
      Toast.show(alertMessages.logoutFailedFromServerSide, Toast.LONG);
      gotoLoginPage();
    }
  };

  useEffect(() => {
    processLogoutResponse();
  }, [logoutHttpResponse]);

  return (
    <>
      <View className={'py-[20px]'}>
        <NavigationListItem
          icon={SettingsPaymentMethodIcon}
          title={'Payment method'}
          onPress={gotoPaymentMethodEditPage}
        />
        {/*<NavigationListItem
          icon={SettingsRewardCreditsIcon}
          title={'Reward credits'}
          onPress={() => {}}
        />*/}
        <NavigationListItem
          icon={SettingsInviteFriendsIcon}
          title={'Invite Friends'}
          onPress={gotoReferralUsersPage}
        />
        <NavigationListItem
          icon={SettingsPaymentHistoryIcon}
          title={'Payment History'}
          onPress={gotoTransactionsPage}
        />
        <NavigationListItem
          icon={SettingsTermsAndConditionsIcon}
          title={'Terms & condition'}
          onPress={gotoTermsAndConditionsPage}
        />
        <NavigationListItem
          icon={SettingsAboutIcon}
          title={'About Us'}
          onPress={gotoAboutPage}
        />
        <NavigationListItem
          icon={SettingsLogoutIcon}
          title={'Sign out'}
          onPress={handlePressLogout}
        />
      </View>

      <ActionLoader show={logoutHttpResponse?.loading} label={'Logging out'} />
    </>
  );
};

export {ProfileSettingsNavigation};

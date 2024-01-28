import React, {useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationHomeIcon,
  NavigationNotificationsIcon,
  NavigationProfileIcon,
  NavigationSupportIcon,
} from '@/assets/icons';
import classNames from 'classnames';
import {NavigationMenuType} from '@/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {routes} from '@/routes';
import {
  getGlobalFeaturedNoticesAction,
  storeLoginData,
  updateApplicationSettings,
} from '@/redux/actions/httpActions';
import {NavTabLayoutContext, NavTabLayoutContextState} from '@/context';
import {useAppStates} from '@/hooks/useAppStates';
import {TabMenuButton} from '@/components/layouts/navigation-tab-layout/TabMenuButton';

interface NavigationTabLayoutProps {
  children?: React.ReactNode;
  refreshing?: boolean;

  onRefresh?(): void;
}

const NavigationTabLayout: React.FC<NavigationTabLayoutProps> = props => {
  const {children} = props;
  const route = useRoute();
  const {navigate} = useNavigation();
  const {unreadNotifications, unreadSupportMessages} = useAppStates();
  const [refreshHandler, setRefreshHandler] = useState<(() => void) | null>(
    null,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateRefreshing: NavTabLayoutContextState['setIsRefreshing'] =
    value => {
      setIsRefreshing(() => value);
    };

  const updateRefreshHandler: NavTabLayoutContextState['setLayoutRefreshHandler'] =
    value => {
      setRefreshHandler(() => value);
    };

  const navigateMenu = (menu: NavigationMenuType) => {
    let routePath: string | null = null;

    switch (menu) {
      case 'home':
        routePath = routes?.private?.dashboardScreen;
        break;
      case 'notifications':
        routePath = routes?.private?.notificationsScreen;
        break;
      case 'profile-settings':
        routePath = routes?.private?.profileSettingsScreen;
        break;
      case 'support-messages':
        routePath = routes?.private?.supportMessagesScreen;
        break;
    }

    if (routePath) {
      navigate(routePath as never);
    }
  };

  const refreshServices = () => {
    storeLoginData({shouldReloadUserData: true});
    updateApplicationSettings({shouldReloadSettings: true});

    // refresh the global notices slider
    getGlobalFeaturedNoticesAction();

    if (props?.onRefresh) {
      props?.onRefresh();
    }

    if (refreshHandler && typeof refreshHandler === 'function') {
      refreshHandler();
    }
  };

  return (
    <>
      <NavTabLayoutContext.Provider
        value={{
          setIsRefreshing: updateRefreshing,
          setLayoutRefreshHandler: updateRefreshHandler,
        }}>
        <View className={'flex flex-grow'}>
          <View style={{flex: 1}} className={'flex-grow bg-[#F6F6F7]'}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={props?.refreshing ?? isRefreshing}
                  onRefresh={refreshServices}
                />
              }>
              {children}
            </ScrollView>
          </View>
          <View className={'flex flex-row bg-white py-[12px] px-[23px]'}>
            <View className={'w-[25%] flex justify-center items-center'}>
              <TabMenuButton
                active={route?.name === routes?.private?.dashboardScreen}
                iconSource={NavigationHomeIcon}
                onPress={() => navigateMenu('home')}
              />
            </View>
            <View className={'w-[25%] flex justify-center items-center'}>
              <TabMenuButton
                active={route?.name === routes?.private?.notificationsScreen}
                iconSource={NavigationNotificationsIcon}
                onPress={() => navigateMenu('notifications')}
                badgeContent={unreadNotifications}
              />
            </View>
            <View className={'w-[25%] flex justify-center items-center'}>
              <TabMenuButton
                active={route?.name === routes?.private?.supportMessagesScreen}
                iconSource={NavigationSupportIcon}
                onPress={() => navigateMenu('support-messages')}
                badgeContent={unreadSupportMessages}
              />
            </View>
            <View className={'w-[25%] flex justify-center items-center'}>
              <TabMenuButton
                active={route?.name === routes?.private?.profileSettingsScreen}
                iconSource={NavigationProfileIcon}
                onPress={() => navigateMenu('profile-settings')}
              />
            </View>
          </View>
        </View>
      </NavTabLayoutContext.Provider>
    </>
  );
};

export {NavigationTabLayout};

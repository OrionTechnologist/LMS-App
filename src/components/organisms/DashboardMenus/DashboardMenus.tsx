import React from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  AboutMenuIcon,
  HowToWorkMenuIcon,
  NoticeMenuIcon,
  PaymentHistoryMenuIcon,
  PlansMenuIcon,
  ReferralUsersMenuIcon,
  StartTaskMenuIcon,
  SupportMenuIcon,
  WithdrawMenuIcon,
} from '@/assets/icons';
import {routes} from '@/routes';
import {useNavigation} from '@react-navigation/native';
import {MenuButton} from '@/components/organisms/DashboardMenus/MenuButton';

interface DashboardMenusProps {}

const DashboardMenus: React.FC<DashboardMenusProps> = () => {
  const {navigate} = useNavigation();

  const gotoTasksPage = () => navigate(routes.private.tasksScreen as never);

  const gotoPackagesPage = () =>
    navigate(routes.private.pricingScreen as never);

  const gotoReferredUsersPage = () =>
    navigate(routes.private.referredUsersScreen as never);

  const gotoTransactionsPage = () =>
    navigate(routes.private.transactionsScreen as never);

  const gotoWithdrawalRequestPage = () =>
    navigate(routes.private.withdrawalRequestScreen as never);

  const gotoSupportChatPage = () =>
    navigate(routes.private.supportMessagesScreen as never);

  const gotoGlobalNoticesPage = () =>
    navigate(routes.private.globalNoticesScreen as never);

  const gotoTutorialVideosPage = () =>
    navigate(routes.private.tutorialVideosScreen as never);

  const gotoAboutPage = () => navigate(routes.private.aboutUsScreen as never);

  const menuList = [
    {
      title: 'Start Task',
      icon: StartTaskMenuIcon,
      onPress() {
        gotoTasksPage();
      },
    },
    {
      title: 'Plans',
      icon: PlansMenuIcon,
      onPress() {
        gotoPackagesPage();
      },
    },
    {
      title: 'How to Work',
      icon: HowToWorkMenuIcon,
      onPress() {
        gotoTutorialVideosPage();
      },
    },
    {
      title: 'Referral',
      icon: ReferralUsersMenuIcon,
      onPress() {
        gotoReferredUsersPage();
      },
    },
    {
      title: 'Transactions',
      icon: PaymentHistoryMenuIcon,
      onPress() {
        gotoTransactionsPage();
      },
    },
    {
      title: 'Withdraw',
      icon: WithdrawMenuIcon,
      onPress() {
        gotoWithdrawalRequestPage();
      },
    },
    {
      title: 'Notice',
      icon: NoticeMenuIcon,
      onPress() {
        gotoGlobalNoticesPage();
      },
    },
    {
      title: 'Support',
      icon: SupportMenuIcon,
      onPress() {
        gotoSupportChatPage();
      },
    },
    {
      title: 'About',
      icon: AboutMenuIcon,
      onPress() {
        gotoAboutPage();
      },
    },
  ];

  return (
    <>
      <View className={'bg-[#efefef] p-[10px] rounded-[9px]'}>
        <SafeAreaView style={{flex: 1, width: '100%'}}>
          <FlatList
            data={menuList}
            numColumns={3}
            renderItem={({item, index}) => (
              <MenuButton
                key={index}
                title={item?.title}
                iconSource={item?.icon}
                onPress={item?.onPress}
              />
            )}
            keyExtractor={item => item.title}
          />
        </SafeAreaView>
      </View>
    </>
  );
};

export {DashboardMenus};

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ReactNativeScreen from '@/screens/ReactNativeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InitialScreen from '@/screens/global/InitialScreen';
import {routes} from './routes';
import Login from '@/screens/public/Login';
import Register from '@/screens/public/Register';
import ForgotPassword from '@/screens/public/ForgotPassword';
import ResetPassword from '@/screens/public/ResetPassword';
import ResetPasswordSuccess from '@/screens/public/ResetPasswordSuccess';
import ResetPasswordOTP from '@/screens/public/ResetPasswordOTP';
import LoginOrRegisterIntro from '@/screens/public/LoginOrRegisterIntro';
import PackagesPricing from '@/screens/public/PackagesPricing';
import PrivatePackagesPricing from '@/screens/private/PackagesPricing';
import Dashboard from '@/screens/private/Dashboard';
import SignUpOTP from '@/screens/public/SignUpOTP';
import Notifications from '@/screens/private/Notifications';
import Settings from '@/screens/private/Settings';
import EditProfile from '@/screens/private/EditProfile';
import PackagePurchase from '@/screens/private/PackagePurchase';
import PackagePurchaseRequestSuccess from '@/screens/private/PackagePurchaseRequestSuccess';
import ReferredUsers from '@/screens/private/ReferredUsers';
import Transactions from '@/screens/private/Transactions';
import {NotificationService} from '@/services';
import SupportChat from '@/screens/private/SupportChat';
import Tasks from '@/screens/private/Tasks';
import AdPreview from '@/screens/private/AdPreview';
import Withdrawal from '@/screens/private/Withdrawal';
import GlobalNotices from '@/screens/private/GlobalNotices';
import EditPaymentMethod from '@/screens/private/EditPaymentMethod';
import TutorialVideos from '@/screens/private/TutorialVideos';
import TutorialVideoPreview from '@/screens/private/TutorialVideoPreview';
import GlobalNoticeDetails from '@/screens/private/GlobalNoticeDetails';
import TermsAndConditions from '@/screens/global/TermsAndConditions';
import AboutUs from '@/screens/global/AboutUs';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <>
      <NavigationContainer>
        <NotificationService />
        <Stack.Navigator
          initialRouteName={routes.global.initialScreen}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name={routes.global.initialScreen}
            component={InitialScreen}
          />
          <Stack.Screen
            name={routes.public.loginOrRegisterIntroScreen}
            component={LoginOrRegisterIntro}
          />
          <Stack.Screen name={routes.public.loginScreen} component={Login} />
          <Stack.Screen
            name={routes.public.forgotPasswordScreen}
            component={ForgotPassword}
          />
          <Stack.Screen
            name={routes.public.resetPasswordOtpScreen}
            component={ResetPasswordOTP}
          />
          <Stack.Screen
            name={routes.public.resetPasswordScreen}
            component={ResetPassword}
          />
          <Stack.Screen
            name={routes.public.resetPasswordSuccessScreen}
            component={ResetPasswordSuccess}
          />
          <Stack.Screen
            name={routes.public.registerScreen}
            component={Register}
          />
          <Stack.Screen
            name={routes.public.signupOtpScreen}
            component={SignUpOTP}
          />
          <Stack.Screen
            name={routes.public.pricingListScreen}
            component={PackagesPricing}
          />
          <Stack.Screen
            name={routes.public.termsAndConditionsScreen}
            component={TermsAndConditions}
          />
          <Stack.Screen
            name={routes.private.dashboardScreen}
            component={Dashboard}
          />
          <Stack.Screen
            name={routes.private.notificationsScreen}
            component={Notifications}
          />
          <Stack.Screen
            name={routes.private.profileSettingsScreen}
            component={Settings}
          />
          <Stack.Screen
            name={routes.private.editProfileScreen}
            component={EditProfile}
          />
          <Stack.Screen
            name={routes.private.pricingScreen}
            component={PrivatePackagesPricing}
          />
          <Stack.Screen
            name={routes.private.packagePurchaseScreen}
            component={PackagePurchase}
          />
          <Stack.Screen
            name={routes.private.packagePurchaseSuccessScreen}
            component={PackagePurchaseRequestSuccess}
          />
          <Stack.Screen
            name={routes.private.referredUsersScreen}
            component={ReferredUsers}
          />
          <Stack.Screen
            name={routes.private.transactionsScreen}
            component={Transactions}
          />
          <Stack.Screen
            name={routes.private.withdrawalRequestScreen}
            component={Withdrawal}
          />
          <Stack.Screen name={routes.private.tasksScreen} component={Tasks} />
          <Stack.Screen
            name={routes.private.adPreviewScreen}
            component={AdPreview}
          />
          <Stack.Screen
            name={routes.private.supportMessagesScreen}
            component={SupportChat}
          />
          <Stack.Screen
            name={routes.private.globalNoticesScreen}
            component={GlobalNotices}
          />
          <Stack.Screen
            name={routes.private.globalNoticeDetailsScreen}
            component={GlobalNoticeDetails}
          />
          <Stack.Screen
            name={routes.private.paymentMethodEditScreen}
            component={EditPaymentMethod}
          />
          <Stack.Screen
            name={routes.private.tutorialVideosScreen}
            component={TutorialVideos}
          />
          <Stack.Screen
            name={routes.private.tutorialVideoPreviewScreen}
            component={TutorialVideoPreview}
          />
          <Stack.Screen
            name={routes.private.termsAndConditionsScreen}
            component={TermsAndConditions}
          />
          <Stack.Screen
            name={routes.private.aboutUsScreen}
            component={AboutUs}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export {Router};

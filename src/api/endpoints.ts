import {createRequestUrl} from '@/utils/createRequestUrl';
import {
  DeleteNotificationParams,
  GlobalNoticesParams,
  ReadNotificationParams,
  SupportMessageQueryParams,
} from '@/types';

export const endpoints = {
  getApplicationSettings: '/application-settings',
  login: '/login',
  signup: '/signup',
  resendSignupOtp: '/resend-signup-otp',
  verifySignupOtp: '/verify-signup-otp',
  recoverPassword: '/recover-password',
  resetPassword: '/reset-password',
  logout: '/logout',
  getAppStates: '/app-states',
  getAuthUserProfile: '/profile',
  uploadFile: '/upload-file',
  updateProfile: '/profile',
  changePassword: '/profile/change-password',
  getPackages: '/packages',
  sendPackagePurchaseRequest: '/send-package-purchase-request',
  sendWithdrawalRequest: '/send-withdrawal-request',
  getReferredUsers: '/referred-users',
  getTransactions: '/transactions',
  registerDeviceFcmToken: '/register-device-fcm-token',
  getNotifications: '/notifications',
  readNotification: (params: ReadNotificationParams) =>
    createRequestUrl({
      url: `/notifications/${params?.notificationId}/read`,
    }),
  deleteNotification: (params: DeleteNotificationParams) =>
    createRequestUrl({
      url: `/notifications/${params?.notificationId}/delete`,
    }),
  deleteAllNotifications: '/notifications/delete',
  getSupportMessages: (params: SupportMessageQueryParams) =>
    createRequestUrl({
      url: '/get-support-message',
      params,
    }),
  sendSupportMessage: '/send-support-message',
  getUserAdInfoToday: '/user-ad-info-today',
  claimAdWatchReward: '/claim-ad-watch-reward',
  claimDailyReward: '/claim-daily-reward',
  getGlobalNotices: (params?: GlobalNoticesParams) =>
    createRequestUrl({
      url: '/global-notices',
      params,
    }),
  updatePaymentMethod: '/profile/update-payment-method',
  tutorialVideos: '/tutorial-videos',
};

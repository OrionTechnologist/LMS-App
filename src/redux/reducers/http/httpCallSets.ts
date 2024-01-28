import {
  CORRELATION_IDS,
  HttpState,
  performHttpCall,
  resetHttpState,
} from '@/redux/reducers/http';
import {endpoints} from '@/api';
import {
  ChangePasswordParams,
  DeleteNotificationParams,
  GlobalNoticesParams,
  LoginParams,
  LogoutParams,
  PackagePurchaseRequestParams,
  ReadNotificationParams,
  RecoverPasswordParams,
  ResendSignUpOtpParams,
  ResetPasswordParams,
  SendSupportMessageParams,
  SendWithdrawalRequestParams,
  SignUpParams,
  SupportMessageQueryParams,
  UpdatePaymentMethodParams,
  UpdateProfileParams,
  VerifySignupOtpParams,
} from '@/types';

export const clearHttpState = (
  coreRelationKey: keyof HttpState,
  data: any = null,
) =>
  resetHttpState({
    coreRelationKey,
    data,
  });

export const getApplicationSettingsHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_APPLICATION_SETTINGS,
    payload: {
      url: endpoints.getApplicationSettings,
      method: 'get',
      useBearerToken: false,
    },
  });

export const loginHttpCall = (params: LoginParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.LOGIN,
    payload: {
      url: endpoints.login,
      method: 'post',
      body: params,
      useBearerToken: false,
    },
  });

export const signUpHttpCall = (params: SignUpParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.SIGN_UP,
    payload: {
      url: endpoints.signup,
      method: 'post',
      body: params,
      useBearerToken: false,
    },
  });

export const resendSignUpOtpHttpCall = (params: ResendSignUpOtpParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.RESEND_SIGN_UP_OTP,
    payload: {
      url: endpoints.resendSignupOtp,
      method: 'post',
      body: params,
      useBearerToken: false,
    },
  });

export const verifySignUpOtpHttpCall = (params: VerifySignupOtpParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.VERIFY_SIGN_UP_OTP,
    payload: {
      url: endpoints.verifySignupOtp,
      method: 'post',
      body: params,
      useBearerToken: false,
    },
  });

export const recoverPasswordHttpCall = (params: RecoverPasswordParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.RECOVER_PASSWORD,
    payload: {
      url: endpoints.recoverPassword,
      method: 'post',
      body: params,
      useBearerToken: false,
    },
  });

export const resetPasswordHttpCall = (params: ResetPasswordParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.RESET_PASSWORD,
    payload: {
      url: endpoints.resetPassword,
      method: 'post',
      body: params,
      useBearerToken: false,
    },
  });

export const getAppStatesHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_APP_STATES,
    payload: {
      url: endpoints.getAppStates,
      method: 'get',
      useBearerToken: true,
    },
  });

export const getAuthUserProfileHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_AUTH_USER_PROFILE,
    payload: {
      url: endpoints.getAuthUserProfile,
      method: 'get',
      useBearerToken: true,
    },
  });

export const updateAuthUserProfileHttpCall = (params: UpdateProfileParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.UPDATE_AUTH_USER_PROFILE,
    payload: {
      url: endpoints.updateProfile,
      method: 'patch',
      useBearerToken: true,
      body: params,
    },
  });

export const changePasswordHttpCall = (params: ChangePasswordParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.CHANGE_PASSWORD,
    payload: {
      url: endpoints.changePassword,
      method: 'post',
      useBearerToken: true,
      body: params,
    },
  });

export const uploadFileHttpCall = (formData: any) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.UPLOAD_FILE,
    payload: {
      url: endpoints.uploadFile,
      method: 'post',
      useBearerToken: true,
      body: formData,
      multipart: true,
    },
  });

export const logoutHttpCall = (params: LogoutParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.LOGOUT,
    payload: {
      url: endpoints.logout,
      method: 'post',
      useBearerToken: true,
      body: params,
    },
  });

export const getPackagesHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_PACKAGES,
    payload: {
      url: endpoints.getPackages,
      method: 'get',
      useBearerToken: true,
    },
  });

export const sendPackagePurchaseRequestHttpCall = (
  params: PackagePurchaseRequestParams,
) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.SEND_PACKAGE_PURCHASE_REQUEST,
    payload: {
      url: endpoints.sendPackagePurchaseRequest,
      method: 'post',
      useBearerToken: true,
      body: params,
    },
  });

export const getReferredUsersHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_REFERRED_USERS,
    payload: {
      url: endpoints.getReferredUsers,
      method: 'get',
      useBearerToken: true,
    },
  });

export const getTransactionsHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_TRANSACTIONS,
    payload: {
      url: endpoints.getTransactions,
      method: 'get',
      useBearerToken: true,
    },
  });

export const getNotificationsHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_NOTIFICATIONS,
    payload: {
      url: endpoints.getNotifications,
      method: 'get',
      useBearerToken: true,
    },
  });

export const readNotificationHttpCall = (params: ReadNotificationParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.READ_NOTIFICATION,
    payload: {
      url: endpoints.readNotification(params),
      method: 'post',
      useBearerToken: true,
    },
  });

export const deleteNotificationHttpCall = (params: DeleteNotificationParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.DELETE_NOTIFICATION,
    payload: {
      url: endpoints.deleteNotification(params),
      method: 'delete',
      useBearerToken: true,
    },
  });

export const deleteAllNotificationsHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.DELETE_ALL_NOTIFICATIONS,
    payload: {
      url: endpoints.deleteAllNotifications,
      method: 'delete',
      useBearerToken: true,
    },
  });

export const getSupportMessagesHttpCall = (params: SupportMessageQueryParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_SUPPORT_MESSAGES,
    payload: {
      url: endpoints.getSupportMessages(params),
      method: 'get',
      useBearerToken: true,
    },
  });

export const getSupportNewUnreadMessagesHttpCall = (
  params: SupportMessageQueryParams,
) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_SUPPORT_NEW_UNREAD_MESSAGES,
    payload: {
      url: endpoints.getSupportMessages(params),
      method: 'get',
      useBearerToken: true,
    },
  });

export const sendSupportMessageHttpCall = (params: SendSupportMessageParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.SEND_SUPPORT_MESSAGE,
    payload: {
      url: endpoints.sendSupportMessage,
      method: 'post',
      useBearerToken: true,
      body: params,
    },
  });

export const getUserAdInfoTodayHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_USER_AD_INFO_TODAY,
    payload: {
      url: endpoints.getUserAdInfoToday,
      method: 'get',
      useBearerToken: true,
    },
  });

export const claimAdWatchRewardHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.CLAIM_AD_WATCH_REWARD,
    payload: {
      url: endpoints.claimAdWatchReward,
      method: 'post',
      useBearerToken: true,
    },
  });

export const sendWithdrawalRequestHttpCall = (
  params: SendWithdrawalRequestParams,
) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.SEND_WITHDRAWAL_REQUEST,
    payload: {
      url: endpoints.sendWithdrawalRequest,
      method: 'post',
      useBearerToken: true,
      body: params,
    },
  });

export const getGlobalNoticesHttpCall = (params?: GlobalNoticesParams) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_GLOBAL_NOTICES,
    payload: {
      url: endpoints.getGlobalNotices(params),
      method: 'get',
      useBearerToken: true,
    },
  });

export const getGlobalFeaturedNoticesHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_GLOBAL_FEATURED_NOTICES,
    payload: {
      url: endpoints.getGlobalNotices({
        featured: true,
      }),
      method: 'get',
      useBearerToken: true,
    },
  });

export const updatePaymentMethodHttpCall = (
  params: UpdatePaymentMethodParams,
) =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.UPDATE_PAYMENT_METHOD,
    payload: {
      url: endpoints.updatePaymentMethod,
      method: 'post',
      useBearerToken: true,
      body: params,
    },
  });

export const getTutorialVideosHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.GET_TUTORIAL_VIDEOS,
    payload: {
      url: endpoints.tutorialVideos,
      method: 'get',
      useBearerToken: true,
    },
  });

export const claimDailyRewardHttpCall = () =>
  performHttpCall({
    correlationKey: CORRELATION_IDS.CLAIM_DAILY_REWARD,
    payload: {
      url: endpoints.claimDailyReward,
      method: 'post',
      useBearerToken: true,
    },
  });

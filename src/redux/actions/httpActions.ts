import {store} from '@/redux/store';
import {
  HttpState,
  clearHttpState,
  CORRELATION_IDS,
  loginHttpCall,
  logoutHttpCall,
  signUpHttpCall,
  verifySignUpOtpHttpCall,
  recoverPasswordHttpCall,
  resetPasswordHttpCall,
  uploadFileHttpCall,
  getAuthUserProfileHttpCall,
  updateAuthUserProfileHttpCall,
  changePasswordHttpCall,
  getApplicationSettingsHttpCall,
  getPackagesHttpCall,
  sendPackagePurchaseRequestHttpCall,
  getReferredUsersHttpCall,
  getTransactionsHttpCall,
  getNotificationsHttpCall,
  deleteNotificationHttpCall,
  deleteAllNotificationsHttpCall,
  readNotificationHttpCall,
  getAppStatesHttpCall,
  getSupportMessagesHttpCall,
  getSupportNewUnreadMessagesHttpCall,
  sendSupportMessageHttpCall,
  getUserAdInfoTodayHttpCall,
  claimAdWatchRewardHttpCall,
  sendWithdrawalRequestHttpCall,
  getGlobalNoticesHttpCall,
  getGlobalFeaturedNoticesHttpCall,
  updatePaymentMethodHttpCall,
  getTutorialVideosHttpCall,
  claimDailyRewardHttpCall,
  resendSignUpOtpHttpCall,
} from '@/redux/reducers/http';
import {AuthState, clearAuth, storeAuth} from '@/redux/reducers/authSlice';
import {AuthService, DeviceInfoService} from '@/services';
import {
  ApplicationSettings,
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
import {
  ApplicationSettingsState,
  storeApplicationSettings,
} from '@/redux/reducers/applicationSettingsSlice';
import {convertToBoolean} from '@/utils';
import {getFCMToken} from '@/utils/helpers';

export function clearHttpStateObject(
  coreRelationKey: keyof HttpState,
  data: any = null,
) {
  store.dispatch(clearHttpState(coreRelationKey, data));
}

export function updateApplicationSettings(
  options: Partial<ApplicationSettingsState>,
) {
  store.dispatch(storeApplicationSettings(options));
}

export function handleApplicationSettingsResponse(data: ApplicationSettings) {
  updateApplicationSettings({
    currencyName: data?.currency_name,
    currencySymbol: data?.currency_symbol,
    websiteUrl: data?.website_url,
    appCurrentVersion: data?.app_current_version,
    maintenanceMode: convertToBoolean(data?.maintenance_mode),
    maintenanceModeMessage: data?.maintenance_mode_message,
    paymentMethod: data?.payment_method,
    paymentMethodAccountNo: data?.payment_method_account_no,
  });
}

export async function storeLoginData(options: Partial<AuthState>) {
  if (options?.token) {
    await new AuthService().setToken(options?.token);
  }
  store.dispatch(storeAuth(options));
}

export async function clearLoginData() {
  await new AuthService().removeToken();
  store.dispatch(clearAuth());
}

export function getApplicationSettingsAction() {
  store.dispatch(getApplicationSettingsHttpCall());
}

export function clearGetApplicationSettingsActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.GET_APPLICATION_SETTINGS);
}

export function loginAction(params: LoginParams) {
  store.dispatch(loginHttpCall(params));
}

export function clearLoginActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.LOGIN);
}

export function signUpAction(params: SignUpParams) {
  store.dispatch(signUpHttpCall(params));
}

export function clearSignUpActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.SIGN_UP);
}

export function resendSignUpOtpAction(params: ResendSignUpOtpParams) {
  store.dispatch(resendSignUpOtpHttpCall(params));
}

export function clearResendSignUpOtpActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.RESEND_SIGN_UP_OTP);
}

export function verifySignupOtpAction(params: VerifySignupOtpParams) {
  store.dispatch(verifySignUpOtpHttpCall(params));
}

export function clearVerifySignupOtpActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.VERIFY_SIGN_UP_OTP);
}

export function recoverPasswordAction(params: RecoverPasswordParams) {
  store.dispatch(recoverPasswordHttpCall(params));
}

export function clearRecoverPasswordActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.RECOVER_PASSWORD);
}

export function resetPasswordAction(params: ResetPasswordParams) {
  store.dispatch(resetPasswordHttpCall(params));
}

export function clearResetPasswordActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.RESET_PASSWORD);
}

export function logoutAction(params: LogoutParams) {
  store.dispatch(logoutHttpCall(params));
}

export async function logoutUser() {
  const deviceFcmToken = await getFCMToken();
  const deviceUniqueId = await DeviceInfoService.getUniqueId();

  logoutAction({
    device_fcm_token: deviceFcmToken as string,
    device_unique_id: deviceUniqueId,
  });
}

export function clearLogoutActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.LOGOUT);
}

export function uploadFileAction(formData: any) {
  store.dispatch(uploadFileHttpCall(formData));
}

export function clearUploadFileActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.UPLOAD_FILE);
}

export function getAppStatesAction() {
  store.dispatch(getAppStatesHttpCall());
}

export function getAuthUserProfileAction() {
  store.dispatch(getAuthUserProfileHttpCall());
}

export function clearGetAuthUserProfileActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.GET_AUTH_USER_PROFILE);
}

export function updateAuthUserProfileAction(params: UpdateProfileParams) {
  store.dispatch(updateAuthUserProfileHttpCall(params));
}

export function clearUpdateAuthUserProfileActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.UPDATE_AUTH_USER_PROFILE);
}

export function changePasswordAction(params: ChangePasswordParams) {
  store.dispatch(changePasswordHttpCall(params));
}

export function clearChangePasswordActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.CHANGE_PASSWORD);
}

export function getPackagesAction() {
  store.dispatch(getPackagesHttpCall());
}

export function sendPackagePurchaseRequestAction(
  params: PackagePurchaseRequestParams,
) {
  store.dispatch(sendPackagePurchaseRequestHttpCall(params));
}

export function clearSendPackagePurchaseRequestActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.SEND_PACKAGE_PURCHASE_REQUEST);
}

export function getReferredUsersAction() {
  store.dispatch(getReferredUsersHttpCall());
}

export function clearGetReferredUsersActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.GET_REFERRED_USERS);
}

export function getTransactionsAction() {
  store.dispatch(getTransactionsHttpCall());
}

export function clearGetTransactionsActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.GET_TRANSACTIONS);
}

export function getNotificationsAction() {
  store.dispatch(getNotificationsHttpCall());
}

export function clearGetNotificationsActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.GET_NOTIFICATIONS);
}

export function readNotificationAction(params: ReadNotificationParams) {
  store.dispatch(readNotificationHttpCall(params));
}

export function clearReadNotificationActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.READ_NOTIFICATION);
}

export function deleteNotificationAction(params: DeleteNotificationParams) {
  store.dispatch(deleteNotificationHttpCall(params));
}

export function clearDeleteNotificationActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.DELETE_NOTIFICATION);
}

export function deleteAllNotificationsAction() {
  store.dispatch(deleteAllNotificationsHttpCall());
}

export function clearDeleteAllNotificationsActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.DELETE_ALL_NOTIFICATIONS);
}

export function getSupportMessagesAction(params: SupportMessageQueryParams) {
  store.dispatch(getSupportMessagesHttpCall(params));
}

export function clearGetSupportMessagesActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.GET_SUPPORT_MESSAGES);
}

export function getSupportNewUnreadMessagesAction(
  params: SupportMessageQueryParams,
) {
  store.dispatch(getSupportNewUnreadMessagesHttpCall(params));
}

export function clearGetSupportNewUnreadMessagesActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.GET_SUPPORT_NEW_UNREAD_MESSAGES);
}

export function sendSupportMessageAction(params: SendSupportMessageParams) {
  store.dispatch(sendSupportMessageHttpCall(params));
}

export function clearSendSupportMessageActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.SEND_SUPPORT_MESSAGE);
}

export function getUserAdInfoTodayAction() {
  store.dispatch(getUserAdInfoTodayHttpCall());
}

export function claimAdWatchRewardAction() {
  store.dispatch(claimAdWatchRewardHttpCall());
}

export function clearClaimAdWatchRewardActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.CLAIM_AD_WATCH_REWARD);
}

export function sendWithdrawalRequestAction(
  params: SendWithdrawalRequestParams,
) {
  store.dispatch(sendWithdrawalRequestHttpCall(params));
}

export function clearSendWithdrawalRequestActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.SEND_WITHDRAWAL_REQUEST);
}

export function getGlobalNoticesAction(params?: GlobalNoticesParams) {
  store.dispatch(getGlobalNoticesHttpCall(params));
}

export function getGlobalFeaturedNoticesAction() {
  store.dispatch(getGlobalFeaturedNoticesHttpCall());
}

export function clearGetGlobalNoticesActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.GET_GLOBAL_NOTICES);
}

export function updatePaymentMethodAction(params: UpdatePaymentMethodParams) {
  store.dispatch(updatePaymentMethodHttpCall(params));
}

export function clearUpdatePaymentMethodResponse() {
  clearHttpStateObject(CORRELATION_IDS.UPDATE_PAYMENT_METHOD);
}

export function getTutorialVideosAction() {
  store.dispatch(getTutorialVideosHttpCall());
}

export function clearGetTutorialVideosActionResponse() {
  clearHttpStateObject(CORRELATION_IDS.GET_TUTORIAL_VIDEOS);
}

export function claimDailyRewardAction() {
  store.dispatch(claimDailyRewardHttpCall());
}

export function clearClaimDailyRewardResponse() {
  clearHttpStateObject(CORRELATION_IDS.CLAIM_DAILY_REWARD);
}

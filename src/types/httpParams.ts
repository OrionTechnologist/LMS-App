export interface CollectionQueryParams {
  per_page?: number;
  page?: number;
}

export interface LoginParams {
  email?: string;
  password?: string;
  device_fcm_token?: string | null;
  device_unique_id?: string | null;
  device_id?: string | null;
  device_brand?: string | null;
  device_model?: string | null;
  device_name?: string | null;
  device_additional_info?: string | null;
}

export interface SignUpParams {
  first_name: string;
  last_name: string;
  phone: string;
  referral_code: string;
  email?: string;
  password?: string;
}

export interface ResendSignUpOtpParams {
  email?: string;
}

export interface VerifySignupOtpParams {
  user_id: number;
  otp: string;
}

export interface RecoverPasswordParams {
  email: string;
}

export interface ResetPasswordParams {
  email: string;
  otp: string;
  password: string;
  confirm_password: string;
}

export interface UpdateProfileParams {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  profile_photo?: string | null;
}

export interface ChangePasswordParams {
  current_password: string;
  password: string;
  confirm_password: string;
  device_unique_id?: string | null;
}

export interface PackagePurchaseRequestParams {
  transaction_id: string;
  package_id: string;
  referral_code: string | null;
  attached_image: string | null;
}

export interface ReadNotificationParams {
  notificationId: number;
}

export interface DeleteNotificationParams {
  notificationId: number;
}

export interface LogoutParams {
  device_fcm_token?: string | null;
  device_unique_id?: string | null;
}

export interface SupportMessageQueryParams extends CollectionQueryParams {
  update_unread?: 0 | 1;
  only_new_unread?: 0 | 1;
}

export interface SendSupportMessageParams {
  message: string;
  image_url?: string | null;
}

export interface SendWithdrawalRequestParams {
  amount: number;
  transaction_id: string;
  password: string;
}

export interface GlobalNoticesParams {
  featured?: boolean;
}

export interface UpdatePaymentMethodParams {
  transaction_id: string;
}

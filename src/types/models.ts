import {
  PaymentMethodType,
  TransactionStatusType,
  TransactionType,
} from '@/types';
import {NotificationType} from '@/types/notificationType';

export interface Collection<Item> {
  results: Item[];
  metadata?: {
    pagination?: {
      offset?: number;
      limit?: number;
      previousOffset?: number;
      nextOffset?: number;
      currentPage?: number;
      nextPage?: number;
      pageCount?: number;
      totalCount?: number;
    };
    query?: any;
  };
}

export interface SingleItem<Item> {
  result: Item;
}

export interface ApplicationSettings {
  currency_symbol?: string | null;
  currency_name?: string | null;
  website_url?: string | null;
  app_current_version?: string | null;
  maintenance_mode?: boolean | 0 | 1;
  maintenance_mode_message?: string | null;
  payment_method: PaymentMethodType | null;
  payment_method_account_no: string | null;
}

export interface AppStates {
  unread_notifications: number;
  unread_messages: number;
  unread_notices: number;
}

export interface UserData {
  id: number;
  package_id: number | null;
  email_verified: number | boolean;
  balance: number;
  transaction_account_no: string | null;
  package_referral_code: string | null;
  first_name: string | null;
  last_name: string | null;
  user_code: string | null;
  email: string | null;
  phone: string | null;
  gender: string | null;
  profile_photo: string | null;
  last_withdrawal_request_sent: string | null;
  created_at: string | null;
  updated_at: string | null;
  package?: Package | null;
}

export interface FileUploadResponse {
  message?: string;
  file_path?: string;
  file_path_preview?: string;
}

export interface Package {
  id?: number | null;
  name?: string | null;
  price?: number | null;
  ad_limit?: number | null;
  daily_revenue?: number | null;
  per_ad_revenue?: number | null;
  refer_commission?: number | null;
}

export interface Transaction {
  id?: number | null;
  user_id?: number | null;
  package_id?: number | null;
  referral_code?: string | null;
  transaction_id?: string | null;
  type: TransactionType;
  amount?: number | null;
  status: TransactionStatusType;
  attached_image?: string | null;
  date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  package?: Package | null;
  user?: UserData | null;
  referral_user?: UserData | null;
}

export interface Notification {
  id: number;
  is_deleted: number;
  is_unread: number;
  type: NotificationType;
  title: string | null;
  message: string | null;
  image: string | null;
  date_time: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface SupportMessage {
  id: number;
  room_user_id: number;
  sender_id?: number | null;
  receiver_id?: number | null;
  sender_role: 'user' | 'admin' | null;
  receiver_role: 'user' | 'admin' | null;
  receiver_seen: number | boolean;
  message: string | null;
  attachment_image?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  is_opponent?: boolean;
  room_info: UserData;
  sender?: UserData | null;
  receiver?: UserData | null;
  date_time?: {
    date?: string | null;
    time?: string | null;
  };
}

export interface UserAd {
  id: number;
  type: 'image' | 'video';
  title?: string | null;
  min_watch_duration: number;
  ad_preview_url: string;
  status: 'active' | 'inactive';
  created_at: string | null;
  updated_at: string | null;
}

export interface UserAdInfoToday {
  ad?: UserAd | null;
  per_day_limit: number;
  per_ad_revenue: number;
  available_total: number;
  watch_count_today: number;
  earning_today: number;
  daily_reward_available: boolean;
}

export interface GlobalNotice {
  id: number;
  is_featured?: boolean | 1 | 0;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  status: 'active' | 'inactive';
  date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface TutorialVideo {
  id: number;
  title?: string | null;
  video_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ReferralUser {
  id: number;
  user_id: number;
  referral_user_id: number;
  package_id: number;
  package_price: number;
  commission_percentage: number;
  commission_price: number;
  created_at?: string | null;
  updated_at?: string | null;
  user?: UserData | null;
  referral_user?: UserData | null;
  package?: Package | null;
}

export interface ReferralUsersResponse {
  total_referral_earning: number;
  total_sales: number;
  referred_users: ReferralUser[];
}

export type PackageCollection = Collection<Package>;
export type ReferredUsersSingleItem = SingleItem<ReferralUsersResponse>;
export type TransactionsCollection = Collection<Transaction>;
export type NotificationsCollection = Collection<Notification>;
export type SupportMessagesCollection = Collection<SupportMessage>;
export type SupportMessagesSingleItem = SingleItem<SupportMessage>;
export type UserAdInfoTodaySingleItem = SingleItem<UserAdInfoToday>;
export type GlobalNoticesCollection = Collection<GlobalNotice>;
export type TutorialVideosCollection = Collection<TutorialVideo>;

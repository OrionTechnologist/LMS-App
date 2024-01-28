export type TransactionStatusType =
  | 'PENDING'
  | 'RECEIVED'
  | 'CANCELLED'
  | 'REJECTED'
  | 'ACCEPTED';

export type TransactionType =
  | 'DEPOSIT'
  | 'WITHDRAWAL'
  | 'PACKAGE_PURCHASE'
  | 'COMMISSION_RECEIVED';

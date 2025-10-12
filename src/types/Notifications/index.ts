export type TypeNotificationType =
  | "welcome_user"
  | "booking_created"
  | "order_placed";

export interface NotificationType {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: {
    message_ar: string;
    title_ar: string;
    message_en: string;
    title_en: string;
    user_id: number;
    user_name: string;
    key: TypeNotificationType;
    keyId: number;
  };
  read_at: null | string;
  created_at: string;
  updated_at: string;
}

export interface NotificationsResponseType {
  status_code: number;
  message: string;
  notifications: NotificationType[];
  countUnreadNotifications: number;
}

export interface UnreadNotificationResponseType {
  status_code: number;
  message: string;
  countNotifications: number;
}

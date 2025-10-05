export type MembershipType = "user" | "provider";
export type TypeLoginType = "google" | "apple" | "normal";

export interface LoginType {
  phone: string;
  password: string;
  fcm_token: string;
  device_id: string;
}

export interface UserInfoType {
  id: number;
  name: string;
  email: string;
  image: string;
  phone: string;
  type: MembershipType;
  is_phone_verified: boolean;
  have_a_company: boolean;
}

export interface RegisterType {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  type: MembershipType;
  fcm_token: string;
  device_id: string;
}
export interface SocialRegisterType {
  name: string;
  email: string;
  provider: TypeLoginType;
  provider_id: number;
}
export interface SendOtpType {
  phone: string;
  code: string;
}

export interface ResetPasswordType {
  phone: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface ChangePasswordType {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

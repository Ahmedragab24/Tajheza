import { MembershipType } from "./Auth";

export interface ProfileType {
  id: number;
  name: string;
  email: string;
  image: string;
  phone: string;
  type: MembershipType;
  is_phone_verified: boolean;
}

export interface ProfileResponseType {
  status: boolean;
  data: {
    user: ProfileType;
  };
}

import { ProductType } from "../Products";

export interface OrderedUserType {
  id: number;
  name: string;
  image: string;
}
export interface ProviderCompanyInfoType {
  owner: {
    id: number;
    name: string;
    phone: string;
    email: string;
    image: string;
    is_online: boolean;
  };
  ordered_users: OrderedUserType[];
}
export interface ProviderCompanyInfoForUpdateType {
  id: number;
  name: string;
  logo: string;
  background: string;
  commercial_number: string;
  latitude: string;
  longitude: string;
  city: string;
  phone: string;
  email: string;
  description: string;
}
export interface ProviderCompanyServiceType {
  id: number;
  name: string;
  image: string;
  products: ProductType[];
}
export interface ProviderCompanyReviewType {
  user: OrderedUserType;
  id: number;
  rating: string;
  comment: string;
  created_at: string;
}

export interface ProviderCompanyInfoResponseType {
  status: boolean;
  data: ProviderCompanyInfoType;
}
export interface ProviderCompanyInfoForUpdateResponseType {
  status: boolean;
  data: ProviderCompanyInfoForUpdateType;
}
export interface ProviderCompanyServiceResponseType {
  status: boolean;
  data: ProviderCompanyServiceType[];
}
export interface ProviderCompanyReviewResponseType {
  status: boolean;
  data: ProviderCompanyReviewType[];
}
export interface ProviderCompanyExpressProductsType {
  status: boolean;
  data: ProductType[];
}

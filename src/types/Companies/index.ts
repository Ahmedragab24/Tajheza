import { ProductType } from "../Products";

export interface ServiceType {
  id: number;
  name: string;
  image: string;
  products: ProductType[];
}

export interface ReviewType {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    image: string;
  };
}

export interface OrderUserType {
  id: number;
  name: string;
  image: string;
}

export interface OwnerType {
  id: number;
  name: string;
  phone: string;
  email: string;
  image: null | string;
  is_online: boolean;
}

export interface CompanyType {
  id: number;
  name: string;
  description: string;
  address: string;
  logo: string;
  background: null | string;
  created_at: string;
}
export interface CompanyDetailsType {
  id: number;
  name: string;
  address: string;
  logo: string;
  background: string;
  rating: number;
  reviews_count: number;
  owner: OwnerType;
  ordered_users: { id: number; name: string; image: string }[];
  services: ServiceType[];
  reviews: ReviewType[];
}

export interface CompanyResponseType {
  data: CompanyDetailsType;
}
export interface AllCompaniesResponseType {
  status: boolean;
  data: CompanyType[];
}

export interface StoreReviewResponseType {
  message: string;
}

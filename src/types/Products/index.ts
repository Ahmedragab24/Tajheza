export interface ProductType {
  id: number;
  title: string;
  price: string;
  main_image: string;
  is_favorite: boolean;
  rating: number;
  discount: string;
}

export interface CompanyInfoType {
  id: number;
  company_id: number;
  name: string;
  logo: string;
  city: string;
  phone: string;
  rating_average: number;
  longitude: string;
  latitude: string;
}

export interface ProductDetailsType {
  id: number;
  title: string;
  description: string;
  price: string;
  city: string;
  from_time: string;
  to_time: string;
  work_days: string[];
  preferred_contact: string;
  main_image: string;
  service: {
    id: number;
    name: string;
  };
  company: CompanyInfoType;
  images: { id: number; url: string }[];
  options: [];
  addons: [];
  targets: [];
  related_products: [];
}

export interface ProductsResponseType {
  data: ProductType[];
}
export interface ProductDetailsResponseType {
  message: string;
  data: ProductDetailsType;
}

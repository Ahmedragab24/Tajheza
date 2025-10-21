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
  addons: { id: number; name: string; price: string }[];
  targets: string[];
  related_products: [];
}

export interface ProductsResponseType {
  data: ProductType[];
}

export interface StoreProductType {
  "addons[]": string[];
  city: string;
  description: string;
  from_time: string;
  "images[]": string;
  main_image: string;
  "options[0][name]": string;
  "options[0][price]": string;
  "options[1][name]": string;
  "options[1][price]": string;
  preferred_contact: string;
  price: string;
  service_id: string;
  "targets[]": string[];
  title: string;
  to_time: string;
  "work_days[]": string[];
}
export interface ProductDetailsResponseType {
  message: string;
  data: ProductDetailsType;
}
export interface StoreProductResponseType {
  message: string;
  data: {
    id: number;
    company_id: number;
    service_id: string;
    title: string;
    description: string;
    price: string;
    city: string;
    from_time: string;
    to_time: string;
    work_days: string[];
    preferred_contact: string;
    main_image: null | string;
    updated_at: string;
    created_at: string;
  };
}

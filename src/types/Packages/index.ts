export interface PackageType {
  id: number;
  name: string;
  description: string;
  price: string;
  discount_percentage: string;
  from_date: string;
  to_date: string;
  status: string;
  image: null | string;
}

export interface PackagesResponseType {
  status: boolean;
  data: PackageType[];
}

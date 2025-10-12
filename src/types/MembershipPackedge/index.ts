export interface FeaturesPackageType {
  id: number;
  name: string;
}

export interface MembershipPackageType {
  id: number;
  name: string;
  price: number;
  the_best: true;
  image: null | string;
  features_count: number;
  features: FeaturesPackageType[];
}

export interface MembershipPackageResponseType {
  data: MembershipPackageType;
}
export interface MembershipsPackagesResponseType {
  data: MembershipPackageType[];
}

export interface BannerType {
  id: number;
  title: string;
  image: string;
  color: string;
}

export interface BannerResponseType {
  data: {
    banners: BannerType[];
  };
}

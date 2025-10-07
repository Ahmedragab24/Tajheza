export interface CityType {
  id: number;
  name: string;
  name_en: string;
}

export interface citiesResponseType {
  status: boolean;
  message: string;
  data: CityType[];
}

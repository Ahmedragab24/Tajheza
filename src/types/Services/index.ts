export interface ServiceType {
  id: number;
  name: string;
  image: string;
}

export interface ServicesResponseType {
  data: ServiceType[];
}

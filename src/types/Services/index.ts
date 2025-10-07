export interface ServiceType {
  id: number;
  name: string;
  image: string;
}

export interface ServicesResponseType {
  status: boolean;
  data: ServiceType[];
}

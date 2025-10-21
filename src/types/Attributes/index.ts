export interface TargetType {
  id: number;
  name: string;
}
export interface addonType {
  id: number;
  name: string;
  price: string;
}

export interface TargetsResponseType {
  message: string;
  data: TargetType[];
}
export interface AddonsResponseType {
  message: string;
  data: addonType[];
}

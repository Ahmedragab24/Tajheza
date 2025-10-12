export interface AddressType {
  id: number;
  user_id: number;
  is_default: 0 | 1;
  title: string;
  street: string;
  building: string;
  phone: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
}

export interface StoreAddressType {
  title?: string;
  street?: string;
  building?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
}

export interface StoreAddressResponseType {
  status: boolean;
  message: string;
}

export interface AddressesResponseType {
  status: boolean;
  data: AddressType[];
}

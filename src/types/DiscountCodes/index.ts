export interface CreateDiscountCodeType {
  percentage: number;
  start_date: string;
  end_date: string;
}

export interface DiscountCodeType {
  id: number;
  provider_id: number;
  code: string;
  percentage: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateDiscountCodeResponseType {
  status: boolean;
  message: string;
  data: DiscountCodeType;
}
export interface AllDiscountCodesResponseType {
  status: boolean;
  data: DiscountCodeType[];
}
export interface DiscountCodeResponseType {
  status: boolean;
  data: DiscountCodeType;
}

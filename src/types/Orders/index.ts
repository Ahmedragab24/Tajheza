export type OrderItemType = "product" | "package";
export type OrderStatusType = "accepted" | "pending" | "decline";

export interface CreateOrderType {
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  payment_method: string;
  delivery_fee: number;
  discount: number;
  tax: number;
  items: [
    {
      company_product_id: number;
      quantity: number;
      unit_price: number;
    },
    {
      package_id: number;
      quantity: number;
      unit_price: number;
    }
  ];
}

export interface CreateOrderResponseType {
  order_id: number;
  status: boolean;
  message: string;
}

export interface OrderType {
  id: number;
  order_code: string;
  user_id: number;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  subtotal: number;
  delivery_fee: number;
  discount: number;
  tax: number;
  total: number;
  payment_method: string;
  status: OrderStatusType;
  created_at: string;
  updated_at: string;
  items: [
    {
      id: number;
      type: OrderItemType;
      item_id: number;
      title: string;
      image: string;
      quantity: number;
      unit_price: number;
      total_price: number;
      company_product_id: number;
      product_option_id: null | number;
      package_id: null | number;
      details: {
        product_id: number;
        product_description: null | string;
      };
    },
    {
      id: number;
      type: OrderItemType;
      item_id: number;
      title: string;
      image: string;
      quantity: number;
      unit_price: number;
      total_price: number;
      company_product_id: null | number;
      product_option_id: null | number;
      package_id: number;
      details: {
        package_id: number;
        package_description: null | string;
      };
    }
  ];
}

export interface OrderResponseType {
  status: boolean;
  data: OrderType;
}
export interface OrdersResponseType {
  status: boolean;
  data: OrderType[];
}

export interface CheckDiscountResponseType {
  status: boolean;
  message: string;
}

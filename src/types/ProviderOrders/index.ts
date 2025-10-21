export type OrderItemType = "product" | "package";
export type OrderStatusType = "accepted" | "pending" | "decline";
export type ActionProviderOrderType = "accept" | "decline";

export interface ProviderOrderType {
  id: number;
  order_code: string;
  date: string;
  type: string;
  title: string;
  user: {
    name: string;
    image: string;
  };
}

export interface ProviderOrderDetailsType {
  order_code: string;
  type: string;
  status: OrderStatusType;
  date: string;
  payment_method: string;
  subtotal: string;
  discount: string;
  tax: string;
  delivery_price: string;
  total_price: string;
  card_number: null | number;
  user: {
    name: string;
    phone: string;
    image: string;
  };
  location: {
    address: string;
    latitude: string;
    longitude: string;
  };
  delivery_time: null | string;
  customizations: [];
  items: [
    {
      id: number;
      title: string;
      image: string;
      price: string;
      quantity: number;
      total_price: string;
      type: string;
    }
  ];
}

export interface ProviderOrdersResponseType {
  status: boolean;
  data: ProviderOrderType[];
}
export interface OrderDetailsResponseType {
  status: boolean;
  data: ProviderOrderDetailsType;
}

export type OccasionStatueType = "inactive";
export type StatusGuestType = "pending" | "accepted" | "declined";

export interface ImageType {
  id: number;
  path: string;
  alt_text: string;
}

export interface Selected_productType {
  product_id: number;
  product_title: string;
  product_description: string;
  price: string;
  main_image: string;
  service_id: number;
  service_name: string;
  service_image: string;
  company_id: number;
  company_name: string;
}

export interface GuestType {
  phone: string;
  name: string;
}

export interface OccasionType {
  id: number;
  name: string;
  event_datetime: string;
  address: string;
  latitude: string;
  longitude: string;
  number_of_guests: number;
  additional_details: string;
  budget: string;
  shared_link: string;
  created_at: string;
  updated_at: string;
  main_image: null | string;
  images: ImageType[];
  selected_products: Selected_productType[];
  status: OccasionStatueType;
}

export interface OccasionGuestType {
  id: number;
  name: string;
  phone: string;
  status: StatusGuestType;
  invited_at: string;
  responded_at: null;
  type: "لم يرد";
}

export interface InviteGuestType {
  event_id: number;
  guests: GuestType[];
}
export interface DeleteGuestType {
  event_id: number;
  guest_id: number;
}

export interface OccasionResponseType {
  data: OccasionType;
}
export interface OccasionsResponseType {
  data: OccasionType[];
}
export interface OccasionsGuestsResponseType {
  guests: OccasionGuestType[];
}

export interface AddOccasionResponseType {
  event_id: number;
  message: string;
  shared_link: string;
}

export interface InviteGuestResponseType {
  message: string;
  guests: OccasionGuestType[];
}

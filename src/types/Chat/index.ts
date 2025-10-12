export type MessageType = "text" | "image" | "file" | "location";
export type UserType = "peer" | "user" | "admin";

export interface ChatType {
  id: number;
  name: string | null;
  type: UserType;
  unread_count: number;
  status: string | null;
  created_at: string;
  updated_at: string;
  last_message: {
    id: number;
    message: string;
    type: MessageType;
    created_at: string;
    user: {
      id: number;
      image: string;
      name: string;
      type: UserType;
      profile: {
        address: string;
        brochure: string | null;
        commercial_registration_number: string | null;
        created_at: string;
        description: string;
        id: number;
        image: string | null;
        license_number: string | null;
        name: string;
        phone: string;
        protfolio_link: string | null;
        service: string | null;
        services: string[] | null;
        user_id: number;
        whatsapp: string;
      };
    };
  };
  peer_user: {
    id: number;
    image: string | null;
    name: string;
    phone: string;
    profile: {
      address: string;
      brochure: string | null;
      commercial_registration_number: string | null;
      created_at: string;
      description: string;
      id: number;
      image: string | null;
      license_number: string | null;
      name: string;
      phone: string;
      protfolio_link: string | null;
      service: string | null;
      services: string[] | null;
      user_id: number;
      whatsapp: string;
    } | null;
    type: UserType;
  };
}

export interface ShowChatType {
  id: number;
  chat_id: number;
  user_id: number;
  message: string;
  type: MessageType;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    type: UserType;
    email: string;
    phone: string;
    image: string;
  };
}

export interface SendMessageType {
  user_id: number;
  chat_id?: number;
  message: string | File;
  type: MessageType;
  product_id?: number | null;
}

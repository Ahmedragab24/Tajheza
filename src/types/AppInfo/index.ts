export type PageType = "terms" | "about" | "privacy" | "faq";

export interface SendMessageType {
  name: string;
  phone: string;
  message: string;
}

export interface AppInfoResponseType {
  code: number;
  message: string;
  data: {
    name: string;
    android_version: string;
    ios_version: string;
    force_update: boolean;
    support_email: string;
    support_phone: string;
  };
}

export interface PageResponseType {
  code: number;
  message: string;
  data: {
    items: [
      {
        id: number;
        type: string;
        title: string;
        description: string;
        seo_title: string;
        seo_description: string;
        created_at: string;
        updated_at: string;
      }
    ];
  };
}

export interface ContactUsResponseType {
  status: boolean;
  message: string;
}

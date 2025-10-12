import { getAuthTokenClient } from "@/lib/auth/auth-client";
import {
  AppInfoResponseType,
  ContactUsResponseType,
  PageResponseType,
  PageType,
  SendMessageType,
} from "@/types/AppInfo";
import { LangType } from "@/types/globals";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AppInfoApi = createApi({
  reducerPath: "AppInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = getAuthTokenClient();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["AppInfo", "Page"],

  endpoints: (builder) => ({
    GetAppInfo: builder.query<AppInfoResponseType, void>({
      query: () => ({
        url: `/settings/app`,
        method: "GET",
      }),
      providesTags: ["AppInfo"],
    }),

    GetPage: builder.query<
      PageResponseType,
      { type: PageType; lang: LangType }
    >({
      query: ({ type, lang }) => ({
        url: `/settings/pages?lang=${lang}&type=${type}`,
        method: "GET",
      }),
      providesTags: ["Page"],
    }),

    ContactUs: builder.mutation<ContactUsResponseType, SendMessageType>({
      query: (body) => ({
        url: `/contact-us`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useContactUsMutation, useGetAppInfoQuery, useGetPageQuery } =
  AppInfoApi;

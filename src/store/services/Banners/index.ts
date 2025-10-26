import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LangType } from "@/types/globals";
import { BannerResponseType } from "@/types/Banners";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const BannersApi = createApi({
  reducerPath: "BannersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Banners"],

  endpoints: (builder) => ({
    getBanners: builder.query<BannerResponseType, LangType>({
      query: (lang) => `/home?lang=${lang}`,
      providesTags: ["Banners"],
    }),
  }),
});

export const { useGetBannersQuery } = BannersApi;

import { LangType } from "@/types/globals";
import { ServicesResponseType } from "@/types/Services";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ServicesApi = createApi({
  reducerPath: "ServicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["Services", "ServicesByCategory"],
  endpoints: (builder) => ({
    getServices: builder.query<ServicesResponseType, LangType>({
      query: (lang) => `/home-services?lang=${lang}`,
      providesTags: ["Services"],
    }),

    getServicesByCategory: builder.query<
      ServicesResponseType,
      { name: string | null; categoryId: number; lang: LangType }
    >({
      query: ({ lang, categoryId, name }) =>
        `/services?name=${name}&category_id=${categoryId}&lang=${lang}`,
      providesTags: ["ServicesByCategory"],
    }),
  }),
});

export const { useGetServicesByCategoryQuery, useGetServicesQuery } =
  ServicesApi;

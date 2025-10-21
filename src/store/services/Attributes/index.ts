import { AddonsResponseType, TargetsResponseType } from "@/types/Attributes";
import { LangType } from "@/types/globals";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AttributesApi = createApi({
  reducerPath: "AttributesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Targets", "Addons"],

  endpoints: (builder) => ({
    GetTargets: builder.query<TargetsResponseType, LangType>({
      query: (lang) => ({
        url: `/product-targets?lang=${lang}`,
        method: "GET",
      }),
      providesTags: ["Targets"],
    }),

    GetAddons: builder.query<AddonsResponseType, LangType>({
      query: (lang) => ({
        url: `/product-addons?lang=${lang}`,
        method: "GET",
      }),
      providesTags: ["Addons"],
    }),
  }),
});

export const { useGetTargetsQuery, useGetAddonsQuery } = AttributesApi;

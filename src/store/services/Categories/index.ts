import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoriesResponseType } from "@/types/Categories";
import { LangType } from "@/types/globals";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const CategoriesApi = createApi({
  reducerPath: "CategoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Categories"],

  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponseType, LangType>({
      query: (lang) => `/home-categories?lang=${lang}`,
      providesTags: ["Categories"],
    }),
  }),
});


export const { useGetCategoriesQuery } = CategoriesApi;

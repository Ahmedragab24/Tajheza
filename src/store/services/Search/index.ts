import { ProductFilteringType } from "@/app/[locale]/client/services/page";
import { LangType } from "@/types/globals";
import { MainSearchProductType, SortByType } from "@/types/Search";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const SearchApi = createApi({
  reducerPath: "SearchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["SearchProducts"],
  endpoints: (builder) => ({
    getSearchProducts: builder.query<
      MainSearchProductType,
      ProductFilteringType
    >({
      query: (Filter) => {
        const params = new URLSearchParams();

        const filterParams = {
          category_id: Filter.categoryId,
          date: Filter.date,
          city: Filter.city,
          min_price: Filter.min_price,
          max_price: Filter.max_price,
          name: Filter.name,
        };

        for (const key in filterParams) {
          const value = filterParams[key as keyof typeof filterParams];

          if (value !== null && value !== undefined && value !== "") {
            if (value instanceof Date) {
              params.append(key, value.toISOString());
            } else {
              params.append(key, String(value));
            }
          }
        }

        return `/search-products?${params.toString()}`;
      },
      providesTags: ["SearchProducts"],
    }),

    getSearchProductsBySorted: builder.query<
      MainSearchProductType,
      { sortedBy?: SortByType; lang: LangType }
    >({
      query: ({ lang, sortedBy }) => {
        const params = new URLSearchParams();

        params.append("lang", lang);

        if (sortedBy) {
          params.append("sort_by", sortedBy);
        }

        return `/sort-products?${params.toString()}`;
      },
      providesTags: ["SearchProducts"],
    }),
  }),
});

export const { useGetSearchProductsQuery, useGetSearchProductsBySortedQuery } =
  SearchApi;

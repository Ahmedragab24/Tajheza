import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { LangType } from "@/types/globals";
import { ProductsResponseType } from "@/types/Products";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FavoritesResponse {
  is_favorite: boolean;
  message: string;
}

export const FavoritesApi = createApi({
  reducerPath: "favoritesApi",
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
  tagTypes: ["Favorites"],

  endpoints: (builder) => ({
    GetFavorites: builder.query<ProductsResponseType, LangType>({
      query: (lang) => ({
        url: `/my-favorites?lang=${lang}`,
        method: "GET",
      }),
      providesTags: ["Favorites"],
    }),

    ToggleFavorite: builder.mutation<FavoritesResponse, number>({
      query: (product_id) => ({
        url: `/favorites/${product_id}`,
        method: "POST",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const { useGetFavoritesQuery, useToggleFavoriteMutation } = FavoritesApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LangType } from "@/types/globals";
import {
  ProductDetailsResponseType,
  ProductsResponseType,
  StoreProductResponseType,
} from "@/types/Products";
import { getAuthTokenClient } from "@/lib/auth/auth-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const ProviderProductsApi = createApi({
  reducerPath: "ProviderProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAuthTokenClient();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Products", "product"],

  endpoints: (builder) => ({
    getProductsByUser: builder.query<ProductsResponseType, LangType>({
      query: (lang) => `/my-company-products?lang=${lang}`,
      providesTags: ["Products"],
    }),

    getProviderProductById: builder.query<
      ProductDetailsResponseType,
      { lang: LangType; productId: number }
    >({
      query: ({ lang, productId }) =>
        `/company-products/${productId}?lang=${lang}`,
      providesTags: ["product"],
    }),

    StoreProduct: builder.mutation<StoreProductResponseType, FormData>({
      query: (body) => ({
        url: `/save-products`,
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Products"],
    }),

    UpdateProduct: builder.mutation<
      StoreProductResponseType,
      { body: FormData; productId: number }
    >({
      query: ({ body, productId }) => ({
        url: `/company-products/${productId}/update`,
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Products", "product"],
    }),

    DeleteProduct: builder.mutation<StoreProductResponseType, number>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "product"],
    }),
  }),
});

export const {
  useStoreProductMutation,
  useGetProviderProductByIdQuery,
  useGetProductsByUserQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProviderProductsApi;

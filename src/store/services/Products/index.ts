import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LangType } from "@/types/globals";
import {
  ProductsResponseType,
  ProductDetailsResponseType,
} from "@/types/Products";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const ProductsApi = createApi({
  reducerPath: "ProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Products"],

  endpoints: (builder) => ({
 
    getProductsForFastDelivery: builder.query<ProductsResponseType, LangType>({
      query: (lang) => `/home-products/fast-delivery?lang=${lang}`,
      providesTags: ["Products"],
    }),

 
    getLatestProducts: builder.query<ProductsResponseType, LangType>({
      query: (lang) => `/home-products/latest?lang=${lang}`,
      providesTags: ["Products"],
    }),

  
    getProductsByService: builder.query<ProductsResponseType, number>({
      query: (serviceId) => `/services/${serviceId}/products`,
      providesTags: ["Products"],
    }),


    getProductDetails: builder.query<ProductDetailsResponseType, number>({
      query: (productId) => `/company-products/${productId}`,
      providesTags: ["Products"],
    }),
  }),
});


export const {
  useGetProductsForFastDeliveryQuery,
  useGetLatestProductsQuery,
  useGetProductsByServiceQuery,
  useGetProductDetailsQuery,
} = ProductsApi;

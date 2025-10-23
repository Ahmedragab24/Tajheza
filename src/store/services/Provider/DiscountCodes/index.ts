import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import {
  AllDiscountCodesResponseType,
  CreateDiscountCodeResponseType,
  CreateDiscountCodeType,
  DiscountCodeResponseType,
} from "@/types/DiscountCodes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const ProviderDiscountCodesApi = createApi({
  reducerPath: "ProviderDiscountCodesApi",
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
  tagTypes: ["Discounts", "Discount"],

  endpoints: (builder) => ({
    getAllCodesDiscount: builder.query<AllDiscountCodesResponseType, void>({
      query: () => `/discounts`,
      providesTags: ["Discounts"],
    }),

    getCodesDiscountById: builder.query<DiscountCodeResponseType, number>({
      query: (codeId) => `/discounts/${codeId}`,
      providesTags: ["Discount"],
    }),

    CreateDiscountCode: builder.mutation<
      CreateDiscountCodeResponseType,
      CreateDiscountCodeType
    >({
      query: (body) => ({
        url: `/discounts`,
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Discounts", "Discount"],
    }),

    DeleteDiscountCode: builder.mutation<DiscountCodeResponseType, number>({
      query: (codeId) => ({
        url: `/discounts/${codeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Discounts", "Discount"],
    }),
  }),
});

export const {
  useCreateDiscountCodeMutation,
  useDeleteDiscountCodeMutation,
  useGetAllCodesDiscountQuery,
  useGetCodesDiscountByIdQuery,
} = ProviderDiscountCodesApi;

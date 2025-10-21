import { getAuthTokenClient } from "@/lib/auth/auth-client";
import {
  ProviderCompanyExpressProductsType,
  ProviderCompanyInfoForUpdateResponseType,
  ProviderCompanyInfoResponseType,
  ProviderCompanyReviewResponseType,
  ProviderCompanyServiceResponseType,
} from "@/types/ProviderCompany";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProviderCompanyApi = createApi({
  reducerPath: "ProviderCompanyApi",
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

  tagTypes: [
    "CompanyInfo",
    "CompanyServices",
    "CompanyReviews",
    "ExpressProducts",
  ],
  endpoints: (builder) => ({
    getMyCompanyInfo: builder.query<ProviderCompanyInfoResponseType, void>({
      query: () => `/my-company/info`,
      providesTags: ["CompanyInfo"],
    }),

    getMyCompanyInfoForUpdate: builder.query<
      ProviderCompanyInfoForUpdateResponseType,
      void
    >({
      query: () => `/company/info`,
      providesTags: ["CompanyInfo"],
    }),

    getCompanyServices: builder.query<ProviderCompanyServiceResponseType, void>(
      {
        query: () => `/my-company/services`,
        providesTags: ["CompanyServices"],
      }
    ),

    getCompanyExpressProducts: builder.query<
      ProviderCompanyExpressProductsType,
      void
    >({
      query: () => `/my-company/express-products`,
      providesTags: ["ExpressProducts"],
    }),

    getCompanyReviews: builder.query<ProviderCompanyReviewResponseType, void>({
      query: () => `/my-company/reviews`,
      providesTags: ["CompanyReviews"],
    }),

    UpdateCompanyInfo: builder.mutation<
      ProviderCompanyInfoResponseType,
      FormData
    >({
      query: (body) => ({
        url: `/company/update`,
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["CompanyInfo"],
    }),
  }),
});

export const {
  useGetCompanyReviewsQuery,
  useGetCompanyServicesQuery,
  useGetCompanyExpressProductsQuery,
  useGetMyCompanyInfoForUpdateQuery,
  useGetMyCompanyInfoQuery,
  useLazyGetCompanyReviewsQuery,
  useUpdateCompanyInfoMutation,
} = ProviderCompanyApi;

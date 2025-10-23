import { getAuthTokenClient } from "@/lib/auth/auth-client";
import {
  AllCompaniesResponseType,
  CompanyResponseType,
  StoreReviewResponseType,
} from "@/types/Companies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = getAuthTokenClient();

export const CompaniesApi = createApi({
  reducerPath: "CompaniesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["Companies", "CompanyDetails"],
  endpoints: (builder) => ({
    getAllCompanies: builder.query<AllCompaniesResponseType, void>({
      query: () => `/get-all-companies`,
      providesTags: ["Companies"],
    }),

    getCompanyById: builder.query<CompanyResponseType, number>({
      query: (companyId) => `/get-company?id=${companyId}`,
      providesTags: ["CompanyDetails"],
    }),

    storeCompanyReview: builder.mutation<StoreReviewResponseType, FormData>({
      query: (body) => ({
        url: `/store-company-review`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["CompanyDetails"],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useStoreCompanyReviewMutation,
} = CompaniesApi;

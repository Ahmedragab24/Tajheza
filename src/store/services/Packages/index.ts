import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import {
  PackageDetailsResponseType,
  PackagesResponseType,
} from "@/types/Packages";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const PackagesApi = createApi({
  reducerPath: "PackagesApi",
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
  tagTypes: ["Packages", "Package"],

  endpoints: (builder) => ({
    getPackages: builder.query<PackagesResponseType, void>({
      query: () => `/packages`,
      providesTags: ["Packages"],
    }),

    getPackagesById: builder.query<PackageDetailsResponseType, number>({
      query: (packageId) => `/public-packages/${packageId}`,
      providesTags: ["Package"],
    }),
  }),
});

export const { useGetPackagesByIdQuery, useGetPackagesQuery } = PackagesApi;

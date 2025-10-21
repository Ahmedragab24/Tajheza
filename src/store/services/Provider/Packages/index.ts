import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LangType } from "@/types/globals";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { PackagesResponseType } from "@/types/Packages";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const ProviderPackagesApi = createApi({
  reducerPath: "ProviderPackagesApi",
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
  tagTypes: ["Packages"],

  endpoints: (builder) => ({
    getPackagesByUser: builder.query<PackagesResponseType, LangType>({
      query: (lang) => `/my-packages?lang=${lang}`,
      providesTags: ["Packages"],
    }),

    StorePackage: builder.mutation<PackagesResponseType, FormData>({
      query: (body) => ({
        url: `/save_packages`,
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Packages"],
    }),

    UpdatePackage: builder.mutation<
      PackagesResponseType,
      { body: FormData; PackageId: number }
    >({
      query: ({ body, PackageId }) => ({
        url: `/update_packages/${PackageId}`,
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Packages"],
    }),

    DeletePackage: builder.mutation<PackagesResponseType, number>({
      query: (PackageId) => ({
        url: `/packages/${PackageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Packages"],
    }),
  }),
});

export const {
  useGetPackagesByUserQuery,
  useStorePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = ProviderPackagesApi;

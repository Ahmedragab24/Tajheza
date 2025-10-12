import { getAuthTokenClient } from "@/lib/auth/auth-client";
import {
  AddressesResponseType,
  StoreAddressResponseType,
  StoreAddressType,
} from "@/types/Address";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AddressesApi = createApi({
  reducerPath: "AddressesApi",
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

  tagTypes: ["Addresses"],
  endpoints: (builder) => ({
    getAddresses: builder.query<AddressesResponseType, void>({
      query: () => `/user/addresses`,
      providesTags: ["Addresses"],
    }),

    addAddress: builder.mutation<StoreAddressResponseType, StoreAddressType>({
      query: (body) => ({
        url: `/user/addresses`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Addresses"],
    }),

    updateAddress: builder.mutation<
      StoreAddressResponseType,
      { AddressId: number; body: StoreAddressType }
    >({
      query: ({ AddressId, body }) => ({
        url: `/user/addresses/${AddressId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Addresses"],
    }),

    deleteAddress: builder.mutation<StoreAddressResponseType, number>({
      query: (addressId) => ({
        url: `/user/addresses/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addresses"],
    }),

    DefaultAddress: builder.mutation<StoreAddressResponseType, number>({
      query: (addressId) => ({
        url: `/user/addresses/${addressId}/set-default`,
        method: "POST",
      }),
      invalidatesTags: ["Addresses"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDefaultAddressMutation,
  useDeleteAddressMutation,
} = AddressesApi;

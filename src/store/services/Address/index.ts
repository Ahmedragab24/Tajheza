import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { AddressType } from "@/types/Addresses";

interface AddressesResponse {
  data: {
    // userAddresses: AddressType[];
    userAddresses: string;
  };
  message: string;
  status_code: number;
}

interface AddAddressesResponse {
  data: {
    userAddress: string;
  };
  message: string;
  status_code: number;
}

export const AddressesApi = createApi({
  reducerPath: "AddressesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
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
    getAddresses: builder.query<AddressesResponse, void>({
      query: () => `user-addresses`,
      providesTags: ["Addresses"],
    }),

    addAddress: builder.mutation<AddAddressesResponse, string>({
      query: (body) => ({
        url: `/user-addresses/store`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Addresses"],
    }),

    updateAddress: builder.mutation<AddAddressesResponse, string>({
      query: (body) => ({
        url: `/user-addresses/update`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Addresses"],
    }),

    deleteAddress: builder.mutation<
      AddAddressesResponse,
      { addressId: number }
    >({
      query: ({ addressId }) => ({
        url: `/user-addresses/destroy/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addresses"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = AddressesApi;

import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { ProfileResponseType } from "@/types/Auth/Profile";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProfileApi = createApi({
  reducerPath: "ProfileApi",
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

  endpoints: (builder) => ({
    getUserInfo: builder.query<ProfileResponseType, void>({
      query: () => ({
        url: `/user-info`,
        method: "GET",
      }),
    }),

    UpdateProfile: builder.mutation<ProfileResponseType, FormData>({
      query: (body) => ({
        url: `/update-user-info`,
        method: "POST",
        body,
      }),
    }),

    ChangePassword: builder.mutation<ProfileResponseType, FormData>({
      query: (body) => ({
        url: `/change-password`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = ProfileApi;

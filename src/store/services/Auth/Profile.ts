import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { getCsrfToken, refreshCsrfToken } from "@/lib/csrf";
import { ProfileResponseType } from "@/types/Auth/Profile";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProfileApi = createApi({
  reducerPath: "ProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      await refreshCsrfToken();
      const csrfToken = getCsrfToken();
      const token = getAuthTokenClient();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      if (csrfToken) {
        headers.set("X-XSRF-TOKEN", csrfToken);
      }
      headers.set("X-Requested-With", "XMLHttpRequest");
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

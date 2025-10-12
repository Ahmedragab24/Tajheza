import { LangType } from "@/types/globals";
import {
  MembershipPackageResponseType,
  MembershipsPackagesResponseType,
} from "@/types/MembershipPackedge";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MembershipsApi = createApi({
  reducerPath: "MembershipsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Memberships", "Membership"],

  endpoints: (builder) => ({
    GetMembershipsPackages: builder.query<
      MembershipsPackagesResponseType,
      LangType
    >({
      query: (lang) => ({
        url: `/memberships?lang=${lang}`,
        method: "GET",
      }),
      providesTags: ["Memberships"],
    }),

    GetMembershipById: builder.query<
      MembershipPackageResponseType,
      { lang: LangType; packageId: number }
    >({
      query: ({ lang, packageId }) => ({
        url: `/memberships/${packageId}?lang=${lang}`,
        method: "GET",
      }),
      providesTags: ["Membership"],
    }),
  }),
});

export const { useGetMembershipsPackagesQuery, useGetMembershipByIdQuery } =
  MembershipsApi;

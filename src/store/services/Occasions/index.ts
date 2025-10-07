import { getAuthTokenClient } from "@/lib/auth/auth-client";
import {
  AddOccasionResponseType,
  DeleteGuestType,
  InviteGuestResponseType,
  InviteGuestType,
  OccasionResponseType,
  OccasionsGuestsResponseType,
  OccasionsResponseType,
  StatusGuestType,
} from "@/types/Occasions";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OccasionsApi = createApi({
  reducerPath: "OccasionsApi",
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
  tagTypes: ["Occasions", "Occasion", "Guests"],

  endpoints: (builder) => ({
    GetUserOccasions: builder.query<OccasionsResponseType, void>({
      query: () => ({
        url: `/events`,
        method: "GET",
      }),
      providesTags: ["Occasions"],
    }),

    GetUserOccasionById: builder.query<OccasionResponseType, number>({
      query: (OccasionId) => ({
        url: `/events/${OccasionId}`,
        method: "GET",
      }),
      providesTags: ["Occasion"],
    }),

    GetOccasionGuests: builder.query<
      OccasionsGuestsResponseType,
      { status?: StatusGuestType; OccasionId: number }
    >({
      query: ({ status, OccasionId }) => {
        const params = new URLSearchParams();
        params.append("event_id", String(OccasionId));

        if (status) {
          params.append("status", status);
        }

        return {
          url: `/event/guests?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Guests"],
    }),

    AddOccasion: builder.mutation<AddOccasionResponseType, FormData>({
      query: (body) => ({
        url: `/Add-Event`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Occasions", "Occasion"],
    }),

    UpdateOccasion: builder.mutation<
      AddOccasionResponseType,
      { body: FormData; OccasionId: number }
    >({
      query: ({ body, OccasionId }) => ({
        url: `/Add-Event/${OccasionId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Occasions", "Occasion"],
    }),

    DeleteOccasion: builder.mutation<AddOccasionResponseType, number>({
      query: (OccasionId) => ({
        url: `/Add-Event/${OccasionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Occasions", "Occasion"],
    }),

    InviteGuests: builder.mutation<InviteGuestResponseType, InviteGuestType>({
      query: (body) => ({
        url: `/event/guests`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Guests"],
    }),

    DeleteGuest: builder.mutation<InviteGuestResponseType, DeleteGuestType>({
      query: (body) => ({
        url: `/event/guests`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Guests", "Occasion"],
    }),
  }),
});

export const {
  useGetUserOccasionsQuery,
  useGetUserOccasionByIdQuery,
  useGetOccasionGuestsQuery,
  useAddOccasionMutation,
  useDeleteGuestMutation,
  useDeleteOccasionMutation,
  useInviteGuestsMutation,
  useUpdateOccasionMutation,
} = OccasionsApi;

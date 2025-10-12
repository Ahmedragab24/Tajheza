import { getAuthTokenClient } from "@/lib/auth/auth-client";
import {
  NotificationsResponseType,
  UnreadNotificationResponseType,
} from "@/types/Notifications";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const NotificationsApi = createApi({
  reducerPath: "NotificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders(headers) {
      const token = getAuthTokenClient();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Notifications", "NotificationsUnread"],
  endpoints: (builder) => ({
    getAllNotifications: builder.query<NotificationsResponseType, void>({
      query: () => `/notifications`,
      providesTags: ["Notifications"],
    }),

    getNotificationsUnreadCount: builder.query<
      UnreadNotificationResponseType,
      void
    >({
      query: () => `/notifications/unread`,
      providesTags: ["NotificationsUnread"],
    }),

    notificationsMarkAllRead: builder.mutation<
      UnreadNotificationResponseType,
      void
    >({
      query: () => ({
        url: `/notifications/mark-all-read`,
        method: "POST",
      }),
      invalidatesTags: ["Notifications", "NotificationsUnread"],
    }),

    notificationSpecificMarkRead: builder.mutation<
      UnreadNotificationResponseType,
      string
    >({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "POST",
      }),
      invalidatesTags: ["Notifications", "NotificationsUnread"],
    }),

    deleteAllNotifications: builder.mutation<
      UnreadNotificationResponseType,
      void
    >({
      query: () => ({
        url: `/notifications/delete-all`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications", "NotificationsUnread"],
    }),

    deleteNotification: builder.mutation<
      UnreadNotificationResponseType,
      string
    >({
      query: (id) => ({
        url: `/notifications/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications", "NotificationsUnread"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetNotificationsUnreadCountQuery,
  useNotificationsMarkAllReadMutation,
  useNotificationSpecificMarkReadMutation,
  useDeleteAllNotificationsMutation,
  useDeleteNotificationMutation,
} = NotificationsApi;

import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { LangType } from "@/types/globals";
import { OrderStatusType } from "@/types/Orders";
import {
  ActionProviderOrderType,
  OrderDetailsResponseType,
  ProviderOrdersResponseType,
} from "@/types/ProviderOrders";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProviderOrdersApi = createApi({
  reducerPath: "ProviderOrdersApi",
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

  tagTypes: ["ProviderOrders", "ProviderOrder"],
  endpoints: (builder) => ({
    getProviderOrders: builder.query<
      ProviderOrdersResponseType,
      { lang: LangType; status: OrderStatusType }
    >({
      query: ({ status, lang }) => {
        const queryParam = status ? `&status=${status}` : "";
        return `/Provider/orders?lang=${lang}${queryParam}`;
      },
      providesTags: ["ProviderOrders"],
    }),

    getProviderOrderById: builder.query<OrderDetailsResponseType, number>({
      query: (OrderId) => `/provider/get-order/${OrderId}`,
      providesTags: ["ProviderOrder"],
    }),

    OrderByAction: builder.mutation<
      ProviderOrdersResponseType,
      { orderId: number; action: ActionProviderOrderType }
    >({
      query: ({ orderId, action }) => ({
        url: `/provider/orders/${orderId}/action`,
        method: "POST",
        body: { action: action },
        header: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["ProviderOrders", "ProviderOrder"],
    }),
  }),
});

export const {
  useGetProviderOrdersQuery,
  useGetProviderOrderByIdQuery,
  useOrderByActionMutation,
} = ProviderOrdersApi;

import { getAuthTokenClient } from "@/lib/auth/auth-client";
import {
  CheckDiscountResponseType,
  CreateOrderResponseType,
  CreateOrderType,
  OrderResponseType,
  OrdersResponseType,
  OrderStatusType,
} from "@/types/Orders";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrdersApi = createApi({
  reducerPath: "OrdersApi",
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

  tagTypes: ["Orders", "Order"],
  endpoints: (builder) => ({
    getUserOrders: builder.query<
      OrdersResponseType,
      OrderStatusType | undefined
    >({
      query: (status) => {
        const queryParam = status ? `?status=${status}` : "";
        return `/user/orders${queryParam}`;
      },
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query<OrderResponseType, number>({
      query: (OrderId) => `/orders/${OrderId}`,
      providesTags: ["Order"],
    }),

    CreateOrder: builder.mutation<CreateOrderResponseType, CreateOrderType>({
      query: (body) => ({
        url: `/orders`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order", "Orders"],
    }),

    UpdateOrder: builder.mutation<
      CreateOrderResponseType,
      { body: CreateOrderType; OrderId: number }
    >({
      query: ({ body, OrderId }) => ({
        url: `/orders/${OrderId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Order", "Orders"],
    }),

    DeleteOrder: builder.mutation<CheckDiscountResponseType, number>({
      query: (OrderId) => ({
        url: `/user/orders/${OrderId}`,
        method: "POST",
      }),
    }),

    CheckDiscount: builder.mutation<CheckDiscountResponseType, FormData>({
      query: (body) => ({
        url: `/check-discount`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useCheckDiscountMutation,
} = OrdersApi;

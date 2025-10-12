import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { ChatType, SendMessageType, ShowChatType } from "@/types/Chat";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ChatResponse {
  chats: ChatType[];
  message: string;
  status_code: number;
}

interface ChatByIdResponse {
  messages: {
    current_page: number;
    data: ShowChatType[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      active: boolean;
      url: string;
      label: string;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
  message: string;
  status_code: number;
}

interface StoreMessageResponse {
  messages: ShowChatType;
  message: string;
  status_code: number;
}

interface ChatUnReadCountResponse {
  data: {
    unread_chats_count: number;
  };
  message: string;
  status_code: number;
}

export const ChatApi = createApi({
  reducerPath: "chatApi",
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

  tagTypes: ["chats", "chatsById"],
  endpoints: (builder) => ({
    getAllChats: builder.query<ChatResponse, { userId?: number } | void>({
      query: (args) => {
        const params = new URLSearchParams();

        if (args?.userId) {
          params.append("user_id", String(args.userId));
        }

        const queryString = params.toString();
        return `/chats${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["chats"],
    }),

    getChatById: builder.query<
      ChatByIdResponse,
      { chatId: number; userId?: number }
    >({
      query: ({ chatId, userId }) => {
        const params = new URLSearchParams();
        params.append("chat_id", String(chatId));

        if (userId) {
          params.append("peer_id", String(userId));
        }

        return `/chats/show?${params.toString()}`;
      },
      providesTags: ["chatsById"],
    }),

    getUnReadCount: builder.query<ChatUnReadCountResponse, void>({
      query: () => `/chats/unread-count`,
      providesTags: ["chats"],
    }),

    SendMessage: builder.mutation<
      StoreMessageResponse,
      SendMessageType | FormData
    >({
      query: (body) => ({
        url: `/chats/send`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["chats", "chatsById"],
    }),

    MarkAsRead: builder.mutation<ChatByIdResponse, number>({
      query: (chat_id) => ({
        url: `/chats/mark-as-read?chat_id=${chat_id}`,
        method: "POST",
      }),
      invalidatesTags: ["chats", "chatsById"],
    }),

    DeleteChat: builder.mutation<ChatByIdResponse, number>({
      query: (chat_id) => ({
        url: `/chat/delete?chat_id=${chat_id}`,
        method: "POST",
      }),
      invalidatesTags: ["chats", "chatsById"],
    }),
  }),
});

export const {
  useGetAllChatsQuery,
  useGetChatByIdQuery,
  useGetUnReadCountQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
  useDeleteChatMutation,
} = ChatApi;

"use client";

import type React from "react";
import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import {
  useGetAllChatsQuery,
  useGetChatByIdQuery,
  useSendMessageMutation,
} from "@/store/services/Chat";
import { MessageType } from "@/types/Chat";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import ContactsUsersMessage from "@/components/Molecules/Chat/ContactsUsersMessage";
import ChatMessages from "@/components/Molecules/Chat/ChatMessages";

interface Props {
  selectedChatId?: number;
  setSelectedChatId?: (chatId: number) => void;
  currentUserId?: number;
  setCurrentUserId?: (userId: number) => void;
}

export default function ConversationsApp({
  selectedChatId,
  setSelectedChatId,
  currentUserId,
  setCurrentUserId,
}: Props) {
  const lang = useLocale() as LangType;
  const [newMessage, setNewMessage] = useState<string | File>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeMessage, setTypeMessage] = useState<MessageType>("text");

  const { data: allChatsData } = useGetAllChatsQuery();
  const chats = allChatsData?.chats || [];

  const { data: chatData, refetch } = useGetChatByIdQuery(
    selectedChatId ? { chatId: selectedChatId } : skipToken
  );

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  const currentMessages = chatData?.messages?.data || [];

  const selectedPersonData = chats.find(
    (chat) => chat.id === selectedChatId
  )?.peer_user;

  const safeSetSelectedChatId = (id: number) => setSelectedChatId?.(id);
  const safeSetCurrentUserId = (id: number) => setCurrentUserId?.(id);

  const handleSendMessage = async (
    type: MessageType = "text",
    payload?: File | string
  ) => {
    if (!selectedChatId || !currentUserId) return;

    try {
      if (type === "text") {
        const messageText = (payload as string) || (newMessage as string);
        if (!messageText.trim()) return;

        await sendMessage({
          user_id: currentUserId,
          chat_id: selectedChatId,
          message: messageText,
          type,
        }).unwrap();
      } else if (type === "file" || type === "image") {
        if (!payload) return;
        const formData = new FormData();
        formData.append("user_id", String(currentUserId));
        formData.append("chat_id", String(selectedChatId));
        formData.append("type", type);
        formData.append("message", payload as File);

        await sendMessage(formData).unwrap();
      } else if (type === "location") {
        const locationPayload =
          typeof payload === "string" ? payload : JSON.stringify(payload);
        await sendMessage({
          user_id: currentUserId,
          chat_id: selectedChatId,
          message: locationPayload,
          type,
        }).unwrap();
      }

      setNewMessage("");
      refetch?.();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage("text");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 lg:gap-0">
      <ContactsUsersMessage
        selectedChatId={selectedChatId ?? null}
        setSelectedChatId={safeSetSelectedChatId}
        setCurrentUserId={safeSetCurrentUserId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        chats={chats}
      />

      {selectedChatId ? (
        <ChatMessages
          currentMessages={currentMessages}
          selectedPersonData={selectedPersonData}
          handleKeyPress={handleKeyPress}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          isLoading={isSending}
          currentUserId={currentUserId}
          typeMessage={typeMessage}
          setTypeMessage={setTypeMessage}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#F6FEF9]">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {lang === "ar"
                ? "اختر محادثة للبدء"
                : "Select a conversation to start"}
            </h3>
            <p className="text-gray-500">
              {lang === "ar"
                ? "اختر محادثة من القائمة لبدء المراسلة"
                : "Choose a conversation from the list to start messaging"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

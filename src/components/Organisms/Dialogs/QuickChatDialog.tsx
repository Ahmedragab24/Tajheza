"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetChatByIdQuery,
  useSendMessageMutation,
} from "@/store/services/Chat";
import { MessageType } from "@/types/Chat";
import { useTranslations } from "next-intl";
import ChatMessages from "@/components/Molecules/Chat/ChatMessages";

interface QuickChatDialogProps {
  isText: boolean;
  phone: string;
  userId: number;
  productId?: number | null;
  children?: React.ReactNode;
}

const QuickChatDialog = ({
  isText,
  phone,
  userId,
  productId,
  children,
}: QuickChatDialogProps) => {
  const t = useTranslations("chat");
  const [chatId, setChatId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState<string | File>("");
  const [typeMessage, setTypeMessage] = useState<MessageType>("text");

  const {
    data: chatData,
    refetch,
    isLoading,
    error,
  } = useGetChatByIdQuery(chatId ? { chatId, userId: userId } : skipToken);

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  const currentMessages = chatData?.messages?.data || [];
  const selectedPersonData = { phone: phone, userId: userId };

  const handleSendMessage = async (
    type: MessageType = "text",
    payload?: File | string
  ) => {
    try {
      if (type === "text") {
        const messageText = (payload as string) || (newMessage as string);
        if (!messageText.trim()) return;

        const res = await sendMessage({
          user_id: userId || 0,
          chat_id: chatId ? chatId : undefined,
          message: messageText,
          type,
          product_id: productId ? productId : null,
        }).unwrap();
        setChatId(res?.messages?.chat_id);
      } else if (type === "file" || type === "image") {
        if (!payload) return;
        const formData = new FormData();
        formData.append("user_id", String(userId || 0));
        if (chatId) formData.append("chat_id", String(chatId));
        if (productId) formData.append("product_id", String(productId));
        formData.append("type", type);
        formData.append("message", payload as File);

        await sendMessage(formData).unwrap();
      } else if (type === "location") {
        const locationPayload =
          typeof payload === "string" ? payload : JSON.stringify(payload);
        await sendMessage({
          user_id: userId || 0,
          chat_id: chatId ? chatId : undefined,
          message: locationPayload,
          type,
          product_id: productId ? productId : null,
        }).unwrap();
      }

      setNewMessage("");
      refetch?.();
    } catch (error) {
      console.error("❌ Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage("text");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/Icons/proicons_chat.svg"
              alt="Chat"
              width={25}
              height={25}
              className="w-3 h-3 md:w-5 md:h-5"
            />
            {isText && <h4 className="text-[10px] md:text-sm">{t("title")}</h4>}
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {isLoading && (
            <main className="Container pt-28 mb-16">
              <div className="flex items-center justify-center h-[80vh]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-500">{t("loading")}</p>
                </div>
              </div>
            </main>
          )}

          {error && (
            <main className="Container pt-28 mb-16">
              <div className="flex items-center justify-center h-[80vh]">
                <div className="text-center">
                  <p className="text-red-500 mb-4">{t("error")}</p>
                  <Button onClick={() => window.location.reload()}>
                    {t("retry")}
                  </Button>
                </div>
              </div>
            </main>
          )}

          {currentMessages && (
            <ChatMessages
              selectedPersonData={selectedPersonData}
              currentMessages={currentMessages}
              handleKeyPress={handleKeyPress}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              isLoading={isSending}
              typeMessage={typeMessage}
              setTypeMessage={setTypeMessage}
            />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QuickChatDialog;

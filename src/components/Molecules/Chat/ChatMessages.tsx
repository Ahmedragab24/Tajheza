/* eslint-disable @typescript-eslint/no-explicit-any */

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { MoreHorizontal, File as FileIcon, Trash } from "lucide-react";
import type React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageType, ShowChatType } from "@/types/Chat";
import { useDeleteChatMutation } from "@/store/services/Chat";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { ErrorType } from "@/types/Errors";
import { LangType } from "@/types/globals";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import MessageInput from "@/components/Atoms/inputs/MessageInput";

interface Props {
  selectedPersonData: any;
  currentMessages: ShowChatType[];
  handleKeyPress: (e: React.KeyboardEvent) => void;
  newMessage: string | File;
  setNewMessage: (message: string | File) => void;
  handleSendMessage: () => void;
  isLoading?: boolean;
  currentUserId?: number;
  typeMessage?: MessageType;
  setTypeMessage?: (type: MessageType) => void;
}

const ChatMessages = ({
  currentMessages,
  selectedPersonData,
  handleKeyPress,
  newMessage,
  setNewMessage,
  handleSendMessage,
  isLoading = false,
  typeMessage,
  setTypeMessage,
}: Props) => {
  const lang = useLocale() as LangType;
  const [DeleteChat] = useDeleteChatMutation();
  const { data } = useGetUserInfoQuery();
  const myId = data?.data?.user.id;

  const handleDeleteChat = async () => {
    try {
      await DeleteChat(currentMessages[0]?.chat_id || 0).unwrap();
      toast.success(lang === "ar" ? "تم حذف المحادثة" : "Conversation deleted");
    } catch (error) {
      const err = error as ErrorType;
      toast.error(
        err?.data?.message ||
          (lang === "ar" ? "حدث خطأ غير متوقع" : "Unexpected error occurred")
      );
    }
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /** عرض محتوى الرسالة بناءً على النوع */
  const renderMessageContent = (message: ShowChatType) => {
    switch (message?.type) {
      case "image":
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={message?.message}
            alt={lang === "ar" ? "صورة مرسلة" : "Sent image"}
            className="rounded-lg max-w-[220px] max-h-[220px] object-cover cursor-pointer hover:opacity-90 transition"
          />
        );
      case "file":
        return (
          <div
            onClick={() => handleDownload(message?.message)}
            className="flex items-center gap-2 text-sm underline hover:text-primary cursor-pointer"
          >
            <FileIcon className="w-4 h-4" />
            {lang === "ar" ? "تحميل الملف" : "Download file"}
          </div>
        );
      case "location":
        const [lat, lng] = message?.message?.split(",") || [];
        const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
        return (
          <div className="w-[250px] h-[180px] rounded-lg overflow-hidden border">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        );
      default:
        return <p className="text-sm break-words">{message?.message}</p>;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F6FEF9] rounded-2xl shadow-lg min-h-[60vh] max-h-[85vh] overflow-y-scroll">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={
                selectedPersonData?.profile?.image ||
                selectedPersonData?.image ||
                "/placeholder.svg"
              }
            />
            <AvatarFallback>
              {selectedPersonData?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{selectedPersonData?.name}</h3>
            <p className="text-right text-sm text-gray-500">
              {selectedPersonData?.isOnline
                ? lang === "ar"
                  ? "متصل الآن"
                  : "Online now"
                : lang === "ar"
                ? "غير متصل"
                : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <DropdownMenu dir={lang === "ar" ? "rtl" : "ltr"}>
            <DropdownMenuTrigger>
              <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-4">
              <DropdownMenuLabel
                className="flex items-center justify-center gap-2 text-red-500 cursor-pointer"
                onClick={() => handleDeleteChat()}
              >
                {lang === "ar" ? "حذف" : "Delete"}
                <Trash className="w-4 h-4 ml-2" />
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      {currentMessages?.length === 0 && (
        <p className="pt-20 flex-1 flex items-center text-center justify-center text-gray-500">
          {lang === "ar" ? "لا يوجد رسائل" : "No messages"} <br />
          {lang === "ar"
            ? "قم بكتابة رسالتك الأولي"
            : "Start by writing your first message"}
        </p>
      )}

      <div className="flex-1 overflow-y-auto p-4 gap-4 flex flex-col-reverse">
        {currentMessages?.map((message: ShowChatType) => {
          const isMyMessage = message?.user?.id === myId;

          return (
            <div
              key={message?.id}
              className={`flex items-end gap-2 ${
                isMyMessage ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar */}
              {!isMyMessage && (
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={
                      selectedPersonData?.profile?.image ||
                      selectedPersonData?.image ||
                      "/placeholder.svg"
                    }
                  />
                  <AvatarFallback>
                    {selectedPersonData?.profile?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-md ${
                  isMyMessage
                    ? "bg-primary text-white rounded-bl-none"
                    : "bg-gray-200 text-gray-700 rounded-br-none"
                }`}
              >
                {renderMessageContent(message)}
                <p className="text-[11px] mt-1 opacity-70 text-right">
                  {new Date(message?.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* My Avatar */}
              {isMyMessage && (
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={data?.data?.user.image || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {data?.data?.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <MessageInput
        handleKeyPress={handleKeyPress}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
        typeMessage={typeMessage}
        setTypeMessage={setTypeMessage}
      />
    </div>
  );
};

export default ChatMessages;

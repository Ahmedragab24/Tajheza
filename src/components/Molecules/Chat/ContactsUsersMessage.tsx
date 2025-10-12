"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { MessagesSquare, Plus, Search } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { ChatType } from "@/types/Chat";
import { useMarkAsReadMutation } from "@/store/services/Chat";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";


interface Props {
  selectedChatId: number | null;
  setSelectedChatId: (chatId: number) => void;
  setCurrentUserId: (userId: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  chats: ChatType[];
}

const ContactsUsersMessage = ({
  selectedChatId,
  searchQuery,
  setSearchQuery,
  setSelectedChatId,
  setCurrentUserId,
  chats,
}: Props) => {
  const lang = useLocale() as LangType;
  const [open, setOpen] = useState(false);
  const [MarkRead] = useMarkAsReadMutation();

  const filteredChats = chats.filter((chat) =>
    chat.peer_user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = (chat: ChatType) => (
    <div
      key={chat.id}
      onClick={async () => {
        setSelectedChatId(chat.id);
        setCurrentUserId(chat.peer_user?.id);
        setOpen(false);
        await MarkRead(chat.id).unwrap();
      }}
      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
        selectedChatId === chat.id ? "bg-blue-50" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar>
            <AvatarImage src={chat.peer_user?.image || "/placeholder.svg"} />
            <AvatarFallback>{chat.peer_user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          {chat.unread_count > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {chat.unread_count}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-sm truncate">
              {chat.peer_user?.name}
            </h4>
            <span className="text-xs text-gray-500">
              {new Date(chat.last_message?.created_at).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate">
            {chat.last_message?.message}
          </p>
          <div className="flex items-center justify-between mt-2">
            {chat.unread_count > 0 && (
              <Badge variant="destructive" className="text-xs">
                {chat.unread_count}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Large Screen */}
      <div className="hidden lg:block w-full lg:w-80 border-l border-gray-200 max-h-[85vh] overflow-y-scroll">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="mb-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "ar" ? "ابحث عن مستخدم..." : "Search..."}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="overflow-y-auto">
          {filteredChats.map(renderChatItem)}
        </div>
      </div>

      {/*  Small Screen */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              {lang === "ar" ? "الرسائل" : "Messages"}
              <MessagesSquare />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {lang === "ar" ? "المحادثات" : "Conversations"}
              </SheetTitle>
            </SheetHeader>
            <div className="w-full border-l border-gray-200 max-h-[85vh] overflow-y-scroll">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Button size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 mx-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={
                          lang === "ar" ? "ابحث عن مستخدم..." : "Search..."
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contacts List */}
              <div className="overflow-y-auto">
                {filteredChats.map(renderChatItem)}
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">
                  {lang === "ar" ? "إغلاق" : "Close"}
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ContactsUsersMessage;

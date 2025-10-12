"use client";

import ConversationsApp from "@/components/Molecules/Chat/ConversationsApp";
import { Button } from "@/components/ui/button";
import { useGetAllChatsQuery } from "@/store/services/Chat";
import { LangType } from "@/types/globals";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  lang: LangType;
}

const ConversationsSection = ({ lang }: Props) => {
  const { data, isLoading, error } = useGetAllChatsQuery();
  const chats = React.useMemo(() => data?.chats || [], [data?.chats]);
  const [selectedChatId, setSelectedChatId] = React.useState<number | null>(
    null
  );
  const [currentUserId, setCurrentUserId] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (chats.length > 0 && !selectedChatId) {
      setSelectedChatId(chats[0].id);
      setCurrentUserId(chats[0].peer_user.id);
    }
  }, [chats, selectedChatId]);

  if (isLoading) {
    return (
      <main className="Container pt-28 mb-16">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">
              {lang === "ar"
                ? "جاري تحميل المحادثات..."
                : "Loading conversations..."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="Container pt-28 mb-16">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">
              {lang === "ar"
                ? "حدث خطأ في تحميل المحادثات"
                : "An error occurred while loading conversations"}
            </p>
            <Button onClick={() => window.location.reload()}>
              {lang === "ar" ? "إعادة المحاولة" : "Retry"}
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="space-y-4 lg:space-y-16">
        {chats && chats.length > 0 ? (
          <>
            <div className="pb-4 border-b border-gray-300">
              <h1 className="text-2xl font-bold">
                {lang === "ar" ? "المحادثات" : "Conversations"}
              </h1>
            </div>

            <ConversationsApp
              selectedChatId={selectedChatId || undefined}
              setSelectedChatId={setSelectedChatId}
              currentUserId={currentUserId || undefined}
              setCurrentUserId={setCurrentUserId}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/Images/delete-message 1.svg"
              alt="Conversations"
              width={180}
              height={180}
            />

            <p className="text-lg text-gray-500 text-center max-w-md">
              {lang === "ar"
                ? "ابدأ محادثتك الأولى الآن! تتيح لك ميزة المحادثات سهولة التواصل المباشر مع المالكين والمتقدمين، مما يساعدك على تبادل المعلومات بسرعة وبسلاسة."
                : "Start your first conversation now! The conversations feature makes it easy to communicate directly with owners and applicants, helping you exchange information quickly and smoothly."}
            </p>

            <Button className="!h-12 w-1/2">
              <Link href="/">
                {lang === "ar" ? "الصفحة الرئيسية" : "Home Page"}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ConversationsSection;

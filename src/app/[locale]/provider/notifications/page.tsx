"use client";

import NotificationCard from "@/components/Molecules/Cards/NotificationCard";
import ErrorGetData from "@/components/Molecules/ErrorGetData/ErrorGetData";
import NotFoundData from "@/components/Molecules/NotFoundData/NotFoundData";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllNotificationsQuery } from "@/store/services/Notifications";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import React from "react";

const NotificationsPage = () => {
  const lang = useLocale() as LangType;
  const { data, isLoading, isError } = useGetAllNotificationsQuery();
  const Notifications = data?.notifications || [];

  if (isError) return <ErrorGetData />;

  return (
    <div className="p-4 space-y-4">
      <p>
        {lang === "ar" ? "عدد الإشعارات" : "Number of notifications"} (
        {Notifications.length}) - {lang === "ar" ? "الغير مقروءة " : "Unread"} (
        {data?.countUnreadNotifications})
      </p>

      {!isLoading && Notifications.length === 0 && (
        <NotFoundData
          title={lang === "ar" ? "لا يوجد أشعارات" : "No notifications"}
          description={
            lang === "ar"
              ? "لا يوجد اي إشعارات حتي الان"
              : "There are no notifications yet."
          }
          image="/Images/bell (1) 1.png"
        />
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {!isLoading &&
          Notifications.length > 0 &&
          Notifications.map((item) => (
            <NotificationCard key={item.id} notification={item} lang={lang} />
          ))}

        {isLoading && (
          <>
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

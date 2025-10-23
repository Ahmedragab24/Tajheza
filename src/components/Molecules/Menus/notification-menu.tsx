"use client";

import { BellRing } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { useGetAllNotificationsQuery } from "@/store/services/Notifications";
import { NotificationType } from "@/types/Notifications";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import NotificationCard from "../Cards/NotificationCard";
import { useLocale } from "next-intl";
import RegisterDialog from "@/components/Organisms/Dialogs/RegisterDialog";
import { LangType } from "@/types/globals";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const NotificationsPopover = () => {
  const lang = useLocale() as LangType;
  const [open, changeOpen] = useState(false);

  const { data, isLoading } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 4000,
  });

  const AllNotifications: NotificationType[] = data?.notifications || [];
  const unreadCount = data?.countUnreadNotifications ?? 0;

  const token = getAuthTokenClient();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          {token ? (
            <Popover open={open} onOpenChange={changeOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="none"
                  className="relative"
                  aria-label={lang === "ar" ? "الإشعارات" : "Notifications"}
                >
                  <BellRing className="transition-colors duration-300" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                dir={lang === "ar" ? "rtl" : "ltr"}
                className="w-[320px] h-[420px] p-4 shadow-xl border border-gray-200 bg-background rounded-xl flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">
                    {lang === "ar" ? "الإشعارات" : "Notifications"}
                  </h3>
                  {unreadCount > 0 && (
                    <span className="text-xs text-gray-500">
                      {unreadCount} {lang === "ar" ? "غير مقروء" : "unread"}
                    </span>
                  )}
                </div>

                <div className="border-t mb-2"></div>

                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-[70px] rounded-lg" />
                      <Skeleton className="h-[70px] rounded-lg" />
                      <Skeleton className="h-[70px] rounded-lg" />
                    </>
                  ) : AllNotifications.length === 0 ? (
                    <div className="text-center text-sm text-gray-500 py-4">
                      {lang === "ar"
                        ? "لا توجد إشعارات حالياً"
                        : "No notifications yet"}
                    </div>
                  ) : (
                    AllNotifications.slice(0, 3).map(
                      (notification: NotificationType) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                          changeOpen={changeOpen}
                          lang={lang}
                        />
                      )
                    )
                  )}
                </div>

                {/* Footer */}
                {AllNotifications.length > 0 && (
                  <div className="pt-3 border-t mt-3">
                    <Link
                      href="/client/profile#notifications"
                      onClick={() => changeOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full text-sm text-primary hover:bg-primary/10"
                      >
                        {lang === "ar" ? "عرض الكل" : "View All"}
                      </Button>
                    </Link>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          ) : (
            <RegisterDialog>
              <Button
                variant="none"
                className="group rounded-full size-9 p-0"
                aria-label={lang === "ar" ? "الإشعارات" : "Notifications"}
              >
                <BellRing className="transition-colors duration-300 group-hover:text-primary" />
              </Button>
            </RegisterDialog>
          )}
        </TooltipTrigger>

        <TooltipContent>
          <p className="text-xs">
            {lang === "ar" ? "الإشعارات" : "Notifications"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NotificationsPopover;

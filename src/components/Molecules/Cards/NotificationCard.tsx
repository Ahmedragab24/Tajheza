"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  useDeleteNotificationMutation,
  useNotificationSpecificMarkReadMutation,
} from "@/store/services/Notifications";
import { ErrorType } from "@/types/Errors";
import { LangType } from "@/types/globals";
import { NotificationType } from "@/types/Notifications";
import { formatDistance, subDays } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Props {
  notification: NotificationType;
  changeOpen?: (value: boolean) => void;
  lang: LangType;
}

const NotificationCard = ({ notification, changeOpen, lang }: Props) => {
  const [DeleteNotification] = useDeleteNotificationMutation();
  const [MarkNotificationRead] = useNotificationSpecificMarkReadMutation();

  const isUnread = !notification.read_at;
  const title = notification.data.title_ar;
  const message = notification.data.message_ar;
  const userName = notification.data.user_name;
  const createdTime = formatDistance(subDays(new Date(), 3), new Date(), {
    addSuffix: true,
    locale: lang === "ar" ? ar : enUS,
  });

  const handleDeleteNotification = async () => {
    try {
      await DeleteNotification(notification.id).unwrap();
      toast.success(lang === "ar" ? "تم حذف الإشعار" : "");
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err?.data?.message || "حدث خطأ أثناء حذف الإشعار");
    }
  };

  const handleMarkRead = async (notification: NotificationType) => {
    try {
      await MarkNotificationRead(notification?.id).unwrap();
      changeOpen?.(false);
    } catch (err) {
      console.error("Mark read failed", err);
    }
  };

  return (
    <div
      onClick={() => handleMarkRead(notification)}
      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-primary/10 hover:shadow-md 
        ${isUnread ? "bg-gray-100" : "bg-white"} border border-gray-200`}
    >
      {/* Avatar Section - Made smaller */}
      <div className="relative flex-shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={"/placeholder.svg"} alt={userName} />
          <AvatarFallback className="bg-primary text-white font-semibold text-sm">
            {userName?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        {isUnread && (
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>

      {/* Content Section - Adjusted for mobile */}
      <div className="flex-1 text-right overflow-hidden">
        <div className="flex justify-between items-center mb-1">
          <div className="font-semibold text-gray-900 text-sm truncate">
            {title}
          </div>
          <div className=" hidden md:block text-xs text-gray-500 flex-shrink-0 mr-2">
            {createdTime}
          </div>
        </div>

        <p className="text-gray-700 text-xs leading-relaxed mb-2 line-clamp-2">
          {message}
        </p>

        <div className="flex justify-between items-center gap-2">
          <div className="md:hidden text-xs text-gray-500 flex-shrink-0 mr-2">
            {createdTime}
          </div>
          <div className="hidden md:block text-xs text-gray-500 flex-shrink-0 mr-2">
            {new Date(notification.created_at).toLocaleDateString("ar-En")}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:bg-red-100 h-8 px-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNotification();
            }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="ml-1 hidden sm:inline">حذف</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;

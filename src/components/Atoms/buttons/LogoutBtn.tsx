"use client";

import { useLogoutMutation } from "@/store/services/Auth/Auth";
import { ErrorType } from "@/types/Errors";

import {
  getAuthTokenClient,
  removeAuthTokenClient,
} from "@/lib/auth/auth-client";
import { toast } from "sonner";
import DeleteAlert from "@/components/Molecules/Alerts/DeleteAlert";
import { LangType } from "@/types/globals";
import { LogOutIcon } from "lucide-react";

interface Props {
  lang: LangType;
  handleOpenChange?: (value: boolean) => void;
}

const LogoutBtn = ({ lang, handleOpenChange }: Props) => {
  const [LogOut, { isLoading }] = useLogoutMutation();
  const handlerLogOut = async () => {
    const token = getAuthTokenClient() as string;
    try {
      await LogOut(token).unwrap();
      removeAuthTokenClient();
      toast.error(
        `${lang === "ar" ? "تم تسجيل الخروج" : "You are logged out"}`
      );
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      const err = error as ErrorType;
      toast.error(`${err?.data?.message}`);
    } finally {
      handleOpenChange?.(false);
    }
  };

  return (
    <DeleteAlert
      type="be sure"
      loading={isLoading}
      onDelete={handlerLogOut}
      AlertTitle={
        lang === "ar" ? "سيتم تسجيل خروجك !" : "You will be logged out!"
      }
      AlertDescription={
        lang === "ar"
          ? "هل انت متأكد من تسجيل الخروج؟"
          : "Are you sure you want to log out?"
      }
      lang={lang}
    >
      <div
        className={`flex items-center text-sm gap-1 p-2 rounded-md cursor-pointer transition-colors text-destructive`}
      >
        <LogOutIcon className="w-4 h-4" />
        <span className="font-medium text-xs ">
          {lang === "ar" ? "تسجيل الخروج" : "Logout"}
        </span>
      </div>
    </DeleteAlert>
  );
};

export default LogoutBtn;

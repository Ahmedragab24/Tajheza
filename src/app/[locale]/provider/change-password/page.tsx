import ChangePasswordForm from "@/components/Organisms/Forms/ChangePasswordForm";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import React from "react";

const ChangePasswordPage = () => {
  const lang = useLocale() as LangType;

  return (
    <div className="Container h-[80vh] flex justify-center items-center">
      <div className="md:w-2xl space-y-6 border p-4 rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl text-primary font-semibold">
            {lang === "ar" ? "تغير كلمة المرور" : "Change password"}
          </h1>
          <p className="text-sm text-gray-500 max-w-md text-center">
            {lang === "ar"
              ? "يمكنك تغيير كلمة المرور الخاصة بك ضع كلمة مرور قوية لزيادة الامان"
              : "You can change your password. Set a strong password for increased security."}
          </p>
        </div>
        <ChangePasswordForm lang={lang} />
      </div>
    </div>
  );
};

export default ChangePasswordPage;

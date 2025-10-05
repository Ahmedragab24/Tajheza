"use client";

import { Button } from "@/components/ui/button";
import { setAuthTokenClient } from "@/lib/auth/auth-client";
import { signInWithApple, signInWithGoogle } from "@/lib/firebaseConfig";
import { useSocialRegisterMutation } from "@/store/services/Auth/Auth";
import { SocialRegisterType } from "@/types/Auth/Auth";
import { ErrorType } from "@/types/Errors";
import { LangType } from "@/types/globals";
import { Loader } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  className?: string;
  setOpen: (open: boolean) => void;
}

const ProvidersBtns = ({ className, setOpen }: Props) => {
  const lang = useLocale() as LangType;
  const [SocialRegister] = useSocialRegisterMutation();
  const [loadingType, setLoadingType] = useState<"google" | "apple" | null>(
    null
  );

  const handleSocialRegister = async (type: "google" | "apple") => {
    setLoadingType(type);

    const userData =
      type === "google" ? await signInWithGoogle() : await signInWithApple();

    if (!userData?.user) {
      toast.error(lang === "ar" ? "فشل تسجيل الدخول" : "Login failed");
      setLoadingType(null);
      return;
    }

    const { user } = userData;

    try {
      const data: SocialRegisterType = {
        name: user.displayName || "",
        type: "user",
        email: user.email || "",
        login_type: type,
        password: "social-register",
        fcm: "adad",
      };

      const result = await SocialRegister(data).unwrap();
      setAuthTokenClient(result?.token);
      toast.success(
        lang === "ar" ? "تم التسجيل بنجاح" : "Registration successful"
      );
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error: unknown) {
      const err = error as ErrorType;
      toast.error(`${err?.data?.message || "Error occurred"}`);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Google Login */}
      <Button
        variant="outline"
        className="rounded-md h-11"
        onClick={() => handleSocialRegister("google")}
        disabled={loadingType !== null}
      >
        <Image
          src="/Icons/svgexport-15.svg"
          alt="google"
          width={15}
          height={15}
        />
        {loadingType === "google" ? (
          <div className="flex items-center gap-2">
            <h5 className="text-xs font-light">
              {lang === "ar" ? "جاري التحميل..." : "Loading..."}
            </h5>
            <Loader className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <h5 className="text-xs font-light">
            {lang === "ar" ? "التسجيل بواسطة جوجل" : "Login with Google"}{" "}
          </h5>
        )}
      </Button>

      {/* Apple Login */}
      <Button
        variant="outline"
        className="rounded-md h-11 font-light"
        onClick={() => handleSocialRegister("apple")}
        disabled={loadingType !== null}
      >
        <Image
          src="/Icons/svgexport-15 (1).svg"
          alt="apple"
          width={15}
          height={15}
        />
        {loadingType === "apple" ? (
          <div className="flex items-center gap-2">
            <h5 className="text-xs font-light">
              {lang === "ar" ? "جاري التحميل..." : "Loading..."}
            </h5>
            <Loader className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <h5 className="text-xs font-light">
            {lang === "ar" ? "التسجيل بواسطة ابل" : "Login with Apple"}
          </h5>
        )}
      </Button>
    </div>
  );
};

export default ProvidersBtns;

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useState } from "react";
import { Button } from "../../ui/button";
import LoginForm from "../Forms/Auth/LoginForm";
import { useLocale } from "next-intl";
import Logo from "@/components/Atoms/images/logo";
import RegisterForm from "../Forms/Auth/RegisterForm";
import OtpForm from "../Forms/Auth/OtpForm";
import ForgetPasswordForm from "../Forms/Auth/ForgetPasswordForm";
import ResetPasswordForm from "../Forms/Auth/ResetPasswordForm";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  children?: React.ReactNode;
}

export type TypeRegisterType =
  | "login"
  | "register"
  | "otp"
  | "forgetPassword"
  | "resetPassword";

const RegisterDialog = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TypeRegisterType>("login");
  const [phone, setPhone] = useState("");
  const lang = useLocale();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button size="sm" className="!text-xs md:!text-sm !h-9">
            {lang === "ar" ? "تسجيل الدخول" : "Login / Register"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className={`max-h-[90vh] md:max-h-[95vh] p-0 overflow-y-auto ${
          type !== "register" ? "!max-w-4xl" : "!max-w-5xl"
        }`}
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="px-4 py-4 w-full h-full overflow-y-auto">
            <DialogHeader className="flex flex-col justify-center items-center mb-2">
              <Logo isBg={false} />
              <DialogTitle className="text-lg font-medium text-gray-600">
                {type === "register" &&
                  (lang === "ar"
                    ? "مرحباً، أنشئ حساب جديد"
                    : "Create a new account")}
                {type === "login" &&
                  (lang === "ar"
                    ? "تسجيل الدخول لحسابك"
                    : "Login to your account")}
              </DialogTitle>
            </DialogHeader>

            {type === "login" && (
              <LoginForm setType={setType} setPhone={setPhone} />
            )}
            {type === "register" && (
              <RegisterForm setType={setType} setPhone={setPhone} />
            )}
            {type === "otp" && (
              <OtpForm
                phone={phone}
                setOpen={setOpen}
                type={type}
                setType={setType}
              />
            )}
            {type === "forgetPassword" && (
              <ForgetPasswordForm setType={setType} setPhone={setPhone} />
            )}
            {type === "resetPassword" && (
              <ResetPasswordForm phone={phone} setType={setType} />
            )}
          </div>

          <div className="bg-primary w-full md:w-1/2 h-50 md:h-full p-4 flex justify-center items-center">
            <div className="relative w-[150px] h-[100px] md:w-[400px] md:h-[250px]">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full relative"
              >
                <Image
                  src={`/Images/${
                    type === "otp"
                      ? "Wavy_Bus-24_Single-10-Photoroom 1"
                      : type === "login" || type === "register"
                      ? "4793-Photoroom 1"
                      : "Wavy_Tech-24_Single-02-Photoroom 1"
                  }.png`}
                  alt="register"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/store/services/Auth/Auth";
import { setAuthTokenClient } from "@/lib/auth/auth-client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ErrorType } from "@/types/Errors";
import { LangType } from "@/types/globals";
import { TypeRegisterType } from "../../Dialogs/RegisterDialog";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const otpSchema = z.object({
  otp: z.string().length(6, {
    message: "OTP must be 6 digits / يجب أن يتكون الكود من 6 أرقام.",
  }),
  phone: z
    .string()
    .min(1, { message: "Phone is required / رقم الهاتف مطلوب." }),
});
type OtpFormValues = z.infer<typeof otpSchema>;

interface Props {
  phone: string;
  type: TypeRegisterType;
  setType: (open: TypeRegisterType) => void;
  setOpen: (open: boolean) => void;
}

const OtpForm = ({ phone, setOpen, type, setType }: Props) => {
  const lang = useLocale() as LangType;
  const [timer, setTimer] = useState<number>(20);
  const [formMessage, setFormMessage] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [ResendOtp, { isLoading: isSending }] = useResendOtpMutation();

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
      phone: phone || "",
    },
    mode: "onChange",
  });

  const currentOtpValue = watch("otp");

  useEffect(() => {
    setValue("phone", phone || "");
  }, [phone, setValue]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = async (values: OtpFormValues) => {
    setFormMessage(null);

    const data = new FormData();

    data.append("phone", values.phone);
    data.append("code", values.otp);

    try {
      const res = await verifyOtp(data).unwrap();
      setFormMessage({
        message:
          lang === "ar"
            ? "تم التحقق من الكود بنجاح ✅"
            : "Verification successful ✅",
        success: true,
      });
      toast.success(
        lang === "ar"
          ? "تم التحقق من الكود بنجاح ✅"
          : "Verification successful ✅"
      );
      setAuthTokenClient(res?.token);

      if (type === "forgetPassword") {
        setType("resetPassword");
      } else {
        setOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    } catch (error) {
      const err = error as ErrorType;
      const errorMessage =
        err?.data?.message ||
        (lang === "ar"
          ? "فشل التحقق من الكود. حاول مرة أخرى."
          : "OTP verification failed. Try again.");
      setFormMessage({ message: errorMessage, success: false });
      toast.error(errorMessage);
    }
  };

  const handleResendCode = async () => {
    if (timer > 0 || !phone) return;

    const data = new FormData();

    data.append("phone", phone);
    data.append("code", "9999");

    try {
      const res = await ResendOtp(data).unwrap();
      setTimer(20);
      setValue("otp", "");
      setFormMessage({
        message:
          lang === "ar"
            ? "تم إرسال الكود مرة أخرى 📩"
            : "Verification code resent 📩",
        success: true,
      });
      toast.success(res?.message);
    } catch (error) {
      const err = error as ErrorType;
      const errorMessage =
        err?.data?.message ||
        (lang === "ar"
          ? "فشل في إعادة إرسال الكود. حاول لاحقًا."
          : "Failed to resend code. Please try again later.");
      setFormMessage({ message: errorMessage, success: false });
      toast.error(errorMessage);
    }
  };

  const isResendDisabled = timer > 0 || isSubmitting || isSending;
  const isSubmitDisabled =
    isSubmitting || isVerifying || currentOtpValue.length !== 6 || !!errors.otp;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 text-center">
        <h4 className="text-sm text-gray-400">
          {lang === "ar"
            ? "تم إرسال كود التفعيل على رقم الجوال:"
            : "Verification code has been sent to:"}
        </h4>
        <span className="font-semibold text-base">{phone || "+966..."}</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" dir="ltr">
        <input type="hidden" {...register("phone")} />

        <div className="space-y-2">
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={field.value}
                onChange={field.onChange}
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {errors.otp && (
            <p className="text-center text-red-500 text-sm">
              {errors.otp.message}
            </p>
          )}
        </div>

        <p className="text-center text-gray-500 text-sm">
          {lang === "ar"
            ? "ستنتهي صلاحية الكود خلال"
            : "The code will expire in"}{" "}
          <span className="mx-1 font-bold text-destructive">
            00:{timer.toString().padStart(2, "0")}
          </span>
        </p>

        {formMessage && (
          <div
            className={`text-center text-sm ${
              formMessage.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {formMessage.message}
          </div>
        )}

        <div className="space-y-2">
          <Button
            type="submit"
            className="h-11 w-full rounded-md"
            disabled={isSubmitDisabled}
          >
            {isVerifying
              ? lang === "ar"
                ? "جاري التحقق..."
                : "Verifying..."
              : lang === "ar"
              ? "المتابعة"
              : "Continue"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleResendCode}
            disabled={isResendDisabled}
            className="h-11 w-full"
          >
            {isSending
              ? lang === "ar"
                ? "جاري الإرسال..."
                : "Sending..."
              : lang === "ar"
              ? `أعد إرسال الرمز ${timer > 0 ? `(${timer})` : ""}`
              : `Resend code ${timer > 0 ? `(${timer})` : ""}`}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OtpForm;

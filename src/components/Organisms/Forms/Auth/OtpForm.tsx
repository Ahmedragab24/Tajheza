"use client";

import React, { useEffect, useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { verifyOtpAction } from "@/components/actions/verifyOtpAction";

interface Props {
  phone: string;
  type: string;
  setType: (type: string) => void;
  setOpen: (open: boolean) => void;
}

export default function OtpForm({ phone, setOpen, type, setType }: Props) {
  const lang = useLocale();
  const [timer, setTimer] = useState<number>(30);

  const [state, formAction, isPending] = useActionState(verifyOtpAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(
        lang === "ar" ? "تم التحقق بنجاح ✅" : "Verification successful ✅"
      );
      if (type === "forgetPassword") {
        setType("resetPassword");
      } else {
        setOpen(false);
        setTimeout(() => window.location.reload(), 1000);
      }
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, setOpen, setType, type, lang]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <form
      action={formAction}
      className="w-full max-w-md mx-auto bg-card p-8 rounded-2xl shadow-md border border-border space-y-6"
    >
      <input type="hidden" name="phone" value={phone} />

      <div className="space-y-2 text-center">
        <InputOTP
          name="otp"
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          aria-label="One-Time Password"
        >
          <InputOTPGroup className="gap-2 justify-center">
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-11 h-12 border rounded-lg text-center"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        {lang === "ar" ? "ستنتهي صلاحية الكود خلال" : "Code will expire in"}{" "}
        <span className="font-semibold text-destructive">
          00:{timer.toString().padStart(2, "0")}
        </span>
      </p>

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full text-base rounded-lg"
      >
        {isPending ? "..." : lang === "ar" ? "تأكيد الكود" : "Verify Code"}
      </Button>
    </form>
  );
}

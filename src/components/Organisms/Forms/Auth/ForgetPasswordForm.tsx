"use client";

import React from "react";
import { TypeRegisterType } from "../../Dialogs/RegisterDialog";
import { useForgotPasswordMutation } from "@/store/services/Auth/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "../../../ui/form";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { ErrorType } from "@/types/Errors";
import CustomPhoneInput from "@/components/Molecules/FormItems/CustomPhoneInput";
import { ForgetPasswordFormSchema } from "@/schemas/ForgetPasswordFormSchema";
import SubmitBtn from "@/components/Atoms/buttons/SubmitBtn";
import { LangType } from "@/types/globals";

interface Props {
  setType: (type: TypeRegisterType) => void;
  setPhone: (phone: string) => void;
}

const ForgetPasswordForm = ({ setPhone, setType }: Props) => {
  const lang = useLocale() as LangType;
  const [ForgetPassword, { isLoading }] = useForgotPasswordMutation();
  const form = useForm<z.infer<typeof ForgetPasswordFormSchema>>({
    resolver: zodResolver(ForgetPasswordFormSchema),
    defaultValues: {
      phone: {
        iso_code: "",
        number: "",
      },
    },
  });

  async function onSubmit(values: z.infer<typeof ForgetPasswordFormSchema>) {
    try {
      await ForgetPassword({
        phone: values.phone.iso_code + values.phone.number,
      }).unwrap();

      toast.success(
        lang === "ar" ? "تم إرسال رمز التحقق" : "Verification code sent"
      );
      setPhone(values.phone.iso_code + values.phone.number);
      setType("otp");
    } catch (error: unknown) {
      const err = error as ErrorType;
      const firstError =
        err?.data?.errors && Object.values(err.data.errors)[0]?.[0];

      toast.error(
        lang === "ar"
          ? firstError || "حدث خطأ غير متوقع"
          : firstError || "An unexpected error occurred"
      );
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-4 bg-muted px-2 py-4 md:p-6 rounded-xl shadow-md">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <CustomPhoneInput
                field={field}
                label={lang === "ar" ? "رقم الهاتف" : "Phone number"}
              />
            )}
          />

          <SubmitBtn
            title={lang === "ar" ? "إرسال" : "Send"}
            disabled={isLoading}
            loading={isLoading}
          />
        </form>

        <div className="flex justify-center items-center gap-1 text-xs">
          <p className="text-foreground">
            {lang === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"}
          </p>
          <span
            className="text-primary cursor-pointer hover:underline"
            onClick={() => setType("register")}
          >
            {lang === "ar" ? "قم بالتسجيل الآن" : "Register now"}
          </span>
        </div>
      </div>
    </Form>
  );
};

export default ForgetPasswordForm;

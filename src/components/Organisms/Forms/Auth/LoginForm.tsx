"use client";

import React from "react";
import { TypeRegisterType } from "../../Dialogs/RegisterDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "../../../ui/form";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import ProvidersBtns from "@/components/Molecules/BtnsGroup/ProvidersBtns";
import OrBadge from "@/components/Atoms/badges/OrBadge";
import SubmitBtn from "@/components/Atoms/buttons/SubmitBtn";
import { ErrorType } from "@/types/Errors";
import { LangType } from "@/types/globals";
import CustomPhoneInput from "@/components/Molecules/FormItems/CustomPhoneInput";
import CustomFormItem from "@/components/Molecules/FormItems/CustomFromItem";
import { loginFormSchema } from "@/schemas/loginFormSchema";
import { useLoginMutation } from "@/store/services/Auth/Auth";

interface Props {
  setType: (type: TypeRegisterType) => void;
  setPhone: (phone: string) => void;
}

const LoginForm = ({ setType, setPhone }: Props) => {
  const [login, { isLoading }] = useLoginMutation();
  const lang = useLocale() as LangType;

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone: {
        iso_code: "",
        number: "",
      },
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const data = new FormData();
    data.append("phone", values.phone.iso_code + values.phone.number);
    data.append("password", values.password);
    data.append("device_id", "asdasd");
    data.append("fcm_token", "asdasd");

    try {
      await login(data).unwrap();

      toast.success(lang === "en" ? "Code sent" : "تم ارسال رمز التحقق");
      setPhone(values.phone.iso_code + values.phone.number);
      setType("otp");
    } catch (error: unknown) {
      const err = error as ErrorType;
      const firstError =
        err?.data?.errors && Object.values(err.data.errors)[0]?.[0];

      toast.error(
        lang === "en"
          ? firstError || err.data.message
          : firstError || err.data.message
      );
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-4 bg-muted px-2 py-4 md:p-6 rounded-xl shadow-md">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <CustomFormItem
                  field={field}
                  label={lang === "ar" ? "كلمة المرور" : "Password"}
                  placeholder={
                    lang === "ar" ? "أدخل كلمة المرور" : "Enter your password"
                  }
                  type="password"
                />
              )}
            />
          </div>

          <p
            className="mt-2 mb-4 text-sm text-primary font-light hover:underline cursor-pointer"
            onClick={() => setType("forgetPassword")}
          >
            {lang === "ar" ? "نسيت كلمة المرور؟" : "Forgot your password?"}
          </p>

          <SubmitBtn
            title={lang === "ar" ? "تسجيل الدخول" : "Login"}
            disabled={isLoading}
            loading={isLoading}
          />
        </form>

        <OrBadge lang={lang} />

        <ProvidersBtns setOpen={() => false} />

        <div className="flex justify-center items-center gap-1 text-xs">
          <p className="text-foreground">
            {lang === "ar" ? "ليس لديك حساب؟" : "Don’t have an account?"}
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

export default LoginForm;

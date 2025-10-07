"use client";

import React from "react";
import { TypeRegisterType } from "../../Dialogs/RegisterDialog";
import { useResetPasswordMutation } from "@/store/services/Auth/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "../../../ui/form";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { ErrorType } from "@/types/Errors";
import { ResetPasswordFormSchema } from "@/schemas/ResetPasswordFormSchema";
import CustomFormItem from "@/components/Molecules/FormItems/CustomFromItem";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { LangType } from "@/types/globals";
import SubmitBtn from "@/components/Atoms/buttons/SubmitBtn";

interface Props {
  setType: (type: TypeRegisterType) => void;
  phone: string;
}

const ResetPasswordForm = ({ phone, setType }: Props) => {
  const lang = useLocale() as LangType;
  const token = getAuthTokenClient();
  const [ResetPassword, { isLoading }] = useResetPasswordMutation();
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      new_password: "",
      new_password_confirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordFormSchema>) {
    console.log(values);

    const data = new FormData();
    data.append("phone", phone);
    data.append("new_password", values.new_password);
    data.append("new_password_confirmation", values.new_password_confirmation);

    try {
      await ResetPassword({ body: data, token }).unwrap();

      toast.success(
        lang === "en" ? "The password has been changed." : "تم تغير كلمة السر"
      );

      setType("login");
    } catch (error: unknown) {
      const err = error as ErrorType;
      const firstError =
        err?.data?.errors && Object.values(err.data.errors)[0]?.[0];

      toast.error(
        lang === "en"
          ? firstError || "An unexpected error occurred"
          : firstError || "حدث خطأ غير متوقع"
      );
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-4 bg-muted px-2 py-4 md:p-6 rounded-xl shadow-md">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <CustomFormItem
                field={field}
                label={lang === "ar" ? "كلمة السر الجديدة" : "New password"}
                placeholder={
                  lang === "ar"
                    ? "ادخل كلمة السر الجديدة"
                    : "Enter new password"
                }
                type="password"
              />
            )}
          />

          <FormField
            control={form.control}
            name="new_password_confirmation"
            render={({ field }) => (
              <CustomFormItem
                field={field}
                label={
                  lang === "ar"
                    ? "تأكيد كلمة السر الجديدة"
                    : "Confirm new password"
                }
                placeholder={
                  lang === "ar"
                    ? "ادخل كلمة السر الجديدة"
                    : "Enter new password"
                }
                type="password"
              />
            )}
          />

          <SubmitBtn
            title={lang === "ar" ? "حفظ" : "Save"}
            disabled={isLoading}
            loading={isLoading}
          />
        </form>
      </div>
    </Form>
  );
};

export default ResetPasswordForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangePasswordFormSchema } from "@/schemas/ChangePasswordFormSchema";
import { toast } from "sonner";
import { ErrorType } from "@/types/Errors";
import CustomFormItem from "@/components/Molecules/FormItems/CustomFromItem";
import { LangType } from "@/types/globals";
import { ChangePasswordType } from "@/types/Auth/Auth";
import { Form, FormField } from "@/components/ui/form";
import SubmitBtn from "@/components/Atoms/buttons/SubmitBtn";

interface Props {
  lang: LangType;
}

const ChangePasswordForm = ({ lang }: Props) => {
  const [ChangePassword, { isLoading }] = useChangePasswordMutation();
  const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ChangePasswordFormSchema>) {
    const data: ChangePasswordType = {
      current_password: values.oldPassword,
      new_password: values.newPassword,
      new_password_confirmation: values.confirmPassword,
    };
    try {
      const res = await ChangePassword(data).unwrap();
      toast.success(res.massage);
      form.reset();
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err?.data?.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-2xl mx-auto bg-background p-6 rounded-2xl shadow-md"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <CustomFormItem
              field={field}
              label={lang === "ar" ? "كلمة المرور الحالية" : "Current Password"}
              placeholder={
                lang === "ar" ? "أدخل كلمة المرور" : "Enter your password"
              }
              type="password"
            />
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <CustomFormItem
              field={field}
              label={lang === "ar" ? "كلمة المرور الجديدة" : "New Password"}
              placeholder={
                lang === "ar"
                  ? "أدخل كلمة المرور الجديدة"
                  : "Enter new password"
              }
              type="password"
            />
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <CustomFormItem
              field={field}
              label={
                lang === "ar"
                  ? "تأكيد كلمة المرور الجديدة"
                  : "Confirm New Password"
              }
              placeholder={
                lang === "ar"
                  ? "أدخل كلمة المرور للتأكيد"
                  : "Re-enter new password"
              }
              type="password"
            />
          )}
        />
        <SubmitBtn
          title={lang === "ar" ? "حفظ" : "Save"}
          disabled={isLoading}
          loading={isLoading}
          className="!h-12"
        />
      </form>
    </Form>
  );
};

export default ChangePasswordForm;

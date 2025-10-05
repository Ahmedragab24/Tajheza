"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "../../../ui/form";
import Image from "next/image";
import { Button } from "../../../ui/button";
import { TypeRegisterType } from "../../Dialogs/RegisterDialog";
import { useRegisterMutation } from "@/store/services/Auth/Auth";
import { registerFormSchema } from "@/schemas/RegisterFormSchema";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { ErrorType } from "@/types/Errors";
import CustomFormItem from "@/components/Molecules/FormItems/CustomFromItem";
import CustomPhoneInput from "@/components/Molecules/FormItems/CustomPhoneInput";
import { LangType } from "@/types/globals";
import { MembershipType } from "@/types/Auth/Auth";
import SubmitBtn from "@/components/Atoms/buttons/SubmitBtn";
import OrBadge from "@/components/Atoms/badges/OrBadge";
import CustomSelectField from "@/components/Molecules/Selects/CustomSelectField";
import { MembershipsList } from "@/constants/Memberships";
import { CircleUser } from "lucide-react";
import AcceptanceTermsCheckbox from "@/components/Molecules/Checkboxs/AcceptanceTermsCheckbox";
import z from "zod";

interface RegisterFormProps {
  setType: (value: TypeRegisterType) => void;
  setPhone: (value: string) => void;
}

const RegisterForm = ({ setType, setPhone }: RegisterFormProps) => {
  const lang = useLocale() as LangType;
  const [Register, { isLoading }] = useRegisterMutation();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: {
        iso_code: "+966",
        number: "",
      },
      membership: "user" as MembershipType,
      password: "",
      Confirm_password: "",
      device_id: "",
      acceptanceTerms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log("values", values);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone.iso_code + values.phone.number);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.Confirm_password);
    formData.append("type", values.membership);
    formData.append("device_id", values.device_id || "");
    formData.append("fcm_token", "dasdasd");

    try {
      await Register(formData).unwrap();
      toast.success(
        lang === "ar" ? "تم التسجيل بنجاح" : "Registration successful"
      );
      setPhone(values.phone.iso_code + values.phone.number);
      setType("login");
    } catch (error) {
      const err = error as ErrorType;
      const firstError =
        err.data?.message ||
        (lang === "ar" ? "حدث خطأ غير متوقع" : "Unexpected error occurred");
      toast.error(firstError);
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-4 bg-muted px-4 py-4 md:p-6 rounded-xl shadow-md">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <CustomFormItem
                  field={field}
                  label={lang === "ar" ? "الأسم كاملاً" : "Full name"}
                  placeholder={lang === "ar" ? "ادخل الأسم" : "Enter your name"}
                  type="text"
                  icon={
                    <Image
                      src="/Icons/User.svg"
                      alt="membership"
                      width={20}
                      height={20}
                    />
                  }
                />
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <CustomFormItem
                  field={field}
                  label={lang === "ar" ? "البريد الإلكتروني" : "Email"}
                  placeholder={
                    lang === "ar"
                      ? "ادخل البريد الإلكتروني"
                      : "Enter your email"
                  }
                  type="email"
                  icon={
                    <Image
                      src="/Icons/Email.svg"
                      alt="membership"
                      width={20}
                      height={20}
                    />
                  }
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <CustomPhoneInput
                  field={field}
                  label={lang === "ar" ? "رقم الجوال" : "Phone number"}
                />
              )}
            />

            <FormField
              control={form.control}
              name="membership"
              render={({ field }) => (
                <CustomSelectField
                  field={field}
                  label={lang === "ar" ? "نوع الحساب" : "account type"}
                  options={MembershipsList}
                  placeholder={
                    lang === "ar" ? "اختر نوع الحساب" : "Choose account type"
                  }
                  icon={<CircleUser className="w-4.5 h-4.5 text-primary" />}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
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
                  icon={
                    <Image
                      src="/Icons/mdi_password.svg"
                      alt="membership"
                      width={20}
                      height={20}
                    />
                  }
                />
              )}
            />

            <FormField
              control={form.control}
              name="Confirm_password"
              render={({ field }) => (
                <CustomFormItem
                  field={field}
                  label={
                    lang === "ar" ? "تأكيد كلمة المرور" : "Confirm password"
                  }
                  placeholder={
                    lang === "ar" ? "أدخل كلمة المرور" : "Enter your password"
                  }
                  type="password"
                  icon={
                    <Image
                      src="/Icons/mdi_password.svg"
                      alt="membership"
                      width={20}
                      height={20}
                    />
                  }
                />
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="acceptanceTerms"
            render={({ field }) => (
              <AcceptanceTermsCheckbox field={field} lang={lang} />
            )}
          />

          <SubmitBtn
            title={lang === "ar" ? "إنشاء حساب" : "Create an account"}
            loading={isLoading}
            disabled={isLoading}
          />
        </form>

        <OrBadge lang={lang} />

        <Button
          variant={"outline"}
          onClick={() => setType("login")}
          className="w-full h-11 text-primary hover:text-primary-80"
        >
          {lang === "ar" ? "تسجيل دخول" : "Login"}
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;

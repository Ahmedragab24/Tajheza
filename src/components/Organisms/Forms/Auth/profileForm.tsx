"use client";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import type { ErrorType } from "@/types/Errors";
import { useEffect } from "react";
import ProfileFormSkeleton from "@/components/Molecules/Skelatons/ProfileFormSkeleton";
import CustomFormItem from "@/components/Molecules/FormItems/CustomFromItem";
import CustomPhoneInput from "@/components/Molecules/FormItems/CustomPhoneInput";
import SubmitBtn from "@/components/Atoms/buttons/SubmitBtn";
import { ProfileType } from "@/types/Auth/Profile";
import { useUpdateProfileMutation } from "@/store/services/Auth/Profile";
import { ProfileFormSchema } from "@/schemas/ProfileFormSchema";
import UploadLogo from "../../Uploads/UploadLogo";
import { LangType } from "@/types/globals";

interface Props {
  userData: ProfileType | undefined;
}

const ProfileForm = ({ userData }: Props) => {
  const locale = useLocale() as LangType;
  const t = useTranslations("profile");
  const [updateUserData, { isLoading }] = useUpdateProfileMutation();

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      image: userData?.image || "",
      phone: {
        iso_code: "",
        number: userData?.phone || "",
      },
      name: userData?.name || "",
      email: userData?.email || "",
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        image: userData?.image || "",
        phone: {
          iso_code: "",
          number: userData?.phone || "",
        },
        name: userData?.name || "",
        email: userData?.email || "",
      });
    }
  }, [userData, form]);

  const onSubmit = async (data: z.infer<typeof ProfileFormSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name || "");
    formData.append("email", data.email || "");

    if (data?.phone) {
      formData.append(
        "phone",
        data?.phone?.iso_code + data?.phone?.number || ""
      );
    }

    if (data?.image) {
      formData.append("image", data?.image);
    }

    try {
      await updateUserData(formData).unwrap();
      toast.success(
        locale === "ar" ? "تم تحديث الملف الشخصي" : "Profile updated"
      );
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err?.data?.message || "حدث خطأ أثناء التحديث");
    }
  };

  if (!userData) return <ProfileFormSkeleton />;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-primary-foreground">
          {t("title")}
        </h1>
        <p className="text-gray-400 mt-2">{t("subtitle")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => <UploadLogo field={field} lang={locale} />}
          />

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <CustomFormItem
                  field={field}
                  type="text"
                  label={t("fullName")}
                  placeholder={t("enterFullName")}
                  className="!h-12"
                />
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <CustomFormItem
                  field={field}
                  type="email"
                  label={t("email")}
                  placeholder={t("enterEmail")}
                  className="!h-12"
                />
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <CustomPhoneInput
                  field={field}
                  label={t("phoneNumber")}
                  className="!h-12"
                />
              )}
            />
          </div>

          <div className="flex justify-center pt-6">
            <SubmitBtn
              title={t("updateProfile")}
              loading={isLoading}
              disabled={isLoading}
              className="w-full sm:w-[50%] h-13"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;

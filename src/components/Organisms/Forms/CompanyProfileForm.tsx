"use client";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import type { ErrorType } from "@/types/Errors";
import { useEffect } from "react";
import ProfileFormSkeleton from "@/components/Molecules/Skelatons/ProfileFormSkeleton";
import CustomFormItem from "@/components/Molecules/FormItems/CustomFromItem";
import SubmitBtn from "@/components/Atoms/buttons/SubmitBtn";
import { LangType } from "@/types/globals";
import UploadLogo from "../Uploads/UploadLogo";
import { ProviderCompanyInfoForUpdateType } from "@/types/ProviderCompany";
import { CompanyProfileFormSchema } from "@/schemas/CompanyProfileFormSchema";
import { useUpdateCompanyInfoMutation } from "@/store/services/Provider/Company";
import UploadCover from "../Uploads/UploadCover";
import SelectCity from "@/components/Molecules/Selects/SelectCity";
import z from "zod";

interface Props {
  companyInfo: ProviderCompanyInfoForUpdateType | undefined;
  setOpen: (value: boolean) => void;
}

const CompanyProfileForm = ({ companyInfo, setOpen }: Props) => {
  const locale = useLocale() as LangType;
  const t = useTranslations("profile");
  const [updateUserData, { isLoading }] = useUpdateCompanyInfoMutation();

  const form = useForm<z.infer<typeof CompanyProfileFormSchema>>({
    resolver: zodResolver(CompanyProfileFormSchema),
    defaultValues: {
      name: companyInfo?.name || "",
      logo: companyInfo?.logo || "",
      background: companyInfo?.background || "",
      commercial_number: companyInfo?.commercial_number || "",
      city_id: companyInfo?.city || "",
      description: companyInfo?.description || "",
    },
  });

  useEffect(() => {
    if (companyInfo) {
      form.reset({
        name: companyInfo?.name || "",
        logo: companyInfo?.logo || "",
        background: companyInfo?.background || "",
        commercial_number: companyInfo?.commercial_number || "",
        city_id: companyInfo?.city || "",
        description: companyInfo?.description || "",
      });
    }
  }, [companyInfo, form]);

  const onSubmit = async (data: z.infer<typeof CompanyProfileFormSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name || "");
    formData.append("commercial_number", data.commercial_number || "");
    formData.append("city_id", data.city_id || "");
    formData.append("description", data.description || "");

    if (data?.logo) {
      formData.append("logo", data?.logo);
    }
    if (data?.background) {
      formData.append("background", data?.background);
    }

    try {
      await updateUserData(formData).unwrap();
      toast.success(
        locale === "ar" ? "تم تحديث الملف الشخصي" : "Profile updated"
      );
      setOpen(false);
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err?.data?.message || "حدث خطأ أثناء التحديث");
    }
  };

  if (!companyInfo) return <ProfileFormSkeleton />;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => <UploadLogo field={field} lang={locale} />}
          />
          <FormField
            control={form.control}
            name="background"
            render={({ field }) => <UploadCover field={field} lang={locale} />}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              name="commercial_number"
              render={({ field }) => (
                <CustomFormItem
                  field={field}
                  type="number"
                  label={
                    locale === "ar" ? "رقم السجل التجاري" : "commercial number"
                  }
                  placeholder={
                    locale === "ar"
                      ? "ادخل الرقم التجاري"
                      : "Enter commercial number"
                  }
                  className="!h-12"
                />
              )}
            />
            <FormField
              control={form.control}
              name="city_id"
              render={({ field }) => (
                <SelectCity
                  value={field.value}
                  onChange={field.onChange}
                  label={locale === "ar" ? "المدينة" : "City"}
                  placeholder={
                    locale === "ar" ? "اختر المدينة" : "Selected City"
                  }
                  className="!h-12 bg-transparent border-gray-400"
                />
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <CustomFormItem
                field={field}
                type="text"
                label={locale === "ar" ? "نبذة عن الشركة" : "About the company"}
                placeholder={
                  locale === "ar"
                    ? "ادخل وصف للشركة"
                    : "Enter a company description"
                }
                className="!h-40"
                typeInput="textarea"
              />
            )}
          />

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

export default CompanyProfileForm;

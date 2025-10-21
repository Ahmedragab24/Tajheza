"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray, Resolver } from "react-hook-form";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import {
  useStoreProductMutation,
  useUpdateProductMutation,
} from "@/store/services/Provider/products";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X, Plus } from "lucide-react";
import type { ErrorType } from "@/types/Errors";
import type { LangType } from "@/types/globals";
import {
  AddProductFormSchema,
  AddProductFormType,
} from "@/schemas/AddProductFormSchema";
import MultiUploadImages from "../Uploads/MultiUploadImages";
import UploadCover from "../Uploads/UploadCover";
import SelectProductType from "@/components/Molecules/Selects/SelectProductType";
import CustomFormItem from "@/components/Molecules/FormItems/CustomFromItem";
import SelectCity from "@/components/Molecules/Selects/SelectCity";
import { ProductDetailsType } from "@/types/Products";
import { AddonsCheckbox } from "@/components/Molecules/Checkboxs/AddonsCheckbox";
import { TargetsCheckbox } from "@/components/Molecules/Checkboxs/TargetsCheckbox";

interface Props {
  setOpen?: (value: boolean) => void;
  product?: ProductDetailsType;
}

const AddProductForm: React.FC<Props> = ({ product, setOpen }) => {
  const [StoreProduct, { isLoading }] = useStoreProductMutation();
  const [UpdateProduct, { isLoading: UpdateLoading }] =
    useUpdateProductMutation();
  const lang = useLocale() as LangType;

  const form = useForm<AddProductFormType>({
    resolver: zodResolver(
      AddProductFormSchema
    ) as unknown as Resolver<AddProductFormType>,
    defaultValues: {
      title: product?.title ?? "",
      description: product?.description ?? "",
      serviceType: product?.service ? String(product.service.id) : "",
      price: product?.price ?? "",
      city: product?.city ?? "",
      from_time: product?.from_time ?? "",
      to_time: product?.to_time ?? "",
      work_days: product?.work_days ?? [],
      preferred_contact: product?.preferred_contact ?? "",
      mainImage: product?.main_image ?? null,
      additionalImages: product?.images ?? [],
      options: product?.options ?? [],
      addons: product?.addons?.map((a) => a.id) ?? [],
      targets: product?.targets ?? [],
    },
  });

  const WORK_DAYS = [
    { label: lang === "ar" ? "الأحد" : "Sunday", value: "sun" },
    { label: lang === "ar" ? "الأثنين" : "Monday", value: "mon" },
    { label: lang === "ar" ? "الثلاثاء" : "Tuesday", value: "tue" },
    { label: lang === "ar" ? "الأربعاء" : "Wednesday", value: "wed" },
    { label: lang === "ar" ? "الخميس" : "Thursday", value: "thu" },
    { label: lang === "ar" ? "الجمعة" : "Friday", value: "fri" },
    { label: lang === "ar" ? "السبت" : "Saturday", value: "sat" },
  ];

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const {
    fields: optionFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "options",
  });

  const buildFormData = (values: AddProductFormType): FormData => {
    const data = new FormData();

    // Basic fields
    data.append("service_id", String(values.serviceType));
    data.append("title", values.title);
    data.append("description", values.description);
    data.append("price", String(values.price));
    data.append("city", values.city);
    data.append("from_time", values.from_time);
    data.append("to_time", values.to_time);
    data.append("preferred_contact", values.preferred_contact || "");

    // work_days[] - repeated field
    (values.work_days || []).forEach((day) => {
      data.append("work_days[]", day);
    });

    // Main image
    if (values.mainImage instanceof File) {
      data.append("main_image", values.mainImage);
    }

    // Additional images - images[] repeated field
    if (values.additionalImages && Array.isArray(values.additionalImages)) {
      values.additionalImages.forEach((file) => {
        if (file instanceof File) {
          data.append("images[]", file);
        }
      });
    }
    // Options - options[index][name] and options[index][price]
    (values.options || []).forEach((option, index) => {
      data.append(`options[${index}][name]`, option.name);
      data.append(`options[${index}][price]`, String(option.price));
    });

    // Addons - addons[index][name] and addons[index][price]
    (values.addons || []).forEach((addon, index) => {
      data.append(`addons[${index}][name]`, addon.name);
      data.append(`addons[${index}][price]`, addon.price);
    });

    // Targets[] - repeated field
    (values.targets || []).forEach((target) => {
      data.append("targets[]", target);
    });

    return data;
  };

  async function onSubmit(values: AddProductFormType) {
    if (!product) {
      try {
        const formData = buildFormData(values);
        await StoreProduct(formData).unwrap();
        toast.success(
          lang === "ar"
            ? "تم إضافة الخدمة بنجاح"
            : "Service added successfully!"
        );
        form.reset();
      } catch (error) {
        const err = error as ErrorType;
        toast.error(
          err?.data?.message ||
            (lang === "ar" ? "حدث خطأ" : "An error occurred")
        );
      }
    } else {
      try {
        const formData = buildFormData(values);
        await UpdateProduct({
          body: formData,
          productId: product.id,
        }).unwrap();
        toast.success(
          lang === "ar" ? "تم تعديل الخدمة بنجاح" : "Service Edit successfully!"
        );
        setOpen?.(false);
        form.reset();
      } catch (error) {
        const err = error as ErrorType;
        toast.error(
          err?.data?.message ||
            (lang === "ar" ? "حدث خطأ" : "An error occurred")
        );
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto p-4 space-y-6"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            {lang === "ar" ? "إضافة خدمة جديدة" : "Add New Service"}
          </h1>
          <p className="text-muted-foreground">
            {lang === "ar"
              ? "قم بملء جميع التفاصيل لإضافة خدمتك"
              : "Fill in all details to add your service"}
          </p>
        </div>

        {/* Basic Information Tab */}
        <Card>
          <CardHeader>
            <CardTitle>
              {lang === "ar" ? "معلومات الخدمة" : "Service Information"}
            </CardTitle>
            <CardDescription>
              {lang === "ar"
                ? "أدخل التفاصيل الأساسية للخدمة"
                : "Enter basic service details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <CustomFormItem
                    field={field}
                    label={lang === "ar" ? "عنوان الخدمة" : "Service address"}
                    placeholder={
                      lang === "ar"
                        ? "ادخل عنوان الخدمة"
                        : "Enter the service address"
                    }
                    type="text"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => <SelectProductType field={field} />}
              />
            </div>

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {lang === "ar" ? "وصف الخدمة" : "Service Description"}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        lang === "ar"
                          ? "اشرح خدمتك بالتفصيل"
                          : "Describe your service in detail"
                      }
                      className="min-h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{lang === "ar" ? "السعر" : "Price"}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={
                          lang === "ar"
                            ? "ادخل السعر بالريال السعودي"
                            : "Enter the price In Saudi Riyals"
                        }
                        step="0.01"
                        min="10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <SelectCity
                    value={field.value}
                    onChange={field.onChange}
                    label={
                      lang === "ar"
                        ? `المدينة (${form.getValues("city") || ""}) `
                        : `City (${form.getValues("city") || ""})`
                    }
                    className="bg-transparent border-gray-400"
                  />
                )}
              />
            </div>

            <FormField
              control={control}
              name="preferred_contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {lang === "ar"
                      ? "طريقة التواصل المفضلة"
                      : "Preferred Contact Method"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        lang === "ar"
                          ? "مثال: واتساب، هاتف، بريد إلكتروني"
                          : "e.g., WhatsApp, Phone, Email"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="addons"
                render={({ field }) => (
                  <AddonsCheckbox
                    field={field}
                    label={lang === "ar" ? "إضافات" : "Addons"}
                  />
                )}
              />
              <FormField
                control={control}
                name="targets"
                render={({ field }) => (
                  <TargetsCheckbox
                    field={field}
                    label={lang === "ar" ? "الفئات المستهدفة" : "Target groups"}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Media Tab */}
        <Card>
          <CardHeader>
            <CardTitle>{lang === "ar" ? "الصور" : "Images"}</CardTitle>
            <CardDescription>
              {lang === "ar"
                ? "أضف صورة رئيسية وصور إضافية"
                : "Add main image and additional images"}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              {/* Main Image */}
              <FormField
                control={form.control}
                name="mainImage"
                render={({ field }) => (
                  <UploadCover
                    field={field}
                    lang={lang}
                    title={
                      lang === "ar"
                        ? "صورة الغلاف الرئيسية"
                        : "Main cover image"
                    }
                  />
                )}
              />
            </div>

            <div>
              {/* Additional Images */}
              <FormField
                control={form.control}
                name="additionalImages"
                render={({ field }) => (
                  <MultiUploadImages
                    field={field}
                    lang={lang}
                    title={lang === "ar" ? "صور إضافية" : "Additional images"}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule Tab */}
        <Card>
          <CardHeader>
            <CardTitle>
              {lang === "ar" ? "جدول العمل" : "Work Schedule"}
            </CardTitle>
            <CardDescription>
              {lang === "ar"
                ? "حدد أوقات وأيام العمل"
                : "Set your working hours and days"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Working Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="from_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {lang === "ar" ? "من الساعة" : "From Time"}
                    </FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="to_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {lang === "ar" ? "إلى الساعة" : "To Time"}
                    </FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Working Days */}
            <div className="space-y-3">
              <FormLabel className="text-base font-semibold">
                {lang === "ar" ? "أيام العمل" : "Working Days"}
              </FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {WORK_DAYS.map((day) => (
                  <label
                    key={day.value}
                    className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={(watch("work_days") || []).includes(day.value)}
                      onChange={(e) => {
                        const current = new Set(watch("work_days") || []);
                        if (e.target.checked) {
                          current.add(day.value);
                        } else {
                          current.delete(day.value);
                        }
                        setValue("work_days", Array.from(current), {
                          shouldValidate: true,
                        });
                      }}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium">{day.label}</span>
                  </label>
                ))}
              </div>
              {errors.work_days && (
                <p className="text-sm text-destructive">
                  {errors.work_days.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Options Tab */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {lang === "ar" ? "الخيارات والإضافات" : "Options & Add-ons"}
                </CardTitle>
                <CardDescription>
                  {lang === "ar"
                    ? "أضف خيارات تخصيص وإضافات اختيارية"
                    : "Add customization options and add-ons"}
                </CardDescription>
              </div>
              <Button
                type="button"
                onClick={() => append({ name: "", price: "" })}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                {lang === "ar" ? "إضافة خيار" : "Add Option"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {optionFields.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                {lang === "ar" ? "لا توجد خيارات حتى الآن" : "No options yet"}
              </p>
            ) : (
              <div className="space-y-4">
                {optionFields.map((field, idx) => (
                  <div
                    key={field.id}
                    className="flex gap-3 items-end p-4 border border-border rounded-lg bg-muted/50"
                  >
                    <Controller
                      control={control}
                      name={`options.${idx}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-xs">
                            {lang === "ar"
                              ? `الخيار ${idx + 1}`
                              : `Option ${idx + 1}`}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={
                                lang === "ar" ? "اسم الخيار" : "Option name"
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Controller
                      control={control}
                      name={`options.${idx}.price`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-xs">
                            {lang === "ar"
                              ? "السعر الإضافي"
                              : "Additional Price"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={lang === "ar" ? "السعر" : "Price"}
                              step="0.01"
                              min="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      onClick={() => remove(idx)}
                      variant="destructive"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-3 justify-center pt-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            {lang === "ar" ? "إعادة تعيين" : "Reset"}
          </Button>
          <Button
            type="submit"
            disabled={isLoading || UpdateLoading}
            className="gap-2 w-1/4"
          >
            {isLoading || UpdateLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-background border-t-foreground rounded-full animate-spin" />
                {lang === "ar" ? "جاري الحفظ..." : "Saving..."}
              </>
            ) : lang === "ar" ? (
              "حفظ الخدمة"
            ) : (
              "Save Service"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;

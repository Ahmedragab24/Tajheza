"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ErrorType } from "@/types/Errors";
import type { LangType } from "@/types/globals";
import UploadCover from "../Uploads/UploadCover";
import CustomFormItem from "@/components/Molecules/FormItems/CustomFromItem";
import {
  AddPackageFormSchema,
  AddPackageFormType,
} from "@/schemas/AddPackageFormSchema";
import { MultiSelectProducts } from "@/components/Molecules/Selects/SelectProducts";
import {
  useStorePackageMutation,
  useUpdatePackageMutation,
} from "@/store/services/Provider/Packages";
import { PackageType } from "@/types/Packages";

interface Props {
  setOpen?: (value: boolean) => void;
  packageData?: PackageType;
}

const AddPackageForm: React.FC<Props> = ({ packageData, setOpen }) => {
  const [StorePackage, { isLoading }] = useStorePackageMutation();
  const [UpdatePackage, { isLoading: UpdateLoading }] =
    useUpdatePackageMutation();
  const lang = useLocale() as LangType;

  const form = useForm<AddPackageFormType>({
    resolver: zodResolver(AddPackageFormSchema),
    defaultValues: {
      name: packageData ? packageData.name : "",
      description: packageData ? packageData.description : "",
      price: packageData ? packageData.price : "",
      discount_percentage: packageData ? packageData.discount_percentage : "",
      from_date: packageData ? packageData.from_date : "",
      to_date: packageData ? packageData.to_date : "",
      image: packageData ? packageData.to_date : undefined,
      product_ids: [],
    },
  });

  async function onSubmit(values: AddPackageFormType) {
    const data = new FormData();

    // Basic fields
    data.append("name", String(values.name));
    data.append("description", values.description);
    data.append("price", String(values.price));
    data.append("discount_percentage", String(values.discount_percentage));
    data.append("from_date", values.from_date);
    data.append("to_date", values.to_date);

    //  image
    if (values.image instanceof File) {
      data.append("main_image", values.image);
    }

    // product_ids[]
    (values.product_ids || []).forEach((product) => {
      data.append("product_ids[]", product);
    });

    if (!packageData) {
      try {
        await StorePackage(data).unwrap();
        toast.success(
          lang === "ar" ? "تم إضافة الباقة بنجاح" : "Package added successfully"
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
        await UpdatePackage({
          body: data,
          PackageId: packageData?.id,
        }).unwrap();
        toast.success(
          lang === "ar" ? "تم تعديل الباقة بنجاح" : "Package Edit successfully"
        );
        form.reset();
        setOpen?.(false);
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mx-auto p-4 space-y-6"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            {!packageData
              ? lang === "ar"
                ? "إضافة باقة جديدة"
                : "Add a new package"
              : lang === "ar"
              ? "تعديل الباقة"
              : "package Update"}
          </h1>
          <p className="text-muted-foreground">
            {!packageData
              ? lang === "ar"
                ? "قم بملء جميع التفاصيل لإضافة باقتك"
                : "Fill in all details to add your Package"
              : lang === "ar"
              ? "قم بتعديل التفاصيل"
              : "Edit the details"}
          </p>
        </div>

        {/* Basic Information Tab */}
        <Card>
          <CardHeader>
            <CardTitle>
              {lang === "ar" ? "معلومات الباقة" : "Service Package"}
            </CardTitle>
            <CardDescription>
              {lang === "ar" ? "أدخل تفاصيل الباقة" : "Enter Package details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <CustomFormItem
                    field={field}
                    label={lang === "ar" ? "اسم الباقة" : "Package name"}
                    placeholder={
                      lang === "ar"
                        ? "ادخل اسم الباقة"
                        : "Enter the Package name"
                    }
                    type="text"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="product_ids"
                render={({ field }) => <MultiSelectProducts field={field} />}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <CustomFormItem
                    field={field}
                    type="number"
                    label={lang === "ar" ? "السعر" : "Price"}
                    placeholder={
                      lang === "ar"
                        ? "ادخل السعر بالريال السعودي"
                        : "Enter the price In Saudi Riyals"
                    }
                  />
                )}
              />

              <FormField
                control={form.control}
                name="discount_percentage"
                render={({ field }) => (
                  <CustomFormItem
                    field={field}
                    type="number"
                    label={lang === "ar" ? "نسبة الخصم" : "Discount rate"}
                    placeholder={
                      lang === "ar"
                        ? "ادخل نسبة الخصم %"
                        : "Enter the discount percentage %"
                    }
                  />
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <CustomFormItem
                      field={field}
                      label={
                        lang === "ar" ? "وصف الخدمة" : "Service Description"
                      }
                      placeholder={
                        lang === "ar"
                          ? "اشرح خدمتك بالتفصيل"
                          : "Describe your service in detail"
                      }
                      type="text"
                      typeInput="textarea"
                      className="md:min-h-[215px] resize-none"
                    />
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="image"
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
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="from_date"
                render={({ field }) => (
                  <CustomFormItem
                    field={field}
                    label={
                      lang === "ar"
                        ? "بداية الباقة"
                        : "Beginning of the package"
                    }
                    type="date"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="to_date"
                render={({ field }) => (
                  <CustomFormItem
                    field={field}
                    label={
                      lang === "ar" ? "نهاية الباقة" : "End of the package"
                    }
                    type="date"
                  />
                )}
              />
            </div>
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
              "حفظ الباقة"
            ) : (
              "Save Package"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPackageForm;

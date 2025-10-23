"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import SubmitBtn from "@/components/Atoms/buttons/SubmitBtn";
import type { ErrorType } from "@/types/Errors";
import type { LangType } from "@/types/globals";
import CustomPhoneInput from "@/components/Molecules/FormItems/CustomPhoneInput";
import type { ProductDetailsType } from "@/types/Products";
import { Form, FormField } from "@/components/ui/form";
import { BookingFormSchema } from "@/schemas/BookingFormSchema";
import { useCreateOrderMutation } from "@/store/services/Orders";
import type { CreateOrderType } from "@/types/Orders";
import SelectPymentmethod from "@/components/Molecules/Selects/SelectPymentmethod";
import LocationPicker from "../Map&Location/SelectLocation";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import CustomFormItem from "@/components/Molecules/FormItems/CustomFromItem";
import { PackageDetailsType } from "@/types/Packages";

interface Props {
  product?: ProductDetailsType;
  Package?: PackageDetailsType;
  setOpen: (value: boolean) => void;
  Pricing: {
    tax: number;
    delivery_fee: number;
    discount: number;
    totalPrice: number;
  };
  quantity: number;
}

const BookingForm = ({
  product,
  Package,
  setOpen,
  Pricing,
  quantity,
}: Props) => {
  const [Booking, { isLoading }] = useCreateOrderMutation();
  const lang = useLocale() as LangType;
  const { data } = useGetUserInfoQuery();
  const userInfo = data?.data;

  const form = useForm<z.infer<typeof BookingFormSchema>>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      name: userInfo?.user?.name ?? "",
      address: "",
      phone: {
        iso_code: "",
        number: "",
      },
      location: {
        latitude: undefined,
        longitude: undefined,
      },
      delivery_fee: Pricing.delivery_fee,
      discount: Pricing.discount,
      tax: Pricing.tax,
      payment_method: "",
    },
  });

  async function onSubmit(values: z.infer<typeof BookingFormSchema>) {
    const items = product
      ? [
          {
            company_product_id: product.id,
            quantity,
            unit_price: Number(product.price),
          },
        ]
      : Package
      ? [
          {
            package_id: Package.id,
            quantity,
            unit_price: Number(Package.price),
          },
        ]
      : [];

    if (items.length === 0) {
      toast.error(
        lang === "ar"
          ? "لم يتم تحديد منتج أو باقة للحجز"
          : "No product or package selected"
      );
      return;
    }

    const data: CreateOrderType = {
      name: values.name,
      address: values.address,
      phone: values.phone.iso_code + values.phone.number,
      latitude: values.location.latitude,
      longitude: values.location.longitude,
      payment_method: values.payment_method,
      discount: values.discount,
      tax: values.tax,
      delivery_fee: values.delivery_fee,
      items,
    };

    try {
      await Booking(data).unwrap();
      toast.success(
        lang === "en" ? "The booking was successful." : "تم الحجز بنجاح"
      );
      setOpen(false);
    } catch (error: unknown) {
      const err = error as ErrorType;
      toast.error(err?.data?.message || "حدث خطأ أثناء الحجز");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4">
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
            name="address"
            render={({ field }) => (
              <CustomFormItem
                field={field}
                label={lang === "ar" ? "العنوان" : "Address"}
                placeholder={lang === "ar" ? "ادخل العنوان" : "Enter address"}
                type="text"
              />
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <LocationPicker
              field={{
                value: field.value
                  ? { lat: field.value.latitude, lng: field.value.longitude }
                  : null,
                onChange(value) {
                  field.onChange({ latitude: value.lat, longitude: value.lng });
                },
              }}
              lang={lang}
            />
          )}
        />

        <FormField
          control={form.control}
          name="payment_method"
          render={({ field }) => <SelectPymentmethod field={field} />}
        />

        <SubmitBtn
          title={lang === "ar" ? "ادفع الآن" : "Pay now"}
          disabled={isLoading}
          loading={isLoading}
        />
      </form>
    </Form>
  );
};

export default BookingForm;

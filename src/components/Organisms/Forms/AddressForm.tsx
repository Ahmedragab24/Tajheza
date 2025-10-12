"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import SubmitBtn from "@/components/Atoms/buttons/SubmitBtn";
import { ErrorType } from "@/types/Errors";
import { LangType } from "@/types/globals";
import CustomPhoneInput from "@/components/Molecules/FormItems/CustomPhoneInput";
import CustomFormItem from "@/components/Molecules/FormItems/CustomFromItem";
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from "@/store/services/Address";
import { AddressType, StoreAddressType } from "@/types/Address";
import { Form, FormField } from "@/components/ui/form";
import { AddressFormSchema } from "@/schemas/AddressFormSchema";
import LocationPicker from "../Map&Location/SelectLocation";

interface Props {
  setOpen: (value: boolean) => void;
  address?: AddressType;
}

const AddressForm = ({ setOpen, address }: Props) => {
  const [addAddress, { isLoading }] = useAddAddressMutation();
  const [updateAddress, { isLoading: isLoadingUpdate }] =
    useUpdateAddressMutation();
  const lang = useLocale() as LangType;

  const form = useForm<z.infer<typeof AddressFormSchema>>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      title: address ? address.title : "",
      building: address ? address.building : "",
      street: address ? address.street : "",
      phone: {
        iso_code: "",
        number: address ? address.phone : "",
      },
      location: {
        latitude: address ? Number(address.latitude) : undefined,
        longitude: address ? Number(address.longitude) : undefined,
      },
    },
  });

  const AddNewAddress = async (values: z.infer<typeof AddressFormSchema>) => {
    const data: StoreAddressType = {
      title: values.title,
      building: values.building,
      street: values.street,
      phone: `${values.phone.iso_code}${values.phone.number}`,
      latitude: values.location.latitude,
      longitude: values.location.longitude,
    };

    if (!address) {
      try {
        await addAddress(data).unwrap();
        toast.success(
          lang === "en"
            ? "Address added successfully"
            : "تم إضافة العنوان بنجاح"
        );
        setOpen(false);
      } catch (error) {
        const err = error as ErrorType;
        toast.error(
          err?.data?.message ||
            (lang === "en" ? "An error occurred" : "حدث خطأ ما")
        );
      }
    } else {
      try {
        await updateAddress({
          body: data,
          AddressId: address.id,
        }).unwrap();
        toast.success(
          lang === "en" ? "Address edit successfully" : "تم تعديل العنوان بنجاح"
        );
        setOpen(false);
      } catch (error) {
        const err = error as ErrorType;
        toast.error(
          err?.data?.message ||
            (lang === "en" ? "An error occurred" : "حدث خطأ ما")
        );
      }
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-4 bg-muted px-2 py-4 md:p-6 rounded-xl shadow-md">
        <form onSubmit={form.handleSubmit(AddNewAddress)} className="space-y-4">
          <div className="grid  gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <CustomFormItem
                  field={field}
                  label={lang === "ar" ? "العنوان" : "Address"}
                  placeholder={lang === "ar" ? "أدخل العنوان" : "Enter Address"}
                  type="text"
                />
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <CustomFormItem
                  field={field}
                  label={lang === "ar" ? "اسم الشارع" : "Street name"}
                  placeholder={
                    lang === "ar" ? "أدخل اسم الشارع" : "Enter Street name"
                  }
                  type="text"
                />
              )}
            />
            <FormField
              control={form.control}
              name="building"
              render={({ field }) => (
                <CustomFormItem
                  field={field}
                  label={lang === "ar" ? "رقم المبنى" : "Building number"}
                  placeholder={
                    lang === "ar" ? "أدخل رقم المبنى" : "Enter Building number"
                  }
                  type="text"
                />
              )}
            />

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
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => {
              const currentValue = field.value as {
                latitude?: string | number;
                longitude?: string | number;
              } | null;

              const mappedValue = currentValue
                ? {
                    lat: Number(currentValue.latitude) || 0,
                    lng: Number(currentValue.longitude) || 0,
                  }
                : null;

              return (
                <LocationPicker
                  field={{
                    value: mappedValue,
                    onChange: (loc) =>
                      field.onChange({
                        latitude: loc.lat,
                        longitude: loc.lng,
                      }),
                  }}
                  lang={lang}
                />
              );
            }}
          />

          <SubmitBtn
            title={lang === "ar" ? "حفظ" : "Save"}
            disabled={isLoading || isLoadingUpdate}
            loading={isLoading || isLoadingUpdate}
          />
        </form>
      </div>
    </Form>
  );
};

export default AddressForm;

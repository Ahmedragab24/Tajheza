import { z } from "zod";

export const AddressFormSchema = z.object({
  title: z.string().min(4, { message: "العنوان مطلوب" }),
  phone: z.object({
    iso_code: z.string().min(1, { message: "اختار كود الدولة." }),
    number: z.string().regex(/^[0-9]+$/, { message: "رقم الجوال غير صحيح." }),
  }),
  street: z.string().min(4, { message: "الشارع مطلوب" }),
  building: z.string().min(4, { message: "رقم المبنى مطلوب" }),

  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

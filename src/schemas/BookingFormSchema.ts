import { z } from "zod";

export const BookingFormSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  address: z.string().min(2, "العنوان مطلوب"),
  phone: z.object({
    iso_code: z.string().min(1, { message: "اختار كود الدولة." }),
    number: z
      .string()
      .min(7, { message: "رقم الجوال يجب أن يكون 7 أرقام على الأقل." })
      .regex(/^[0-9]+$/, { message: "رقم الجوال غير صحيح." }),
  }),

  location: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .refine(
      (data) => data.latitude !== undefined && data.longitude !== undefined,
      {
        message: "الموقع مطلوب",
      }
    ),

  payment_method: z.string().min(1, "نوع الدفع مطلوب"),
  delivery_fee: z.number().min(1, "سعر التوصيل مطلوب"),
  discount: z.number().min(0, "سعر الخصم"),
  tax: z.number().min(0, "الضريبة المضافة"),
});

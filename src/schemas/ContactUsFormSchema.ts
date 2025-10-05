import { z } from "zod";

export const ContactUsFormSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل." }),
  phone: z.object({
    iso_code: z.string().min(1, { message: "اختار كود الدولة." }),
    number: z
      .string()
      .min(8, { message: "رقم الجوال يجب أن يكون 8 أرقام على الأقل." })
      .regex(/^[0-9]+$/, { message: "رقم الجوال غير صحيح." }),
  }),

  message: z
    .string()
    .min(10, { message: "الرسالة يجب أن تكون 10 أحرف على الأقل." }),
});

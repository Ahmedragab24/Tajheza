import { z } from "zod";

export const ForgetPasswordFormSchema = z.object({
  phone: z.object({
    iso_code: z.string().min(1, { message: "اختار كود الدولة." }),
    number: z
      .string()
      .min(8, { message: "رقم الجوال يجب أن يكون 8 أرقام على الأقل." })
      .regex(/^[0-9]+$/, { message: "رقم الجوال غير صحيح." }),
  }),
});

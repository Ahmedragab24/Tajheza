import { z } from "zod";

export const loginFormSchema = z.object({
  phone: z.object({
    iso_code: z.string().min(1, { message: "اختار كود الدولة." }),
    number: z
      .string()
      .min(7, { message: "رقم الجوال يجب أن يكون 7 أرقام على الأقل." })
      .regex(/^[0-9]+$/, { message: "رقم الجوال غير صحيح." }),
  }),

  password: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل." }),
  // .regex(/[a-z]/, { message: "يجب أن تحتوي على حرف صغير على الأقل." })
  // .regex(/[A-Z]/, { message: "يجب أن تحتوي على حرف كبير على الأقل." })
  // .regex(/[0-9]/, { message: "يجب أن تحتوي على رقم واحد على الأقل." })
  // .regex(/[\W_]/, {
  //   message: "يجب أن تحتوي على رمز خاص (!@#$...) واحد على الأقل.",
  // }),
});

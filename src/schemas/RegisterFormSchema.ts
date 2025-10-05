import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().min(1, { message: "الأسم مطلوب" }),

    phone: z.object({
      iso_code: z.string().min(1, { message: "اختار كود الدولة." }),
      number: z
        .string()
        .min(8, { message: "رقم الجوال يجب أن يكون 8 أرقام على الأقل." })
        .regex(/^[0-9]+$/, { message: "رقم الجوال غير صحيح." }),
    }),

    email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح." }),
    membership: z.string().min(1, { message: "يرجى اختيار العضوية." }),

    password: z
      .string()
      .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل." }),

    Confirm_password: z
      .string()
      .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل." }),

    device_id: z.string().optional(),

    acceptanceTerms: z.boolean().refine((val) => val === true, {
      message: "يجب الموافقة على الشروط والأحكام.",
    }),
  })
  .refine((data) => data.password === data.Confirm_password, {
    message: "كلمتا المرور غير متطابقتين.",
    path: ["Confirm_password"],
  });

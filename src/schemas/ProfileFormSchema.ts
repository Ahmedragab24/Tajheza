import { z } from "zod";

export const ProfileFormSchema = z.object({
  name: z.string().optional(),
  phone: z
    .object({
      iso_code: z.string().min(1, { message: "اختار كود الدولة." }),
      number: z.string().regex(/^[0-9]+$/, { message: "رقم الجوال غير صحيح." }),
    })
,

  email: z.email().optional(),
  image: z.any().optional(),
});

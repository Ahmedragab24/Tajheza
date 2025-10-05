import { z } from "zod";

export const ProfileFormSchema = z.object({
  name: z.string().optional(),
  phone: z.object({
    iso_code: z.string().min(1, { message: "اختار كود الدولة." }),
    number: z.string().regex(/^[0-9]+$/, { message: "رقم الجوال غير صحيح." }),
  }),
  info: z.string().optional(),
  email: z.email().optional(),
  image: z.any().optional(),
  background_image: z.any().optional(),
  country: z.string().min(1, "اختر الدولة"),
});

import { z } from "zod";

export const ResetPasswordFormSchema = z
  .object({
    new_password: z
      .string()
      .min(8, "كلمة السر الجديدة مطلوبة ويجب أن تكون 8 أحرف على الأقل"),
    new_password_confirmation: z
      .string()
      .min(8, "تأكيد كلمة السر الجديدة مطلوب"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "كلمتا السر غير متطابقتين",
    path: ["new_password_confirmation"], // حدد مكان الخطأ
  });

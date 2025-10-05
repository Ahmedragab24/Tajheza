import { z } from "zod";

export const ChangePasswordFormSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل." }),

    newPassword: z
      .string()
      .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل." }),

    confirmPassword: z.string({
      message: "يرجى تأكيد كلمة المرور الجديدة.",
    }),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

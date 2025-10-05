import { z } from "zod";

export const SendCodeFormSchema = z.object({
  sendCode: z
    .string()
    .length(4, { message: "يجب أن يتكون الكود من 4 أرقام." })
    .regex(/^\d{4}$/, { message: "يجب أن يحتوي الكود على أرقام فقط." }),
});

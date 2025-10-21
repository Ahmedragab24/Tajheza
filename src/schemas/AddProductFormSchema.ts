import { z } from "zod";

const isFile = (v: unknown): v is File => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof v === "object" && v !== null && "size" in (v as any);
};

export const AddProductFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(100, { message: "Title must not exceed 100 characters" }),

  serviceType: z.string().min(1, { message: "Service type is required" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must not exceed 500 characters" }),

  price: z
    .string()
    .min(1, { message: "Price is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a valid positive number",
    }),

  city: z.string().min(1, { message: "City is required" }),

  from_time: z.string().min(1, { message: "Start time is required" }),

  to_time: z.string().min(1, { message: "End time is required" }),

  work_days: z
    .array(z.string())
    .min(1, { message: "Select at least one working day" }),

  preferred_contact: z
    .string()
    .min(1, { message: "Preferred contact method is required" })
    .max(100, { message: "Contact method must not exceed 100 characters" }),

  /**
   * mainImage: قد تكون URL (string) أو File (لو رفع المستخدم ملف جديد).
   * نتحقق شرطياً لو كانت File من الحجم والنوع.
   */
  mainImage: z.union([z.string().url().nullable(), z.any().nullable()]).refine(
    (val) => {
      if (!val) return false; // ممكن تطلب أن الصورة مطلوبة — غيّر هذا لو تريد أن تكون اختيارية
      if (isFile(val)) {
        return (
          val.size > 0 &&
          val.size <= 5 * 1024 * 1024 &&
          val.type.startsWith("image/")
        );
      }
      // لو كانت سلسلة URL نكتفي بقبولها (زود شروط إضافية إن أردت)
      return typeof val === "string";
    },
    { message: "Main image must be a valid image (File <=5MB or image URL)" }
  ),

  /**
   * additionalImages: مصفوفة يمكن أن تحتوي عناصر File أو URL strings
   */
  additionalImages: z
    .array(z.union([z.string().url(), z.any()]))
    .optional()
    .refine(
      (arr) => {
        if (!arr) return true;
        // لو عنصر File نتحقق من النوع والحجم، لو string نسمح
        return arr.every((item) => {
          if (isFile(item)) {
            return (
              item.size <= 5 * 1024 * 1024 && item.type.startsWith("image/")
            );
          }
          return typeof item === "string";
        });
      },
      { message: "Each image must be an image file <=5MB or a valid image URL" }
    )
    .default([]),

  options: z
    .array(
      z.object({
        id: z.number().optional(), // أثناء الإضافة id قد يكون غير موجود، لذا نجعله optional
        name: z.string(),
        price: z.string(),
      })
    )
    .optional()
    .default([]),

  addons: z.array(z.any()).optional().default([]),

  targets: z.array(z.string()).optional().default([]),
});

export type AddProductFormType = z.infer<typeof AddProductFormSchema>;

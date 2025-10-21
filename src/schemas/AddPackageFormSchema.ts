import { z } from "zod";

export const AddPackageFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(100, { message: "Title must not exceed 100 characters" }),

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

  discount_percentage: z
    .string()
    .min(1, { message: "Price is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "discount percentage must be a valid positive number",
    }),

  from_date: z.string().min(1, { message: "Start time is required" }),

  to_date: z.string().min(1, { message: "End time is required" }),

  image: z.any(),

  product_ids: z.array(z.string()),
});

export type AddPackageFormType = z.infer<typeof AddPackageFormSchema>;

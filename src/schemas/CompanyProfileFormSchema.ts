import { z } from "zod";

export const CompanyProfileFormSchema = z.object({
  name: z.string().optional(),
  commercial_number: z.string().optional(),
  city_id: z.string().optional(),
  description: z.string().optional(),
  logo: z.any().optional(),
  background: z.any().optional(),
});

import { MembershipType } from "@/types/Auth/Auth";
export const MembershipsList: {
  label_ar: string;
  label_en: string;
  value: MembershipType;
}[] = [
  { label_ar: "مستفيد", label_en: "Beneficiary", value: "user" },
  { label_ar: "مقدم خدمات", label_en: "Service provider", value: "provider" },
];

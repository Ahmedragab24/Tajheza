"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import type { ControllerRenderProps } from "react-hook-form";
import { CreditCard, Smartphone, Wallet, Apple, Banknote } from "lucide-react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, string>;
}

const SelectPaymentMethod = ({ field }: Props) => {
  const lang = useLocale() as LangType;
  const isArabic = lang === "ar";

  const PaymentMethods = [
    {
      value: "visa",
      label: isArabic ? "فيزا" : "Visa",

      icon: <CreditCard className="w-4 h-4 text-yellow-500" />,
    },
    {
      value: "paymob",
      label: isArabic ? "باي موب" : "Paymob",

      icon: <CreditCard className="w-4 h-4 text-primary" />,
    },
    {
      value: "mada",
      label: isArabic ? "بطاقة مدى" : "Mada Card",

      icon: <Banknote className="w-4 h-4 text-green-600" />,
    },
    {
      value: "stc_pay",
      label: isArabic ? "STC Pay" : "STC Pay",

      icon: <Wallet className="w-4 h-4 text-purple-600" />,
    },
    {
      value: "apple_pay",
      label: isArabic ? "Apple Pay" : "Apple Pay",

      icon: <Apple className="w-4 h-4 text-gray-800" />,
    },
    {
      value: "sadad",
      label: isArabic ? "سداد" : "SADAD",
      icon: <Smartphone className="w-4 h-4 text-blue-600" />,
    },
  ];

  return (
    <div className="space-y-2">
      <Label>{isArabic ? "اختر طريقة الدفع" : "Select Payment Method"}</Label>
      <Select
        value={field.value ?? ""}
        onValueChange={(value) => field.onChange(value)}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              isArabic ? "اختر طريقة الدفع" : "Select Payment Method"
            }
          />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {PaymentMethods.map((method) => (
              <SelectItem key={method.value} value={method.value}>
                <div className="flex !items-start !justify-start gap-2">
                  {method.icon}
                  <div className="flex flex-col">
                    <span className="font-semibold">{method.label}</span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPaymentMethod;

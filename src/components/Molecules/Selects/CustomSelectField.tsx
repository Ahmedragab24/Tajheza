"use client";

import { OptionType } from "@/types/Selects";
import { FormControl, FormItem, FormLabel, FormMessage } from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";

interface CustomSelectProps {
  className?: string;
  options: OptionType[];
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field?: any;
  label?: string;
  icon?: React.ReactNode;
}

const CustomSelectField = ({
  options,
  className,
  placeholder,
  field,
  label,
  icon,
}: CustomSelectProps) => {
  const lang = useLocale() as LangType;

  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <Select
        onValueChange={field.onChange}
        value={field.value}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <FormControl>
          <SelectTrigger className={`w-full !h-11 ${className || ""}`}>
            <div className="flex items-center gap-2.5">
              {icon && icon}
              <SelectValue placeholder={placeholder} />
            </div>
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {lang === "ar" ? item.label_ar : item.label_en}
            </SelectItem>
          ))}

          {options.length === 0 && (
            <h4 className="text-sm text-gray-600">
              {lang === "ar" ? "لا يوجد عناصر" : "No items"}
            </h4>
          )}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

export default CustomSelectField;

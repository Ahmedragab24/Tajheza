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
import { useGetServicesQuery } from "@/store/services/Services";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import { ControllerRenderProps } from "react-hook-form";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, string>;
}

const SelectProductType = ({ field }: Props) => {
  const lang = useLocale() as LangType;
  const { data } = useGetServicesQuery(lang);
  const Services = data?.data || [];

  return (
    <Select
      value={field.value ?? ""}
      onValueChange={(value) => field.onChange(value)}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <SelectGroup className="space-y-2">
        <Label>{lang === "ar" ? "اختر النوع" : "Select Type"}</Label>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={lang === "ar" ? "اختر النوع" : "Select Type"}
          />
        </SelectTrigger>
      </SelectGroup>

      <SelectContent>
        {Services.map((item) => (
          <SelectItem key={item.id} value={String(item.id)}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectProductType;

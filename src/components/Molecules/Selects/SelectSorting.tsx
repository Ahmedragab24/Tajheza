"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LangType } from "@/types/globals";
import { SortByType } from "@/types/Search";
import { Dispatch } from "react";
import { ProductFilteringType } from "@/app/[locale]/client/services/page";

interface Props {
  value: SortByType | undefined;
  onChange: Dispatch<React.SetStateAction<ProductFilteringType>>;
  placeholder?: string;
  label?: string;
  className?: string;
  lang: LangType;
}

interface SortType {
  label: string;
  value: SortByType;
}

const SelectSorting = ({
  placeholder,
  label,
  value,
  onChange,
  className,
  lang,
}: Props) => {
  const SortList: SortType[] = [
    {
      label: lang === "ar" ? "الأعلى سعراً" : "Highest Price",
      value: "Highest price",
    },
    {
      label: lang === "ar" ? "الأقل سعراً" : "Lowest Price",
      value: "Lowest price",
    },
    {
      label: lang === "ar" ? "الأكثر إعجابًا" : "Most liked",
      value: "Most liked",
    },
    {
      label: lang === "ar" ? "الأحدث" : "The Latest",
      value: "Newest",
    },
    {
      label: lang === "ar" ? "اختيارات تجهيزة" : "Tajheeza Picks",
      value: "Tajheeza_Picks",
    },
  ];

  return (
    <div className="w-fit">
      <div className="space-y-2">
        {label && <Label>{label}</Label>}
        <Select
          value={value}
          onValueChange={(val) =>
            onChange((prev) => ({
              ...prev,
              sortedBy: val as SortByType,
            }))
          }
        >
          <SelectTrigger className={`w-full relative ${className || ""} `}>
            <SelectValue
              placeholder={
                placeholder ||
                (lang === "ar" ? "اختر طريقة الفرز" : "Select sorting")
              }
            />
          </SelectTrigger>
          <SelectContent>
            {SortList.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectSorting;

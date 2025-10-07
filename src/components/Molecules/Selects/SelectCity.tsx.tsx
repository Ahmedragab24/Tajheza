"use client";

import { Check, ChevronsUpDown, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale } from "next-intl";
import { Label } from "@/components/ui/label";
import { useGetCitiesQuery } from "@/store/services/Cities";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { LangType } from "@/types/globals";
import { CityType } from "@/types/Cities";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

const SelectCity = ({
  placeholder,
  icon,
  label,
  value,
  onChange,
  className,
}: Props) => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useGetCitiesQuery({});
  const CitiesList: CityType[] = data?.data || [];

  const lang = useLocale() as LangType;
  const isRtl = lang === "ar";

  const activeValue = value || "";

  const selectedCityName = CitiesList.find(
    (city) => String(city.id) === activeValue
  )?.[isRtl ? "name" : "name_en"];

  const handleChange = (val: string) => {
    setOpen(false);
    const finalVal = activeValue === val ? "" : val;
    onChange?.(finalVal);
  };

  // ---------------------------------
  // حالة التحميل
  if (isLoading) {
    return <Skeleton className={cn("h-10 w-full rounded-md", className)} />;
  }

  // حالة الخطأ
  if (isError) {
    return (
      <Button onClick={refetch} variant="destructive" className="w-full">
        <RefreshCcw className="w-4 h-4 mr-2" />
        {isRtl ? "فشل التحميل، أعد المحاولة" : "Failed to load, Retry"}
      </Button>
    );
  }

  // ---------------------------------
  // المحتوى الأساسي
  return (
    <div className="w-full space-y-2">
      {label && <Label>{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "relative w-full justify-between h-10 px-3",
              isRtl ? "text-right" : "text-left",
              !activeValue && "text-muted-foreground",
              className
            )}
          >
            {icon && (
              <span
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-gray-400",
                  isRtl ? "right-3" : "left-3"
                )}
              >
                {icon}
              </span>
            )}

            {selectedCityName
              ? selectedCityName
              : placeholder || (isRtl ? "اختر المدينة" : "Select City")}

            <ChevronsUpDown
              className={cn(
                "h-4 w-4 shrink-0 opacity-50",
                isRtl ? "mr-2" : "ml-2"
              )}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align={isRtl ? "end" : "start"}
        >
          <Command dir={isRtl ? "rtl" : "ltr"}>
            <CommandInput
              placeholder={isRtl ? "ابحث عن مدينة..." : "Search city..."}
              className={
                isRtl ? "placeholder:text-right" : "placeholder:text-left"
              }
            />

            <CommandList>
              <CommandEmpty>
                {isRtl ? "لم يتم العثور على مدينة" : "No city found."}
              </CommandEmpty>

              <CommandGroup>
                {CitiesList.length === 0 ? (
                  <div className="p-2 text-gray-500 text-sm">
                    {isRtl
                      ? "عليك اختيار الدولة أولاً"
                      : "You have to choose the country first."}
                  </div>
                ) : (
                  CitiesList.map((city) => (
                    <CommandItem
                      key={city.id}
                      value={`${city.name} ${city.name_en}`}
                      onSelect={() => handleChange(String(city.id))}
                    >
                      {isRtl ? city.name : city.name_en}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          activeValue === String(city.id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectCity;

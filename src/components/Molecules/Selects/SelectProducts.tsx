"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetProductsByUserQuery } from "@/store/services/Provider/products";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import { ControllerRenderProps } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, string>;
}

export function MultiSelectProducts({ field }: Props) {
  const lang = useLocale() as LangType;
  const { data } = useGetProductsByUserQuery(lang);
  const Product = data?.data || [];

  const [open, setOpen] = React.useState(false);
  const selectedValues = Array.isArray(field.value) ? field.value : [];

  const toggleValue = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    field.onChange(newValues);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="space-y-2">
        <Label>{lang === "ar" ? "اختر المنتجات" : "Select products"}</Label>
        <PopoverTrigger asChild className="border border-gray-400">
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selectedValues.length > 0
              ? `${selectedValues.length} ${
                  lang === "ar" ? "عناصر مختارة" : "selected"
                }`
              : lang === "ar"
              ? "اختر المنتجات"
              : "Select products"}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={
              lang === "ar" ? "ابحث عن منتج..." : "Search product..."
            }
          />
          <CommandEmpty>
            {lang === "ar" ? "لا يوجد منتجات" : "No products found."}
          </CommandEmpty>
          <CommandGroup>
            {Product.map((item) => (
              <CommandItem
                key={item.id}
                value={String(item.id)}
                onSelect={() => toggleValue(String(item.id))}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedValues.includes(String(item.id))
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

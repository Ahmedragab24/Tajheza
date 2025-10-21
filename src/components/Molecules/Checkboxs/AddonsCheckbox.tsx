"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useGetAddonsQuery } from "@/store/services/Attributes";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  label?: string;
}

export function AddonsCheckbox({ label, field }: Props) {
  const lang = useLocale() as LangType;
  const { data } = useGetAddonsQuery(lang);
  const Addons = data?.data || [];

  const handleChange = (id: number, isChecked: boolean) => {
    const current = new Set(field.value || []);
    if (isChecked) {
      current.add(id);
    } else {
      current.delete(id);
    }
    field.onChange(Array.from(current));
  };

  return (
    <FormItem className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="grid grid-cols-1 gap-2">
        {Addons.map((item) => {
          const checked = field.value?.includes(item.id);
          return (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox
                checked={checked}
                onCheckedChange={(isChecked) =>
                  handleChange(item.id, Boolean(isChecked))
                }
              />
              <Label className="text-xs">{item.name}</Label>
              <span className="text-[10px] text-muted-foreground">
                {item.price} ر.س
              </span>
            </div>
          );
        })}
      </div>
      <FormMessage />
    </FormItem>
  );
}

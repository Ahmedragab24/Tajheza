"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useGetTargetsQuery } from "@/store/services/Attributes";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  label?: string;
}

export function TargetsCheckbox({ label, field }: Props) {
  const lang = useLocale() as LangType;
  const { data } = useGetTargetsQuery(lang);
  const Targets = data?.data || [];

  const handleChange = (name: string, isChecked: boolean) => {
    const current = new Set(field.value || []);
    if (isChecked) {
      current.add(name);
    } else {
      current.delete(name);
    }
    field.onChange(Array.from(current));
  };

  return (
    <FormItem className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="grid grid-cols-1 gap-2">
        {Targets.map((item) => {
          const checked = field.value?.includes(item.name);
          return (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox
                checked={checked}
                onCheckedChange={(isChecked) =>
                  handleChange(item.name, Boolean(isChecked))
                }
              />
              <Label className="text-xs">{item.name}</Label>
            </div>
          );
        })}
      </div>
      <FormMessage />
    </FormItem>
  );
}

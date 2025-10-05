import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LangType } from "@/types/globals";
import React from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  lang: LangType;
}

const AcceptanceTermsCheckbox = ({ field, lang }: Props) => {
  return (
    <FormItem className="flex flex-row items-center gap-2">
      <FormControl>
        <Checkbox
          checked={field.value === true}
          onCheckedChange={(checked) => field.onChange(checked)}
        />
      </FormControl>
      <FormLabel className="text-xs font-normal">
        {lang === "ar"
          ? "من خلال إنشاء حساب ، فإنك توافق على الشروط والأحكام"
          : "By creating an account, you agree to our Terms and Conditions."}
      </FormLabel>
      <FormMessage />
    </FormItem>
  );
};

export default AcceptanceTermsCheckbox;

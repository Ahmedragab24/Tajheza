"use client";

import { LangType } from "@/types/globals";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { useDefaultAddressMutation } from "@/store/services/Address";
import { toast } from "sonner";
import { ErrorType } from "@/types/Errors";

interface Props {
  lang: LangType;
  addressId: number;
}

const DefaultAddressBtn = ({ addressId, lang }: Props) => {
  const [Default, { isLoading }] = useDefaultAddressMutation();

  const DefaultAddress = async () => {
    try {
      await Default(addressId).unwrap();
      toast.success(
        lang === "ar"
          ? "تم تعيين العنوان كأفتراضي"
          : "The address is set as default."
      );
    } catch (error) {
      const err = error as ErrorType;
      toast.error(
        err?.data?.message ||
          (lang === "ar" ? "حدث خطأ أثناء الحذف" : "Error deleting address")
      );
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            disabled={isLoading}
            className="text-yellow-600 hover:text-yellow-500"
            onClick={DefaultAddress}
          >
            <Settings2 />
          </Button>
        </TooltipTrigger>

        <TooltipContent className="dark px-2 py-1 text-xs">
          {lang === "ar" ? "العنوان الافتراضي" : "Default address"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DefaultAddressBtn;

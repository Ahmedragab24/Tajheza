"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LangType } from "@/types/globals";
import { ProviderOrderDetailsType } from "@/types/ProviderOrders";
import { LocationMap } from "../Map&Location/LocationMap";
import { Button } from "@/components/ui/button";

interface Props {
  order: ProviderOrderDetailsType;
  lang: LangType;
}

const LocationMapDialog = ({ lang, order }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="!text-xs p-2 !h-8">
          {lang === "ar" ? "عرض الخريطة" : "View map"}
        </Button>
      </DialogTrigger>

      <DialogContent
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="!max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <LocationMap order={order} lang={lang} />
      </DialogContent>
    </Dialog>
  );
};

export default LocationMapDialog;

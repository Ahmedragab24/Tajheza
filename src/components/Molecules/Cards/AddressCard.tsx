import AddAddressDialog from "@/components/Organisms/Dialogs/AddAddressDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddressType } from "@/types/Address";
import { LangType } from "@/types/globals";
import {
  CircleCheckBig,
  House,
  MapPin,
  Smartphone,
  SquarePen,
  StretchVertical,
} from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DeleteAddressBtn from "@/components/Atoms/buttons/DeleteAddressBtn";
import DefaultAddressBtn from "@/components/Atoms/buttons/DefaultAddressBtn";

interface Props {
  lang: LangType;
  address: AddressType;
}

const AddressCard = ({ address, lang }: Props) => {
  return (
    <Card
      className={`transition-all hover:shadow-md border ${
        address?.is_default
          ? "border-yellow-500 bg-yellow-50/50"
          : "border-border"
      }`}
    >
      <CardContent className="flex flex-col gap-4 py-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="text-primary w-5 h-5" />
            <h2 className="font-semibold text-lg">{address.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <AddAddressDialog address={address} lang={lang}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-600 hover:text-green-500 hover:bg-green-50"
                    >
                      <SquarePen className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                </AddAddressDialog>
                <TooltipContent className="px-2 py-1 text-xs">
                  {lang === "ar" ? "تعديل" : "Edit"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DeleteAddressBtn lang={lang} addressId={address.id} />

            {address?.is_default ? (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleCheckBig className="text-yellow-600 w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent className="px-2 py-1 text-xs">
                    {lang === "ar" ? "العنوان الافتراضي" : "Default address"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <DefaultAddressBtn lang={lang} addressId={address.id} />
            )}
          </div>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <StretchVertical className="text-primary w-4 h-4" />
            <span className="font-medium">
              {lang === "ar" ? "الشارع:" : "Street:"}
            </span>
            <span>{address?.street}</span>
          </div>

          <div className="flex items-center gap-2">
            <House className="text-primary w-4 h-4" />
            <span className="font-medium">
              {lang === "ar" ? "المبنى:" : "Building:"}
            </span>
            <span>{address?.building}</span>
          </div>

          <div className="flex items-center gap-2">
            <Smartphone className="text-primary w-4 h-4" />
            <span className="font-medium">
              {lang === "ar" ? "رقم الهاتف:" : "Phone:"}
            </span>
            <span>{address?.phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;

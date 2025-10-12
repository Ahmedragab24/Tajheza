"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LangType } from "@/types/globals";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddressForm from "../Forms/AddressForm";
import { AddressType } from "@/types/Address";

interface Props {
  lang: LangType;
  address?: AddressType;
  children?: React.ReactNode;
}

const AddAddressDialog = ({ lang, address, children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!children ? (
          <Button variant="outline" className="text-primary">
            <Plus />
            {lang === "ar" ? "اضافة عنوان جديد" : "Add a new address"}
          </Button>
        ) : (
          children
        )}
      </DialogTrigger>

      <DialogContent
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="!max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            {!address
              ? lang === "ar"
                ? "أضف عنوان جديد"
                : "Add a new address"
              : lang === "ar"
              ? "تعديل العنوان"
              : "Edit address"}
          </DialogTitle>

          <AddressForm setOpen={setOpen} address={address} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressDialog;

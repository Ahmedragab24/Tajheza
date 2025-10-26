"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import { LangType } from "@/types/globals";
import { useState } from "react";
import { ProductDetailsType } from "@/types/Products";
import AddProductForm from "../Forms/AddProductForm";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface Props {
  product: ProductDetailsType | undefined;
  lang: LangType;
  children?: React.ReactNode;
}

const UpdateProductDialog = ({ product, lang, children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex items-center gap-1 cursor-pointer"
          >
            {lang === "ar" ? "تعديل" : "Edit"}
            <Edit2 className="w-3 h-3" />
          </DropdownMenuItem>
        )}
      </DialogTrigger>

      <DialogContent
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="!max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <AddProductForm setOpen={setOpen} product={product} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductDialog;

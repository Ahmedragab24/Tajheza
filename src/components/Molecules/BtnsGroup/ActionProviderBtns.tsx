"use client";

import { EllipsisVertical, Eye } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import UpdateProductDialog from "@/components/Organisms/Dialogs/UpdateProductDialog";
import DeleteProductDialog from "@/components/Organisms/Dialogs/DeleteProductDialog";
import { useGetProviderProductByIdQuery } from "@/store/services/Provider/products";
import Link from "next/link";

interface Props {
  productId: number;
}

const ActionProviderBtns = ({ productId }: Props) => {
  const lang = useLocale() as LangType;
  const isRtl = lang === "ar";
  const { data } = useGetProviderProductByIdQuery({
    lang,
    productId: productId,
  });

  const product = data?.data;

  return (
    <DropdownMenu dir={isRtl ? "rtl" : "ltr"}>
      <DropdownMenuTrigger className="p-1 bg-white/80 rounded-full cursor-pointer">
        <EllipsisVertical className="text-gray-800" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="!min-w-28">
        <Link href={`/provider/view-product/${productId}`}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex items-center gap-1 cursor-pointer"
          >
            {lang === "ar" ? "عرض" : "View"}
            <Eye className="w-3 h-3" />
          </DropdownMenuItem>
        </Link>
        <UpdateProductDialog lang={lang} product={product} />
        <DeleteProductDialog lang={lang} service={product} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionProviderBtns;

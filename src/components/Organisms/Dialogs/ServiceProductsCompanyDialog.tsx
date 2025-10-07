"use client";

import ProductCard from "@/components/Molecules/Cards/ProductCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LangType } from "@/types/globals";
import { ProductType } from "@/types/Products";
import { useState } from "react";

interface Props {
  products: ProductType[];
  lang: LangType;
  children: React.ReactNode;
}

const ServiceProductsCompanyDialog = ({ lang, products, children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="!max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            {lang === "ar"
              ? `المنتجات (${products.length})`
              : `Products (${products.length})`}
          </DialogTitle>
          <DialogDescription className="text-center">
            {lang === "ar"
              ? "اكتشف أفضل المنتجات التي اخترناها لك بعناية"
              : "Discover the best products we have carefully selected for you."}
          </DialogDescription>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceProductsCompanyDialog;

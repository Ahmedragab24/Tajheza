"use client";

import type { ProductDetailsType } from "@/types/Products";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { PackageDetailsType } from "@/types/Packages";

interface Props {
  Pricing: {
    tax: number;
    delivery_fee: number;
    discount: number;
    totalPrice: number;
  };
  setPricing: (value: {
    tax: number;
    delivery_fee: number;
    discount: number;
    totalPrice: number;
  }) => void;
  product?: ProductDetailsType | undefined;
  Package?: PackageDetailsType | undefined;
  isRtl: boolean;
  count: number;
}

const ProductSelectBookingCard = ({
  product,
  Package,
  setPricing,
  Pricing,
  isRtl,
  count,
}: Props) => {
  useEffect(() => {
    const productPrice = Number(product?.price) || Number(Package?.price) || 0;
    const subtotal = productPrice * count;
    const deliveryFee = Pricing.delivery_fee;
    const taxAmount = 0;
    const discountAmount = (subtotal * (Pricing.discount || 0)) / 100;
    const finalTotal = subtotal + deliveryFee + taxAmount - discountAmount;

    setPricing({
      ...Pricing,
      tax: taxAmount,
      totalPrice: finalTotal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    count,
    product?.price,
    Package?.price,
    Pricing.discount,
    Pricing.delivery_fee,
  ]);

  return (
    <Card className="p-4 md:p-6 space-y-4 border-2">
      <div
        className="flex flex-col md:flex-row gap-4 md:gap-8 !items-center md:items-start"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {(product?.main_image || Package?.image) && (
          <div className="relative w-full sm:w-44 h-40 sm:h-32">
            <Image
              src={product?.main_image || Package?.image || ""}
              alt={product?.title || Package?.name || "product"}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex flex-col justify-center gap-2 text-center md:text-left">
          <h3 className="font-bold text-lg sm:text-xl">
            {Package ? Package.name : product?.title}
          </h3>
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-gray-500">
            <span className="font-medium text-base">
              {isRtl ? "الكمية:" : "Quantity:"}
            </span>
            <span className="font-bold text-lg text-black">{count}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductSelectBookingCard;

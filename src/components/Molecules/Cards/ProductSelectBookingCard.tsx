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
    <Card className="p-6 space-y-4 border-2">
      <div className="flex gap-8 items-center" dir={isRtl ? "rtl" : "ltr"}>
        {product?.main_image && (
          <Image
            src={product.main_image}
            alt={product.title}
            width={200}
            height={200}
            className="w-44 h-32 object-cover rounded-lg"
          />
        )}

        {Package?.image && (
          <Image
            src={Package?.image}
            alt={Package?.name}
            width={200}
            height={200}
            className="w-44 h-32 object-cover rounded-lg"
          />
        )}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg">
            {Package ? Package.name : product?.title}
          </h3>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg text-gray-500">
              {isRtl ? "الكمية" : "Quantity"} :
            </h3>
            <h3 className="font-bold text-lg">{count}</h3>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductSelectBookingCard;

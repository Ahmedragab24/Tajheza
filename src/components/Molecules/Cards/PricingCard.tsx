"use client";

import { Card } from "@/components/ui/card";
import { useLocale } from "next-intl";
import type { LangType } from "@/types/globals";
import RiyalIcon from "@/components/Atoms/Icons/RiyalIcon";

interface Props {
  Pricing: {
    tax: number;
    delivery_fee: number;
    discount: number;
    totalPrice?: number;
  };
  productPrice?: number;
  packagePrice?: number;
}

const PricingCard = ({ Pricing, productPrice, packagePrice }: Props) => {
  const lang = useLocale() as LangType;
  const isArabic = lang === "ar";

  const pricingItems = [
    {
      label: isArabic ? "سعر المنتج" : "Product Price",
      value: productPrice || packagePrice,
    },
    {
      label: isArabic ? "سعر التوصيل" : "Delivery Fee",
      value: Pricing.delivery_fee,
    },
    { label: isArabic ? "الخصم" : "Discount", value: Pricing.discount },
    { label: isArabic ? "الضريبة" : "Tax", value: Pricing.tax },
  ];

  return (
    <Card className="p-6 space-y-1 border-2" dir={isArabic ? "rtl" : "ltr"}>
      <h3 className="font-semibold text-lg text-primary">
        {isArabic ? "تفاصيل السعر" : "Price Details"}
      </h3>

      {pricingItems.map((item, i) => (
        <div key={i} className="flex justify-between">
          <span className="text-gray-800">{item.label}</span>
          <div className="flex items-center gap-1">
            <span className="text-primary font-bold text-lg">
              {Number(item.value).toFixed(2)}
            </span>
            <RiyalIcon />
          </div>
        </div>
      ))}

      <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg text-primary">
        <span>{isArabic ? "الإجمالي النهائي" : "Final Total"}</span>
        <div className="flex items-center gap-1 text-xl">
          {Pricing.totalPrice?.toFixed(2)}
          <RiyalIcon />
        </div>
      </div>
    </Card>
  );
};

export default PricingCard;

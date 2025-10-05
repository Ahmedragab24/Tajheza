import SectionTitle from "@/components/Atoms/titles/SectionTitle";
import ProductCard from "@/components/Molecules/Cards/ProductCard";
import { getProductsForFastDelivery } from "@/lib/api/Products";
import { LangType } from "@/types/globals";
import { getLocale } from "next-intl/server";
import React from "react";

const ExpressDeliverySection = async () => {
  const lang = (await getLocale()) as LangType;
  const isRtl = lang === "ar";
  const data = await getProductsForFastDelivery(lang);
  const Products = data?.data || [];

  console.log("Products", Products);

  return (
    <div className="Container">
      <div className="flex flex-col gap-4 pb-8 border-b">
        <div className="flex justify-between items-center">
          <SectionTitle
            title={isRtl ? "التوصيل السريع" : "Express delivery"}
            description={
              isRtl
                ? "خدمة توصيل سريعة وموثوقة لتستمتع بمناسبتك بدون تأخير"
                : "Fast and reliable delivery service so you can enjoy your event without delay."
            }
            iconPath="/Icons/material-symbols_delivery-truck-bolt-rounded.svg"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {Products.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpressDeliverySection;

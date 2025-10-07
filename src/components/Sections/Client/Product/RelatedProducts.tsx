import SectionTitle from "@/components/Atoms/titles/SectionTitle";
import ProductCard from "@/components/Molecules/Cards/ProductCard";
import { LangType } from "@/types/globals";
import { ProductType } from "@/types/Products";
import React from "react";

interface Props {
  lang: LangType;
  RelatedProducts: ProductType[];
}

const RelatedProducts = ({ lang, RelatedProducts }: Props) => {
  const isRtl = lang === "ar";

  return (
    <div className="flex flex-col gap-4 pb-8 border-b">
      <div className="flex justify-between items-center">
        <SectionTitle
          title={isRtl ? "منتجات ذات صلة" : "Related Products"}
          description={
            isRtl
              ? "استكشف مجموعة من المنتجات المشابهة التي قد تناسب ذوقك"
              : "Explore a range of similar products that may suit your taste."
          }
          iconPath="/Icons/lucide_link.svg"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {RelatedProducts.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

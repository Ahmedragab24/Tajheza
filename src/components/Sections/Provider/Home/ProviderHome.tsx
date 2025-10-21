import SectionTitle from "@/components/Atoms/titles/SectionTitle";
import ProductCard from "@/components/Molecules/Cards/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetLatestProductsQuery } from "@/store/services/Products";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import React, { Suspense } from "react";

const ProviderHome = () => {
  const lang = useLocale() as LangType;
  const isRtl = lang === "ar";
  const { data } = useGetLatestProductsQuery(lang);
  const Products = data?.data || [];

  console.log("Products", Products);

  return (
    <div className="Container">
      <div className="flex flex-col gap-4 pb-8 border-b">
        <div className="flex justify-between items-center">
          <SectionTitle
            title={isRtl ? "خدماتى" : "My Services"}
            iconPath="/Icons/medal-star.svg"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Products.map((item, index) => (
            <Suspense
              key={index}
              fallback={<Skeleton key={index} className="h-40 md:h-60" />}
            >
              <ProductCard product={item} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderHome;

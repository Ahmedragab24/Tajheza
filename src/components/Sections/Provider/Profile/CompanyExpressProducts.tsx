"use client";

import { LangType } from "@/types/globals";
import { useGetCompanyExpressProductsQuery } from "@/store/services/Provider/Company";
import Image from "next/image";
import ProductCard from "@/components/Molecules/Cards/ProductCard";

interface CompanyServicesProps {
  lang: LangType;
}

export function CompanyExpressProducts({ lang }: CompanyServicesProps) {
  const { data, isLoading, isError } = useGetCompanyExpressProductsQuery();
  const Products = data?.data || [];

  if (isLoading)
    return (
      <div className="py-20 text-center text-gray-500">
        {lang === "ar" ? "جاري التحميل..." : "Loading..."}
      </div>
    );

  if (isError)
    return (
      <div className="py-20 text-center text-red-500">
        {lang === "ar"
          ? "حدث خطأ أثناء تحميل المنتجات."
          : "An error occurred while loading products."}
      </div>
    );

  if (!Products.length) return null;

  return (
    <section className="py-10 bg-warm-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2">
              <Image
                src="/Icons/material-symbols_delivery-truck-bolt-rounded.svg"
                alt="services"
                width={40}
                height={40}
              />
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-balance">
                {lang === "ar" ? "التوصيل السريع" : "Express Delivery"}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {lang === "ar"
                ? "مجموعة الخدمات التي تقدمها شركتك"
                : "The range of services offered by your company"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Products.map((product) => (
              <ProductCard key={product.id || product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

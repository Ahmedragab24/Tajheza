"use client";

import ProductCard from "@/components/Molecules/Cards/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsByUserQuery } from "@/store/services/Provider/products";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import React from "react";

const ProviderProductsSection = () => {
  const lang = useLocale() as LangType;
  const { data, isLoading, isError } = useGetProductsByUserQuery(lang);
  const products = data?.data || [];

  if (isError)
    return (
      <div className="min-h-[60vh] flex flex-col gap-4 justify-center items-center">
        <h1 className="text-xl md:text-2xl text-red-600 font-bold">
          {lang === "ar"
            ? "حدث خطأ ما الرجاء محاولة مرة اخرى"
            : "An error occurred, please try again"}
        </h1>
      </div>
    );

  return (
    <div>
      {!isLoading && products.length === 0 && (
        <div className="min-h-[60vh] flex flex-col gap-4 justify-center items-center">
          <h1 className="text-xl md:text-2xl text-gray-600 font-bold">
            {lang === "ar" ? "لا يوجد خدمات لديك" : "You have no services"}
          </h1>

          <p>
            {lang === "ar" ? "اضف خدمة جديدة الأن" : "Add a new service now"}
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!isLoading &&
          products.length > 0 &&
          products.map((item) => <ProductCard key={item.id} product={item} />)}

        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-80" />
          ))}
      </div>
    </div>
  );
};

export default ProviderProductsSection;

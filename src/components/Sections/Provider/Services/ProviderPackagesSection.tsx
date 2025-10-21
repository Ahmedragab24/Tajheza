"use client";

import PackagesCard from "@/components/Molecules/Cards/PackagesCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPackagesByUserQuery } from "@/store/services/Provider/Packages";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import React from "react";

const ProviderPackagesSection = () => {
  const lang = useLocale() as LangType;
  const { data, isLoading, isError } = useGetPackagesByUserQuery(lang);
  const Packages = data?.data || [];

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
      {!isLoading && Packages.length === 0 && (
        <div className="min-h-[60vh] flex flex-col gap-4 justify-center items-center">
          <h1 className="text-xl md:text-2xl text-gray-600 font-bold">
            {lang === "ar" ? "لا يوجد باقات لديك" : "You have no Packages"}
          </h1>

          <p>
            {lang === "ar" ? "اضف باقة جديدة الأن" : "Add a new Package now"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!isLoading &&
          Packages.length > 0 &&
          Packages.map((item) => <PackagesCard key={item.id} Package={item} />)}

        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-60" />
          ))}
      </div>
    </div>
  );
};

export default ProviderPackagesSection;

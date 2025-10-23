"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Building2, AlertTriangle } from "lucide-react";
import { useGetAllCompaniesQuery } from "@/store/services/Companies";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import Link from "next/link";

const CompaniesPage = () => {
  const lang = useLocale() as LangType;

  const {
    data: companiesData,
    isLoading,
    isError,
    refetch,
  } = useGetAllCompaniesQuery();

  // تحميل
  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-2" />
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {lang === "ar" ? "جاري تحميل الشركات..." : "Loading companies..."}
        </p>
      </div>
    );

  // خطأ
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-3">
        <AlertTriangle className="w-10 h-10 text-red-500" />
        <p className="text-gray-600 dark:text-gray-300">
          {lang === "ar"
            ? "حدث خطأ أثناء تحميل الشركات"
            : "An error occurred while loading companies"}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          {lang === "ar" ? "إعادة المحاولة" : "Retry"}
        </button>
      </div>
    );

  // لا توجد بيانات
  if (!companiesData?.data?.length)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-2">
        <Building2 className="w-12 h-12 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-300">
          {lang === "ar"
            ? "لا توجد شركات متاحة حالياً"
            : "No companies available at the moment"}
        </p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        {lang === "ar" ? "قائمة الشركات" : "Companies List"}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {companiesData.data.map((company) => (
          <Link key={company.id} href={`/client/companies/${company.id}`}>
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl p-0">
              <div className="relative w-full h-[200px] bg-gray-100 dark:bg-gray-800">
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Building2 className="w-10 h-10 text-gray-400" />
                  </div>
                )}
              </div>

              <CardContent className="px-5 pb-4 space-y-2">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1">
                  {company.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {company.description ||
                    (lang === "ar"
                      ? "لا يوجد وصف متاح"
                      : "No description available")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                  <span className="font-medium">📍</span> {company.address}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompaniesPage;

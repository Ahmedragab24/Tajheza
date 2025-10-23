"use client";

import React, { useMemo } from "react";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import { useGetPageQuery } from "@/store/services/AppInfo";
import { FileText, Loader2 } from "lucide-react";

const TermsAndConditionsPage = () => {
  const lang = useLocale() as LangType;

  const { data, isLoading, isError } = useGetPageQuery({
    lang,
    type: "terms",
  });

  const pageData = data?.data?.items?.[0];

  const sections = useMemo(() => {
    if (!pageData?.description) return [];

    return pageData.description
      .split(/\r?\n\d+\.\s*/g)
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
  }, [pageData]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        {lang === "ar"
          ? "حدث خطأ أثناء تحميل البيانات."
          : "An error occurred while fetching data."}
      </div>
    );

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center gap-2 text-primary mb-6 text-center">
          <FileText />
          <h1 className="text-3xl font-bold">
            {pageData?.title ||
              (lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions")}
          </h1>
        </div>

        <div className="space-y-4 leading-relaxed text-gray-700 text-pretty">
          {sections.length > 0 ? (
            sections.map((section, index) => (
              <p key={index} className="text-lg">
                {section}
              </p>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              {lang === "ar"
                ? "لا توجد بيانات متاحة حالياً."
                : "No content available yet."}
            </p>
          )}
        </div>

        {pageData?.updated_at && (
          <p className="text-sm text-gray-900 font-semibold mt-10 text-center">
            {lang === "ar"
              ? `آخر تحديث: ${new Date(pageData.updated_at).toLocaleDateString(
                  "ar-EG"
                )}`
              : `Last updated: ${new Date(
                  pageData.updated_at
                ).toLocaleDateString("en-US")}`}
          </p>
        )}
      </div>
    </section>
  );
};

export default TermsAndConditionsPage;

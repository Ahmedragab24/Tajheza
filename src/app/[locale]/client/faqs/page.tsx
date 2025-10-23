"use client";

import React, { useMemo } from "react";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import { useGetPageQuery } from "@/store/services/AppInfo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import { FaQuestion } from "react-icons/fa";

const FaqsPage = () => {
  const lang = useLocale() as LangType;

  const { data, isLoading, isError } = useGetPageQuery({
    lang,
    type: "faq",
  });

  const faqData = data?.data?.items?.[0];

  const faqItems = useMemo(() => {
    if (!faqData?.description) return [];

    const text = faqData.description;

    const parts = text.split("؟");

    const result = [];

    for (let i = 0; i < parts.length - 1; i++) {
      const question = parts[i].trim() + "؟";
      const nextPart = parts[i + 1]?.trim();

      if (question && nextPart) {
        const answer = nextPart.split("؟")[0]?.trim();
        result.push({ question, answer });
      }
    }

    return result;
  }, [faqData]);

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
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center gap-2 text-primary mb-6 text-center">
        <FaQuestion />
        <h1 className="text-2xl font-semibold ">
          {faqData?.title || (lang === "ar" ? "الأسئلة الشائعة" : "FAQs")}
        </h1>
      </div>

      {faqItems.length > 0 ? (
        <Accordion
          type="single"
          collapsible
          className="space-y-4 md:max-w-5xl mx-auto"
        >
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg shadow-sm"
            >
              <AccordionTrigger className="text-start text-lg font-medium px-3 py-2">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg px-3 py-2 text-gray-700 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-center text-gray-500">
          {lang === "ar"
            ? "لا توجد أسئلة متاحة حالياً."
            : "No FAQs available yet."}
        </p>
      )}
    </section>
  );
};

export default FaqsPage;

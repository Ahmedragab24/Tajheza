"use client";

import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

const ErrorGetData = () => {
  const router = useRouter();
  const lang = useLocale();

  return (
    <div className="min-h-[50vh] flex flex-col gap-4 justify-center items-center">
      <ShieldX className="text-primary w-[150px] h-[150px] md:w-[200px] md:h-[200px]" />

      <h3 className="text-lg md:text-xl font-semibold text-primary">
        {lang === "ar" ? "حدث خطأ ما!" : "Something went wrong!"}
      </h3>
      <p className="text-sm text-gray-500">
        {lang === "ar"
          ? "حدث خطأ غير متوقع في جلب البيانات عليك إعادة جلب البيانات او الذهاب للصفحة الرئيسية"
          : "An unexpected error occurred while fetching data. You need to re-fetch the data or go to the home page."}
      </p>

      <div className="flex items-center gap-2">
        <Button variant={"outline"} onClick={() => router.refresh()}>
          {lang === "ar" ? "إعادة تحميل البيانات" : "Reload data"}
        </Button>
        <Button onClick={() => router.push("/")}>
          {lang === "ar" ? "العودة للصفحة الرئيسية" : "Back to Home Page"}
        </Button>
      </div>
    </div>
  );
};

export default ErrorGetData;

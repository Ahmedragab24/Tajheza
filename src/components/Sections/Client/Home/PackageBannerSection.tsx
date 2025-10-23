"use client";

import PackagesDialog from "@/components/Organisms/Dialogs/PackagesDialog";
import { useGetPackagesQuery } from "@/store/services/Packages";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

const PackageBannerSection = () => {
  const lang = useLocale() as LangType;
  const isRtl = lang === "ar";
  const { data } = useGetPackagesQuery();
  const Packages = data?.data || [];

  return (
    <div className="gradient">
      <div className="Container py-8 flex flex-col md:flex-row items-center !justify-center md:justify-between">
        <div className="flex flex-col items-center md:items-start gap-4">
          <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
            {isRtl
              ? "يمكنك مشاهده الباقات المتاحة من هنا"
              : "You can view the available packages here."}
          </h1>
          <h3 className="text-lg md:text-2xl font-medium text-white">
            {isRtl
              ? `متاح ${Packages.length} باقات الآن`
              : `Available ${Packages.length} packages now`}
          </h3>
          <PackagesDialog Packages={Packages} lang={lang} />
        </div>
        <div className="relative w-50 ml-20 md:ml-0 h-25 md:w-100 md:h-50">
          <Image
            src="/Images/6y_89nngd2vc5m6oc9d60p0-Photoroom 1.png"
            alt="package"
            fill
            className="object-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default PackageBannerSection;

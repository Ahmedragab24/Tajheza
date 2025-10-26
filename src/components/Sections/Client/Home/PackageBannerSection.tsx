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
      <div
        className={`Container py-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-10`}
      >
        <div className="flex flex-col items-center md:items-start text-center md:text-start gap-4">
          <h1 className="text-xl md:text-3xl text-gray-100 drop-shadow-md font-bold leading-snug">
            {isRtl
              ? "يمكنك مشاهدة الباقات المتاحة من هنا"
              : "You can view the available packages here."}
          </h1>
          <h3 className="text-lg md:text-2xl font-medium text-gray-200 drop-shadow-sm">
            {isRtl
              ? `متاح ${Packages.length} باقات الآن`
              : `Available ${Packages.length} packages now`}
          </h3>
          <PackagesDialog Packages={Packages} lang={lang} />
        </div>

        <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px] flex-shrink-0">
          <Image
            src="/Images/gifts.png"
            alt="Packages"
            fill
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default PackageBannerSection;

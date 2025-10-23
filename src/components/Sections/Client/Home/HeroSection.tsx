import OccasionsDialog from "@/components/Organisms/Dialogs/OccasionsDialog";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function HeroSection() {
  const t = useTranslations();
  const lang = useLocale();
  const isRtl = lang === "ar";

  return (
    <div className="relative w-full min-h-[50vh] md:min-h-[87.5vh] bg-secondary flex flex-col">
      <div
        className={`hidden lg:block absolute w-[30%] h-full bg-primary ${
          isRtl ? "!left-0" : "!right-0"
        }`}
      ></div>

      <div className="Container relative flex flex-col-reverse lg:grid lg:grid-cols-2 items-center justify-between gap-4 md:gap-10 h-full py-4 md:py-12">
        <div className="flex flex-col gap-4 md:gap-6 max-w-2xl text-center lg:text-start">
          <h1 className="text-lg sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
            {t("Hero.title")}
          </h1>
          <p className="text-xs sm:text-lg text-gray-700 leading-relaxed">
            {t("Hero.description")}
          </p>
          <OccasionsDialog>
            <Button className="mx-auto lg:mx-0 w-fit px-12 sm:px-16 rounded-full !h-12 text-base sm:text-lg">
              {t("Hero.button")}
            </Button>
          </OccasionsDialog>
        </div>

        <div className="w-2/3 lg:w-[480px] lg:h-[480px] p-4 sm:p-6 border rounded-tr-[25%] rounded-bl-[25%] mx-auto">
          <div className="relative w-full h-50 sm:h-80 lg:h-full">
            <Image
              src="/Images/Hero.jpg"
              alt="hero"
              fill
              className="object-cover rounded-tr-[25%] rounded-bl-[25%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

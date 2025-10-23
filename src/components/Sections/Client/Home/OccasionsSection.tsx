"use client";

import SectionTitle from "@/components/Atoms/titles/SectionTitle";
import OccasionCard from "@/components/Molecules/Cards/OccasionCard";
import { LangType } from "@/types/globals";
import React, { Suspense } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale } from "next-intl";
import { useGetCategoriesQuery } from "@/store/services/Categories";

const OccasionsSection = () => {
  const lang = useLocale() as LangType;
  const isRtl = lang === "ar";
  const { data } = useGetCategoriesQuery(lang);
  const Categories = data?.data || [];

  return (
    <Carousel
      className="w-full Container"
      opts={{
        align: "start",
        direction: isRtl ? "rtl" : "ltr",
        dragFree: true,
      }}
    >
      <div className="flex flex-col gap-4 pb-8 border-b">
        <div className="flex justify-between items-center mb-4">
          <SectionTitle
            title={isRtl ? "المناسبات" : "Occasions"}
            description={
              isRtl
                ? "نوفر لك كل ما تحتاجه لجعل مناسبتك مميزة"
                : "We provide everything you need to make your event special."
            }
            iconPath="/Icons/carbon_event.svg"
          />

          <div className="flex gap-2">
            <CarouselPrevious className="!w-8 !h-8 relative top-0" />
            <CarouselNext className="!w-8 !h-8 relative top-0" />
          </div>
        </div>
        <CarouselContent className="-ml-4">
          {Categories.map((item, index) => (
            <Suspense
              key={item.id || index}
              fallback={<Skeleton className="h-20 rounded-full" />}
            >
              <CarouselItem className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/7">
                <OccasionCard occasion={item} />
              </CarouselItem>
            </Suspense>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
};

export default OccasionsSection;

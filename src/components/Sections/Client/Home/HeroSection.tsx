"use client";

import OccasionsDialog from "@/components/Organisms/Dialogs/OccasionsDialog";
import { Button } from "@/components/ui/button";
import { useGetBannersQuery } from "@/store/services/Banners";
import { LangType } from "@/types/globals";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";

export default function HeroSection() {
  const t = useTranslations();
  const lang = useLocale() as LangType;
  const isRtl = lang === "ar";
  const { data, isLoading } = useGetBannersQuery(lang);
  const Banners = data?.data.banners || [];

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="relative w-full min-h-[50vh] md:min-h-[87.5vh] bg-secondary flex flex-col justify-center items-center overflow-hidden">
      <div
        className={`hidden lg:block absolute w-[30%] h-full bg-primary ${
          isRtl ? "!left-0" : "!right-0"
        }`}
      ></div>

      {isLoading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <>
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.reset()}
            opts={{
              loop: true,
              direction: isRtl ? "rtl" : "ltr",
            }}
            className="w-full h-full overflow-hidden"
          >
            <CarouselContent>
              {Banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="Container relative flex flex-col-reverse lg:grid lg:grid-cols-2 items-center justify-between gap-4 md:gap-10 h-full py-4 md:py-12">
                    <div className="flex flex-col gap-4 md:gap-6 max-w-2xl text-center lg:text-start">
                      <h1 className="text-lg sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                        {banner.title || t("Hero.title")}
                      </h1>
                      <OccasionsDialog>
                        <Button className="mx-auto lg:mx-0 w-fit px-12 sm:px-16 rounded-full !h-12 text-base sm:text-lg">
                          {t("Hero.button")}
                        </Button>
                      </OccasionsDialog>
                    </div>

                    <div className="w-2/3 lg:w-[480px] lg:h-[480px] p-4 sm:p-6 border rounded-tr-[25%] rounded-bl-[25%] mx-auto">
                      <div className="relative w-full h-50 sm:h-80 lg:h-full">
                        <Image
                          src={banner.image}
                          alt={banner.title || "Banner"}
                          fill
                          className="object-cover rounded-tr-[25%] rounded-bl-[25%]"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {Banners.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-4 bottom-4 z-10 border border-primary" />
                <CarouselNext className="absolute right-4 bottom-4 z-10 border border-primary" />
              </>
            )}
          </Carousel>

          {Banners.length > 1 && (
            <div className="flex justify-center items-center gap-2 my-4 md:mt-0">
              {Banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    current === index
                      ? "bg-primary scale-110"
                      : "bg-gray-400/60 hover:bg-gray-500/80"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

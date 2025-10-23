"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Dispatch, useEffect } from "react";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import { ProductFilteringType } from "@/app/[locale]/client/services/page";
import { useGetServicesQuery } from "@/store/services/Services";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCcw, AlertTriangle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  TabValue: ProductFilteringType;
  setTabValue: Dispatch<React.SetStateAction<ProductFilteringType>>;
}

export default function ServicesTabs({ TabValue, setTabValue }: Props) {
  const lang = useLocale() as LangType;
  const { data, isLoading, isError, refetch } = useGetServicesQuery(lang);
  const services = data?.data || [];
  const isRtl = lang === "ar";

  const selectedServiceId = useSelector(
    (state: RootState) => state.service.selectedServiceId
  );

  useEffect(() => {
    if (selectedServiceId) {
      setTabValue((prev) => ({
        ...prev,
        categoryId: Number(selectedServiceId),
      }));
    }
  }, [selectedServiceId, setTabValue]);

  const handleRefetch = () => refetch();

  if (isError) {
    return (
      <div className="flex items-center justify-center p-4 border border-red-300 bg-red-50 rounded-lg mx-auto my-4 gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <span className="text-sm font-medium text-red-700">
          {isRtl
            ? "فشل تحميل الخدمات. حاول مرة أخرى."
            : "Failed to load services. Please try again."}
        </span>
        <Button
          onClick={handleRefetch}
          disabled={isLoading}
          size="sm"
          variant="outline"
          className="ml-4 border-red-500 text-red-500 hover:bg-red-100"
        >
          <RefreshCcw
            className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          {isRtl ? "إعادة المحاولة" : "Retry"}
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-2 bg-transparent">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="rounded-full h-10 w-24" />
        ))}
      </div>
    );
  }

  return (
    <Tabs
      value={String(TabValue.categoryId)}
      onValueChange={(newCategoryId: string) => {
        const finalValue =
          newCategoryId === "null" ? null : Number(newCategoryId);
        setTabValue((prev) => ({ ...prev, categoryId: finalValue }));
      }}
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full"
    >
      <TabsList className="w-full bg-transparent border-none">
        <Carousel
          opts={{
            align: "start",
            direction: isRtl ? "rtl" : "ltr",
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="flex gap-2">
            <CarouselItem className="basis-auto">
              <TabsTrigger
                value="null"
                className="text-sm sm:text-base px-4 py-2 border rounded-full bg-transparent border-secondary text-primary 
                data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap"
              >
                {isRtl ? "الكل" : "All"}
              </TabsTrigger>
            </CarouselItem>

            {services.map((item) => (
              <CarouselItem key={item.id} className="basis-auto">
                <TabsTrigger
                  value={String(item.id)}
                  className="text-sm sm:text-base px-4 py-2 border rounded-full bg-transparent border-secondary text-primary 
                  data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap"
                >
                  {item.name}
                </TabsTrigger>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </TabsList>
    </Tabs>
  );
}

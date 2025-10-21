"use client";

import SectionTitle from "@/components/Atoms/titles/SectionTitle";
import ServiceCard from "@/components/Molecules/Cards/ServiceCard";
import { Button } from "@/components/ui/button";
import { useGetServicesQuery } from "@/store/services/Services";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import React from "react";

const ServicesSection = () => {
  const lang = useLocale() as LangType;
  const isRtl = lang === "ar";
  const { data } = useGetServicesQuery(lang);
  const Services = data?.data || [];

  console.log("Services", Services);

  return (
    <div className="Container">
      <div className="flex flex-col gap-4 pb-8 border-b">
        <div className="flex justify-between items-center">
          <SectionTitle
            title={isRtl ? "خدماتنا" : "Our services"}
            description={
              isRtl
                ? "مجموعة متكاملة من الخدمات لتجعل مناسبتك أسهل وأجمل"
                : "A comprehensive range of services to make your event easier and more beautiful."
            }
            iconPath="/Icons/medal-star.svg"
          />

          <Button variant={"link"}>
            {isRtl ? "عرض جميع الخدمات" : "View all services"}
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Services.map((item, index) => (
            <ServiceCard key={index} service={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;

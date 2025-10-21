"use client";

import { LangType } from "@/types/globals";
import ServiceCompanyCard from "@/components/Molecules/Cards/ServiceCompanyCard";
import ServiceProductsCompanyDialog from "@/components/Organisms/Dialogs/ServiceProductsCompanyDialog";
import { useGetCompanyServicesQuery } from "@/store/services/Provider/Company";
import Image from "next/image";

interface CompanyServicesProps {
  lang: LangType;
}

export function CompanyServices({ lang }: CompanyServicesProps) {
  const { data } = useGetCompanyServicesQuery();
  const services = data?.data;

  return (
    <section className="py-10 bg-warm-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2">
              <Image
                src="/Icons/medal-star.svg"
                alt="services"
                width={40}
                height={40}
              />
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-balance">
                {lang === "ar" ? "خدماتنا" : "Our Services"}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {lang === "ar"
                ? "مجموعة الخدمات التي تقدمها شركتك"
                : "The range of services offered by your company"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services &&
              services.map((service) => (
                <ServiceProductsCompanyDialog
                  key={service.id}
                  lang={lang}
                  products={service.products}
                >
                  <ServiceCompanyCard service={service} lang={lang} />
                </ServiceProductsCompanyDialog>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

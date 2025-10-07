"use client";

import { ServiceType } from "@/types/Companies";
import { LangType } from "@/types/globals";
import ServiceCompanyCard from "@/components/Molecules/Cards/ServiceCompanyCard";
import ServiceProductsCompanyDialog from "@/components/Organisms/Dialogs/ServiceProductsCompanyDialog";

interface CompanyServicesProps {
  services: ServiceType[];
  lang: LangType;
}

export function CompanyServices({ services, lang }: CompanyServicesProps) {
  return (
    <section className="py-10 bg-warm-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              {lang === "ar" ? "خدماتنا" : "Our Services"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {lang === "ar"
                ? "اكتشف مجموعتنا الشاملة من الخدمات المهنية المصممة لتلبية احتياجاتك"
                : "Discover our comprehensive range of professional services designed to meet your needs"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
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

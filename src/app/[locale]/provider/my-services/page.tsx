import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import ProviderProductsSection from "@/components/Sections/Provider/Services/ProviderProductsSection";
import ProviderPackagesSection from "@/components/Sections/Provider/Services/ProviderPackagesSection";

const MyServicesPage = () => {
  const isRtl = (useLocale() as LangType) === "ar";

  const ItemsTrigger = [
    {
      value: "Services",
      label: isRtl ? "الخدمات" : "Services",
    },
    {
      value: "Packages",
      label: isRtl ? "الباقات" : "Packages",
    },
  ];

  return (
    <Tabs
      defaultValue={ItemsTrigger[0].value}
      dir={isRtl ? "rtl" : "ltr"}
      className="Container items-center space-y-6"
    >
      <TabsList className="gap-1 bg-transparent">
        {ItemsTrigger.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="h-12 px-8 rounded-full border border-gray-500 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none cursor-pointer"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="Services" className="w-full">
        <ProviderProductsSection />
      </TabsContent>
      <TabsContent value="Packages" className="w-full">
        <ProviderPackagesSection />
      </TabsContent>
    </Tabs>
  );
};

export default MyServicesPage;

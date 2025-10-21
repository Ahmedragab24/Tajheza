import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import AddProductForm from "@/components/Organisms/Forms/AddProductForm";
import AddPackageForm from "@/components/Organisms/Forms/AddPackageForm";

const AddServicePage = () => {
  const isRtl = (useLocale() as LangType) === "ar";

  const ItemsTrigger = [
    {
      value: "Service",
      label: isRtl ? "اضافة خدمة" : "Add Service",
    },
    {
      value: "Package",
      label: isRtl ? "اضافة باقة" : "Add Package",
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
      <TabsContent value="Service" className="w-full">
        <AddProductForm />
      </TabsContent>
      <TabsContent value="Package" className="w-full">
        <AddPackageForm />
      </TabsContent>
    </Tabs>
  );
};

export default AddServicePage;

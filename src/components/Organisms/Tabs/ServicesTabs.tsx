import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch } from "react";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import { ProductFilteringType } from "@/app/[locale]/client/home/services/page";
import { useGetServicesQuery } from "@/store/services/Services";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCcw, AlertTriangle } from "lucide-react";

interface Props {
  TabValue: ProductFilteringType;
  setTabValue: Dispatch<React.SetStateAction<ProductFilteringType>>;
}

export default function ServicesTabs({ TabValue, setTabValue }: Props) {
  const lang = useLocale() as LangType;

  const { data, isLoading, isError, refetch } = useGetServicesQuery(lang);
  const services = data?.data || [];
  const isRtl = lang === "ar";

  const handleRefetch = () => {
    refetch();
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center p-4 border border-red-300 bg-red-50 rounded-lg max-w-full mx-auto my-4 gap-3">
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
  // ------------------------------------

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-1 bg-transparent">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="rounded-full h-10 w-24" />
        ))}
      </div>
    );
  }
  // ------------------------------

  return (
    <Tabs
      value={String(TabValue.categoryId)}
      onValueChange={(newCategoryId: string) => {
        const finalValue =
          newCategoryId === "null" ? null : Number(newCategoryId);

        setTabValue((prev) => ({ ...prev, categoryId: finalValue }));
      }}
      className="items-center"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <TabsList className="gap-1 bg-transparent">
        <TabsTrigger
          value="null"
          className="text-lg bg-bg-transparent border-secondary text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none cursor-pointer"
        >
          {isRtl ? "الكل" : "All"}
        </TabsTrigger>

        {services.map((item) => (
          <TabsTrigger
            key={item.id}
            value={String(item.id)}
            className="text-lg bg-bg-transparent border-secondary text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none cursor-pointer"
          >
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import {
  useGetMyCompanyInfoForUpdateQuery,
  useGetMyCompanyInfoQuery,
} from "@/store/services/Provider/Company";
import { CompanyHero } from "@/components/Sections/Provider/Profile/CompanyHero";
import { CompanyServices } from "@/components/Sections/Provider/Profile/CompanyServices";
import { CompanyCustomers } from "@/components/Sections/Provider/Profile/CompanyCustomers";
import { CompanyReviews } from "@/components/Sections/Provider/Profile/CompanyReviews";
import { CompanyExpressProducts } from "@/components/Sections/Provider/Profile/CompanyExpressProducts";

const ProviderProfilePage = () => {
  const lang = useLocale() as LangType;
  const { data, isLoading, isError } = useGetMyCompanyInfoForUpdateQuery();
  const Company = data?.data;
  const {
    data: InfoData,
    isLoading: InfoLoading,
    isError: InfoError,
  } = useGetMyCompanyInfoQuery();
  const Info = InfoData?.data;

  const AllLoading = isLoading || InfoLoading;
  const AllError = isError || InfoError;

  if (AllLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <Skeleton className="h-96 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (AllError || !Company || !Info) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            {lang === "ar" ? "الشركة غير موجودة" : "Company Not Found "}
          </h1>
          <p className="text-muted-foreground">
            {lang === "ar"
              ? "الشركة التي تبحث عنها غير موجودة أو تمت إزالتها."
              : "The company you&apos;re looking for doesn&apost exist or has been removed."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <CompanyHero company={Company} info={Info} lang={lang} />

      {/* Services Section */}
      <CompanyServices lang={lang} />

      {/* Express Products*/}
      <CompanyExpressProducts lang={lang} />

      {/* Previous Customers Section */}
      {Info.ordered_users && Info.ordered_users.length > 0 && (
        <CompanyCustomers customers={Info.ordered_users} lang={lang} />
      )}

      {/* Reviews Section */}
      <CompanyReviews lang={lang} />
    </div>
  );
};

export default ProviderProfilePage;

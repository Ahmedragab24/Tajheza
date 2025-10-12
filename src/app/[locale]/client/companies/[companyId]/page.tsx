"use client";

import { useGetCompanyByIdQuery } from "@/store/services/Companies";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CompanyHero } from "@/components/Sections/Client/Companies/CompanyHero";
import { CompanyStats } from "@/components/Sections/Client/Companies/CompanyStats";
import { CompanyServices } from "@/components/Sections/Client/Companies/CompanyServices";
import { CompanyCustomers } from "@/components/Sections/Client/Companies/CompanyCustomers";
import { CompanyReviews } from "@/components/Sections/Client/Companies/CompanyReviews";
import { AddReviewForm } from "@/components/Organisms/Forms/AddReviewForm";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";

const CompanyDetailsPage = () => {
  const lang = useLocale() as LangType;
  const { companyId } = useParams();
  const CompanyID = companyId ? +companyId : 0;
  const { data, isLoading, isError } = useGetCompanyByIdQuery(CompanyID);
  const Company = data?.data;
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (isLoading) {
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

  if (isError || !Company) {
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
      <CompanyHero company={Company} lang={lang} />

      {/* Stats Section */}
      <CompanyStats company={Company} lang={lang} />

      {/* Services Section */}
      {Company.services && Company.services.length > 0 && (
        <CompanyServices services={Company.services} lang={lang} />
      )}

      {/* Previous Customers Section */}
      {Company.ordered_users && Company.ordered_users.length > 0 && (
        <CompanyCustomers customers={Company.ordered_users} lang={lang} />
      )}

      {/* Reviews Section */}
      <CompanyReviews
        lang={lang}
        reviews={Company.reviews}
        rating={Company.rating}
        reviewsCount={Company.reviews_count}
        onAddReview={() => setShowReviewForm(true)}
      />

      {/* Add Review Form */}
      {showReviewForm && (
        <AddReviewForm
          lang={lang}
          companyId={Company.id}
          onClose={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
};

export default CompanyDetailsPage;

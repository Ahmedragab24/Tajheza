import MemberShipPackageCard from "@/components/Molecules/Cards/MemberShipPackageCard";
import ErrorGetData from "@/components/Molecules/ErrorGetData/ErrorGetData";
import NotFoundData from "@/components/Molecules/NotFoundData/NotFoundData";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMembershipsPackagesQuery } from "@/store/services/MembershipPackage";
import { LangType } from "@/types/globals";
import React from "react";

interface Props {
  lang: LangType;
}

const MembershipSection = ({ lang }: Props) => {
  const { data, isLoading, isError } = useGetMembershipsPackagesQuery(lang);
  const Packages = data?.data || [];

  if (isError) return <ErrorGetData />;

  return (
    <div className="space-y-4">
      {!isLoading && Packages.length === 0 && (
        <NotFoundData
          title={
            lang === "ar"
              ? "لا توجد باقات عضوية"
              : "There are no membership packages"
          }
          description={
            lang === "ar"
              ? "لا توجد باقات عضوية حتى الآن. قريباً سيكون هناك باقات عضوية متاحة"
              : "There are no membership packages yet. Membership packages will be available soon."
          }
          image="/Images/search 1.png"
        />
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {!isLoading &&
          Packages.length > 0 &&
          Packages.map((item) => (
            <MemberShipPackageCard key={item.id} package={item} lang={lang} />
          ))}

        {isLoading && (
          <>
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
          </>
        )}
      </div>
    </div>
  );
};

export default MembershipSection;

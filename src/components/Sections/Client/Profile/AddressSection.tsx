"use client";

import AddressCard from "@/components/Molecules/Cards/AddressCard";
import ErrorGetData from "@/components/Molecules/ErrorGetData/ErrorGetData";
import NotFoundData from "@/components/Molecules/NotFoundData/NotFoundData";
import AddAddressDialog from "@/components/Organisms/Dialogs/AddAddressDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAddressesQuery } from "@/store/services/Address";
import { LangType } from "@/types/globals";
import React from "react";

interface Props {
  lang: LangType;
}

const AddressSection = ({ lang }: Props) => {
  const { data, isLoading, isError } = useGetAddressesQuery();
  const Addresses = data?.data || [];

  if (isError) return <ErrorGetData />;

  return (
    <div className="p-4 space-y-4">
      <AddAddressDialog lang={lang} />

      {!isLoading && Addresses.length === 0 && (
        <NotFoundData
          title={
            lang === "ar" ? "لا توجد عناوين مسجلة" : "No registered addresses"
          }
          description={
            lang === "ar"
              ? "قم بإضافة عنوان جديد لتسهيل عملية التوصيل"
              : "Add a new address to facilitate the delivery process"
          }
          image="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3MTJkMjMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tYXAtcGluLWhvdXNlLWljb24gbHVjaWRlLW1hcC1waW4taG91c2UiPjxwYXRoIGQ9Ik0xNSAyMmExIDEgMCAwIDEtMS0xdi00YTEgMSAwIDAgMSAuNDQ1LS44MzJsMy0yYTEgMSAwIDAgMSAxLjExIDBsMyAyQTEgMSAwIDAgMSAyMiAxN3Y0YTEgMSAwIDAgMS0xIDF6Ii8+PHBhdGggZD0iTTE4IDEwYTggOCAwIDAgMC0xNiAwYzAgNC45OTMgNS41MzkgMTAuMTkzIDcuMzk5IDExLjc5OWExIDEgMCAwIDAgLjYwMS4yIi8+PHBhdGggZD0iTTE4IDIydi0zIi8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg=="
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {!isLoading &&
          Addresses.length > 0 &&
          Addresses.map((item) => (
            <AddressCard key={item.id} lang={lang} address={item} />
          ))}

        {isLoading && (
          <>
            <Skeleton className="h-[180px]" />
            <Skeleton className="h-[180px]" />
          </>
        )}
      </div>
    </div>
  );
};

export default AddressSection;

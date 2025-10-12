"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorGetData from "@/components/Molecules/ErrorGetData/ErrorGetData";
import NotFoundData from "@/components/Molecules/NotFoundData/NotFoundData";
import { useGetUserOrdersQuery } from "@/store/services/Orders";
import OrderCard from "@/components/Molecules/Cards/OrderCard";
import { LangType } from "@/types/globals";
import { OrderStatusType } from "@/types/Orders";

interface Props {
  lang: LangType;
}

const OrdersSection = ({ lang }: Props) => {
  const [status, setStatus] = useState<OrderStatusType>("accepted");
  const { data, isLoading, isError } = useGetUserOrdersQuery(status);
  const Orders = data?.data || [];

  const statusList: { label: string; value: OrderStatusType }[] = [
    { label: lang === "ar" ? "مكتمل" : "Completed", value: "accepted" },
    { label: lang === "ar" ? "قيد التنفيذ" : "In Progress", value: "pending" },
    { label: lang === "ar" ? "ملغى" : "Cancelled", value: "decline" },
  ];

  if (isError) return <ErrorGetData />;

  return (
    <Tabs
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="w-full"
      value={status}
      onValueChange={(value) => setStatus(value as OrderStatusType)}
    >
      <TabsList className="w-full h-11 md:w-1/2 mx-auto flex gap-4 bg-secondary">
        {statusList.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="capitalize"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={status}>
        <div className="p-4 space-y-4">
          {!isLoading && Orders.length === 0 && (
            <NotFoundData
              title={
                lang === "ar"
                  ? "لا توجد طلبات حالياً"
                  : "No orders available right now"
              }
              description={
                lang === "ar"
                  ? "لا توجد طلبات في هذه الحالة حالياً"
                  : "There are no orders in this status at the moment."
              }
              image="/Images/Box.png"
              classImage="w-[100px] h-[150px] md:w-[150px] md:h-[200px]"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {!isLoading &&
              Orders.length > 0 &&
              Orders.map((order) => (
                <OrderCard key={order.id} order={order} lang={lang} />
              ))}

            {isLoading && (
              <>
                <Skeleton className="h-[220px]" />
                <Skeleton className="h-[220px]" />
                <Skeleton className="h-[220px]" />
              </>
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default OrdersSection;

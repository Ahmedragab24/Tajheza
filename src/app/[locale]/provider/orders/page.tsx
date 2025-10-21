"use client";

import ProviderOrderCard from "@/components/Molecules/Cards/ProviderOrderCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProviderOrdersQuery } from "@/store/services/Provider/ProviderOrders";
import type { LangType } from "@/types/globals";
import type { OrderStatusType } from "@/types/Orders";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

const OrdersPage = () => {
  const lang = useLocale() as LangType;
  const [stateOrder, setStateOrder] = useState<OrderStatusType>(null);
  const { data, isLoading, isError } = useGetProviderOrdersQuery({
    lang,
    status: stateOrder,
  });

  const Orders = data?.data || [];

  const statusOptions: { value: OrderStatusType; label: string }[] = [
    { value: null, label: lang === "ar" ? "الكل" : "All" },
    { value: "accepted", label: lang === "ar" ? "مكتمل" : "complete" },
    { value: "pending", label: lang === "ar" ? "قيد التنفيذ" : "In progress" },
    { value: "decline", label: lang === "ar" ? "ملغي" : "Cancelled" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-3 mb-8">
          {statusOptions.map((option) => (
            <Button
              key={option.label}
              onClick={() => setStateOrder(option.value)}
              variant={stateOrder === option.value ? "default" : "outline"}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-colors border ${
                stateOrder === option.value
                  ? "bg-secondary text-amber-900 border-primary hover:bg-secondary/80"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {isLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-6 rounded-lg bg-white border border-gray-200"
              >
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-10 w-24 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {lang === "ar"
                ? "حدث خطأ في تحميل الطلبات"
                : "There was an error loading the requests."}
            </h3>
            <p className="text-gray-600">
              {lang === "ar"
                ? "يرجى محاولة إعادة تحميل الصفحة أو المحاولة لاحقاً"
                : "Please try reloading the page or try again later."}
            </p>
          </div>
        )}

        {!isLoading && !isError && Orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {lang === "ar" ? "لا توجد طلبات" : "No Orders"}
            </h3>
            <p className="text-gray-600">
              {lang === "ar"
                ? "لم يتم العثور على أي طلبات للحالة المحددة"
                : "No Orders were found for the specified status."}
            </p>
          </div>
        )}

        {!isLoading && !isError && Orders.length > 0 && (
          <div className="space-y-4">
            {Orders.map((order) => (
              <ProviderOrderCard key={order.id} order={order} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

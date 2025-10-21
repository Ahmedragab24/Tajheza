"use client";

import SectionTitle from "@/components/Atoms/titles/SectionTitle";
import ProductCard from "@/components/Molecules/Cards/ProductCard";
import ProviderOrderCard from "@/components/Molecules/Cards/ProviderOrderCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetLatestProductsQuery } from "@/store/services/Products";
import { useGetProviderOrdersQuery } from "@/store/services/Provider/ProviderOrders";
import type { LangType } from "@/types/globals";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { useLocale } from "next-intl";
import { Suspense } from "react";

const ProviderHomePage = () => {
  const lang = useLocale() as LangType;
  const isRtl = lang === "ar";
  const { data, isLoading, isError } = useGetLatestProductsQuery(lang);
  const Products = data?.data || [];

  const {
    data: OrdersData,
    isLoading: orderLoading,
    isError: OrderError,
  } = useGetProviderOrdersQuery({
    lang,
    status: null,
  });

  const Orders = OrdersData?.data || [];

  return (
    <div className="Container space-y-8">
      {!isLoading && isError ? (
        <div className="min-h-[60vh] flex flex-col gap-4 justify-center items-center">
          <h1 className="text-xl md:text-2xl text-red-600 font-bold">
            {lang === "ar"
              ? "حدث خطأ ما الرجاء محاولة مرة اخرى"
              : "An error occurred, please try again"}
          </h1>
        </div>
      ) : (
        <div className="flex flex-col gap-4 pb-8 border-b">
          <div className="flex justify-between items-center">
            <SectionTitle
              title={isRtl ? "خدماتى" : "My Services"}
              iconPath="/Icons/medal-star.svg"
            />
          </div>

          {!isLoading && Products.length === 0 && (
            <div className="min-h-[60vh] flex flex-col gap-4 justify-center items-center">
              <h1 className="text-xl md:text-2xl text-gray-600 font-bold">
                {lang === "ar" ? "لا يوجد خدمات لديك" : "You have no services"}
              </h1>

              <p>
                {lang === "ar"
                  ? "اضف خدمة جديدة الأن"
                  : "Add a new service now"}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {!isLoading &&
              Products.length > 0 &&
              Products.slice(0.4).map((item, index) => (
                <Suspense
                  key={index}
                  fallback={<Skeleton key={index} className="h-40 md:h-60" />}
                >
                  <ProductCard product={item} />
                </Suspense>
              ))}

            {isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-80" />
              ))}
          </div>
        </div>
      )}

      {!orderLoading && OrderError ? (
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
      ) : (
        <div className="flex flex-col gap-4 pb-8 border-b">
          <div className="flex justify-between items-center">
            <SectionTitle
              title={isRtl ? "الطلبات" : "Orders"}
              iconPath="/Icons/icon-park-outline_transaction-order.svg"
            />
          </div>

          {orderLoading && (
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

          {!orderLoading && Orders.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {Orders.slice(0.4).map((item, index) => (
                <Suspense
                  key={index}
                  fallback={<Skeleton key={index} className="h-40 md:h-60" />}
                >
                  <ProviderOrderCard lang={lang} order={item} />
                </Suspense>
              ))}
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
        </div>
      )}
    </div>
  );
};

export default ProviderHomePage;

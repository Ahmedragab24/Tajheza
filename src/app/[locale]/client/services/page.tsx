"use client";

import ProductCard from "@/components/Molecules/Cards/ProductCard";
import ServicesTabs from "@/components/Organisms/Tabs/ServicesTabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, SearchX } from "lucide-react";
import {
  useGetSearchProductsBySortedQuery,
  useGetSearchProductsQuery,
} from "@/store/services/Search";
import React, { useState } from "react";
import FilterProductDialog from "@/components/Organisms/Dialogs/FilterProductDialog";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import { SortByType } from "@/types/Search";
import SelectSorting from "@/components/Molecules/Selects/SelectSorting";

export interface ProductFilteringType {
  name: null | string;
  categoryId: null | number;
  date: null | Date;
  city: undefined | string;
  min_price: number;
  max_price: number;
  sortedBy: undefined | SortByType;
}

const ServicesPage = () => {
  const [Filter, setFilter] = useState<ProductFilteringType>({
    name: null,
    categoryId: null,
    date: null,
    city: undefined,
    min_price: 0,
    max_price: 1000000,
    sortedBy: undefined,
  });

  const lang = useLocale() as LangType;
  const isRtl = lang === "ar";

  const hasSorting = !!Filter.sortedBy;

  const searchQuery = useGetSearchProductsQuery(Filter, {
    skip: hasSorting,
  });

  const sortedQuery = useGetSearchProductsBySortedQuery(
    { lang, sortedBy: Filter.sortedBy },
    {
      skip: !hasSorting,
    }
  );

  const activeQuery = hasSorting ? sortedQuery : searchQuery;

  const Products = activeQuery.data?.data || [];
  const loading = activeQuery.isLoading;
  const error = activeQuery.isError;
  const refetch = activeQuery.refetch;

  if (error) {
    return (
      <div className="Container my-10 space-y-10">
        <div className="flex flex-col items-center justify-center p-8 border border-red-300 bg-red-50 rounded-lg max-w-lg mx-auto my-10 gap-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
          <p className="text-lg font-medium text-red-800 text-center">
            {isRtl
              ? "فشل تحميل المنتجات. ربما توجد مشكلة في الاتصال أو الخادم."
              : "Failed to load products. Connection or server error."}
          </p>
          <Button
            onClick={refetch}
            disabled={loading}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-100"
          >
            <RefreshCcw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            {isRtl ? "إعادة محاولة البحث" : "Retry Search"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="Container my-10 space-y-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <SelectSorting
            value={Filter.sortedBy}
            onChange={setFilter}
            lang={lang}
          />

          <FilterProductDialog
            TabValue={Filter}
            setTabValue={setFilter}
            lang={lang}
          />
        </div>

        <ServicesTabs TabValue={Filter} setTabValue={setFilter} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-40 md:h-60" />
          ))}

        {!loading &&
          Products.map((item) => <ProductCard key={item.id} product={item} />)}

        {!loading && Products.length === 0 && (
          <div className="col-span-full flex flex-col justify-center items-center gap-4 text-center p-10 bg-gray-50 rounded-lg">
            <SearchX className="text-primary w-12 h-12 md:w-20 md:h-20" />
            <p className="text-lg md:text-2xl text-gray-600">
              {isRtl
                ? "لا توجد منتجات مطابقة لمرشحات البحث."
                : "No products matching the current filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;

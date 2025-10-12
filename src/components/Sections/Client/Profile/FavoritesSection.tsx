"use client";

import ProductCard from "@/components/Molecules/Cards/ProductCard";
import ErrorGetData from "@/components/Molecules/ErrorGetData/ErrorGetData";
import NotFoundData from "@/components/Molecules/NotFoundData/NotFoundData";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFavoritesQuery } from "@/store/services/Favorites";
import { LangType } from "@/types/globals";
import React from "react";

interface Props {
  lang: LangType;
}

const FavoritesSection = ({ lang }: Props) => {
  const { data, isLoading, isError } = useGetFavoritesQuery(lang);
  const Favorites = data?.data || [];

  if (isError) return <ErrorGetData />;

  return (
    <div className="p-4 space-y-4">
      {!isLoading && Favorites.length === 0 && (
        <NotFoundData
          title={
            lang === "ar"
              ? "لا توجد منتجات مفضلة لديك!"
              : "You have no favorite products!"
          }
          description={
            lang === "ar"
              ? "لا توجد عناصر مفضلة حتى الآن. أضف منتجاتك المفضلة لتسهيل الوصول إليها لاحقًا"
              : "There are no favorite items yet. Add your favorite products for easy access later."
          }
          image="/Images/search 1.png"
        />
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {!isLoading &&
          Favorites.length > 0 &&
          Favorites.map((item) => <ProductCard key={item.id} product={item} />)}

        {isLoading && (
          <>
            <Skeleton className="h-[230px]" />
            <Skeleton className="h-[230px]" />
            <Skeleton className="h-[230px]" />
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesSection;

"use client";

import { Input } from "@/components/ui/input";
import { useGetSearchProductsQuery } from "@/store/services/Search";
import { LangType } from "@/types/globals";
import { SearchIcon } from "lucide-react";
import { useLocale } from "next-intl";
import React, { useEffect, useId, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductType } from "@/types/Products";
import Image from "next/image";
import RiyalIcon from "../Icons/RiyalIcon";
import Link from "next/link";

const SearchInput = () => {
  const id = useId();
  const lang = useLocale() as LangType;

  const [filters, setFilters] = useState({
    name: "",
  });
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(filters.name.trim());
      setIsOpen(!!filters.name.trim());
    }, 400);
    return () => clearTimeout(handler);
  }, [filters.name]);

  const { data, isLoading, isFetching, isError } = useGetSearchProductsQuery(
    {
      name: debouncedKeyword || null,
      categoryId: null,
      date: null,
      city: undefined,
      min_price: 0,
      max_price: 1000000,
      sortedBy: undefined,
    },
    { skip: !debouncedKeyword }
  );

  const products = data?.data || [];

  return (
    <div ref={wrapperRef} className="relative mx-auto w-full">
      {/* Input */}
      <div className="relative">
        <SearchIcon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"
        />
        <Input
          id={id}
          className="w-full h-11 ps-10 pe-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-full text-sm placeholder:text-gray-400 dark:placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
          placeholder={
            lang === "ar" ? "ابحث عن منتج..." : "Search for a product..."
          }
          type="search"
          value={filters.name}
          onChange={(e) => {
            setFilters((prev) => ({ ...prev, name: e.target.value }));
            setIsOpen(true);
          }}
        />
      </div>

      {/* Results Container */}
      {isOpen && (
        <>
          {(isLoading || isFetching) && (
            <div className="absolute z-20 mt-2 w-full bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-lg p-4 space-y-2">
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-4/6" />
            </div>
          )}

          {isError && (
            <div className="absolute z-20 mt-2 w-full bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-700 p-4 text-sm text-center">
              {lang === "ar"
                ? "حدث خطأ أثناء البحث. حاول مرة أخرى."
                : "An error occurred while searching. Please try again."}
            </div>
          )}

          {debouncedKeyword && !isLoading && products.length > 0 && (
            <div className="absolute z-20 mt-2 w-full bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-lg max-h-80 overflow-y-auto backdrop-blur-sm divide-y divide-gray-100 dark:divide-zinc-700">
              {products.map((item: ProductType) => (
                <Link
                  href={`/client/services/${item.id}`}
                  key={item.id}
                  className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-zinc-700">
                    <Image
                      src={item.main_image || "/placeholder.png"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col w-full min-w-0">
                    <span className="font-medium text-sm text-gray-900 dark:text-white truncate">
                      {item.title}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                      <span>{item.price}</span>
                      <RiyalIcon className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {debouncedKeyword &&
            !isLoading &&
            products.length === 0 &&
            !isError && (
              <div className="absolute z-20 mt-2 w-full bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-lg p-4 text-center text-sm text-gray-600 dark:text-gray-300">
                {lang === "ar"
                  ? "لا توجد نتائج مطابقة"
                  : "No matching results found"}
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default SearchInput;

"use client";

import { useLocale } from "next-intl";

const ProfileFormSkeleton = () => {
  const locale = useLocale();

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="max-w-4xl mx-auto">
      {/* Title Skeleton */}
      <div className="mb-10">
        <div className="h-8 bg-gray-200 rounded animate-pulse mb-2 w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
      </div>

      {/* Form Fields Skeleton */}
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-center pt-6">
          <div className="h-13 bg-gray-200 rounded animate-pulse w-full sm:w-[50%]"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFormSkeleton;

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="overflow-hidden">
      <div className="Container space-y-8">
        {/* Navigation Skeleton */}
        <div className="hidden md:block">
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Breadcrumb Skeleton */}
        <Skeleton className="h-6 w-64" />

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-6">
            {/* Gallery Skeleton */}
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square w-20 rounded-md" />
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            {/* Product Details Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/* Related Products Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import type { PackageType } from "@/types/Packages";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import UpdatePackageDialog from "@/components/Organisms/Dialogs/UpdatePackageDialog";
import DeletePackageDialog from "@/components/Organisms/Dialogs/DeletePackageDialog";

interface Props {
  Package: PackageType;
}

const PackagesCard = ({ Package }: Props) => {
  const lang = useLocale() as LangType;

  if (!Package) {
    return (
      <Card className="h-full flex flex-col">
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Package data unavailable</p>
        </CardContent>
      </Card>
    );
  }

  const originalPrice = Number.parseFloat(Package.price);
  const discountPercent = Number.parseFloat(Package.discount_percentage);
  const discountedPrice = originalPrice * (1 - discountPercent / 100);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "active") return "bg-green-100 text-green-800";
    if (statusLower === "inactive") return "bg-gray-100 text-gray-800";
    if (statusLower === "expired") return "bg-red-100 text-red-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {Package.image && (
        <div className="relative w-full h-48 bg-muted overflow-hidden">
          <Image
            src={Package.image || "/placeholder.svg"}
            alt={Package.name}
            fill
            className="w-full h-full object-cover"
          />
          {discountPercent > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{discountPercent}%
            </div>
          )}
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground line-clamp-2">
              {Package.name}
            </h3>
          </div>
          <Badge
            className={`whitespace-nowrap ${getStatusColor(Package.status)}`}
          >
            {Package.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {Package.description}
        </p>

        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              ${discountedPrice.toFixed(2)}
            </span>
            {discountPercent > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <span className="font-medium">From:</span>{" "}
            {formatDate(Package.from_date)}
          </p>
          <p>
            <span className="font-medium">To:</span>{" "}
            {formatDate(Package.to_date)}
          </p>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <UpdatePackageDialog packageData={Package} lang={lang} />
        <DeletePackageDialog packageData={Package} lang={lang} />
      </CardFooter>
    </Card>
  );
};

export default PackagesCard;

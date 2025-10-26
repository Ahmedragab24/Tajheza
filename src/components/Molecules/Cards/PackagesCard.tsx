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
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import BookingDialog from "@/components/Organisms/Dialogs/BookingDialog";
import { useGetPackagesByIdQuery } from "@/store/services/Packages";
import RiyalIcon from "@/components/Atoms/Icons/RiyalIcon";

interface Props {
  Package: PackageType;
}

const PackagesCard = ({ Package }: Props) => {
  const lang = useLocale() as LangType;
  const { data } = useGetUserInfoQuery();
  const userInfo = data?.data?.user;
  const { data: PackageDetails } = useGetPackagesByIdQuery(Package.id);

  if (!Package) {
    return (
      <Card className="h-full flex flex-col">
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground text-center text-sm">
            {lang === "ar"
              ? "بيانات الحزمة غير متوفرة"
              : "Package data unavailable"}
          </p>
        </CardContent>
      </Card>
    );
  }

  const discountPercent = Number.parseFloat(Package.discount_percentage);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(
        lang === "ar" ? "ar-EG" : "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      );
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === "active") return "bg-green-100 text-green-800";
    if (s === "inactive") return "bg-gray-100 text-gray-800";
    if (s === "expired") return "bg-red-100 text-red-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-sm sm:max-w-md mx-auto bg-white !p-0 gap-2">
      {Package.image && (
        <div className="relative w-full h-48 sm:h-56 overflow-hidden">
          <Image
            src={Package.image || "/placeholder.svg"}
            alt={Package.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          {discountPercent > 0 && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-semibold shadow">
              {lang === "ar" ? "خصم" : "Discount"} {discountPercent}%
            </div>
          )}
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between flex-wrap gap-2">
          <h3 className="font-semibold text-lg sm:text-xl text-slate-800 line-clamp-2 leading-snug">
            {Package.name}
          </h3>
          <Badge
            className={`text-xs sm:text-sm font-medium ${getStatusColor(
              Package.status
            )}`}
          >
            {Package.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm sm:text-base text-slate-600 line-clamp-3 mb-3">
          {Package.description}
        </p>

        <div className="flex items-center gap-1 mb-3">
          <span className="text-2xl sm:text-3xl font-bold text-primary">
            {Package.price}
          </span>
          <RiyalIcon />
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <p>
            <span className="font-medium">
              {lang === "ar" ? "من:" : "From:"}
            </span>{" "}
            {formatDate(Package.from_date)}
          </p>
          <p>
            <span className="font-medium">
              {lang === "ar" ? "إلى:" : "To:"}
            </span>{" "}
            {formatDate(Package.to_date)}
          </p>
        </div>
      </CardContent>

      {/* الأزرار */}
      {userInfo?.type === "provider" ? (
        <CardFooter className="flex gap-2 px-4 pb-4 pt-2">
          <UpdatePackageDialog packageData={Package} lang={lang} />
          <DeletePackageDialog packageData={Package} lang={lang} />
        </CardFooter>
      ) : (
        <CardFooter className="flex justify-center px-4 pb-4 pt-2">
          <BookingDialog
            Package={PackageDetails?.data}
            count={1}
            isRtl={lang === "ar"}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default PackagesCard;

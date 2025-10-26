"use client";

import FavoriteBtn from "@/components/Atoms/buttons/FavoriteBtn";
import { LangType } from "@/types/globals";
import { ProductDetailsType } from "@/types/Products";
import { CalendarDays, Edit2, MapPin, Trash2 } from "lucide-react";
import React from "react";
import CompanyInfo from "./CompanyInfo";
import AuctionProduct from "./AuctionProduct";
import ShareButton from "@/components/Atoms/buttons/ShareBtn";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import UpdateProductDialog from "@/components/Organisms/Dialogs/UpdateProductDialog";
import { Button } from "@/components/ui/button";
import DeleteProductDialog from "@/components/Organisms/Dialogs/DeleteProductDialog";

interface Props {
  product: ProductDetailsType;
  lang: LangType;
}

const ProductDetails = ({ lang, product }: Props) => {
  const isRtl = lang === "ar";
  const { data } = useGetUserInfoQuery();
  const UserInfo = data?.data?.user;

  return (
    <div className="space-y-4">
      {/* Category & Title */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-gray-500 text-lg font-medium">
            {isRtl ? "قسم" : "Category"} ({product.service.name})
          </h2>
          <h1 className="text-xl font-semibold">{product.title}</h1>
        </div>

        {UserInfo?.type === "user" ? (
          <div className="flex items-center gap-2">
            <FavoriteBtn
              productId={product.id}
              variant={"secondary"}
              type="page"
            />
            <ShareButton productName={product.title} lang={lang} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <UpdateProductDialog lang={lang} product={product}>
              <Button
                variant={"secondary"}
                size="icon"
                className="rounded-full z-10 relative !w-8 !h-8 md:!w-10 md:!h-10"
              >
                <Edit2 className="!w-4 !h-4 md:!w-6 md:!h-6 text-primary" />
              </Button>
            </UpdateProductDialog>
            <DeleteProductDialog lang={lang} service={product}>
              <Button
                variant={"secondary"}
                size="icon"
                className="rounded-full z-10 relative !w-8 !h-8 md:!w-10 md:!h-10"
              >
                <Trash2 className="!w-4 !h-4 md:!w-6 md:!h-6 text-primary" />
              </Button>
            </DeleteProductDialog>
          </div>
        )}
      </div>

      {/* Location & Date */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <h4>{product.city}</h4>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <CalendarDays className="h-4 w-4 text-primary" />
          <h4>
            {isRtl ? "متاح الحجز من :" : "Booking is available from :"}{" "}
            {product.from_time}
          </h4>
        </div>
      </div>

      {/* Company Info */}
      <CompanyInfo
        companyInfo={product.company}
        lang={lang}
        product={product}
        userType={UserInfo?.type || "user"}
      />

      {/* Description */}
      <div className="space-y-4 border-b pb-4">
        <h2 className="text-xl font-semibold">
          {isRtl ? "التفاصيل" : "Details"}
        </h2>
        <p className="text-sm text-gray-500">{product.description}</p>
      </div>

      {/* Price & Counter & Booking */}
      <AuctionProduct
        product={product}
        lang={lang}
        userType={UserInfo?.type || "user"}
      />
    </div>
  );
};

export default ProductDetails;

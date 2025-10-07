import FavoriteBtn from "@/components/Atoms/buttons/FavoriteBtn";
import { LangType } from "@/types/globals";
import { ProductDetailsType } from "@/types/Products";
import { CalendarDays, MapPin } from "lucide-react";
import React from "react";
import CompanyInfo from "./CompanyInfo";
import AuctionProduct from "./AuctionProduct";
import ShareButton from "@/components/Atoms/buttons/ShareBtn";

interface Props {
  product: ProductDetailsType;
  lang: LangType;
}

const ProductDetails = ({ lang, product }: Props) => {
  const isRtl = lang === "ar";

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

        <div className="flex items-center gap-2">
          <FavoriteBtn
            productId={product.id}
            variant={"secondary"}
            type="page"
          />
          <ShareButton productName={product.title} lang={lang} />
        </div>
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
      <CompanyInfo companyInfo={product.company} lang={lang} />

      {/* Description */}
      <div className="space-y-4 border-b pb-4">
        <h2 className="text-xl font-semibold">
          {isRtl ? "التفاصيل" : "Details"}
        </h2>
        <p className="text-sm text-gray-500">{product.description}</p>
      </div>

      {/* Price & Counter & Booking */}
      <AuctionProduct product={product} lang={lang} />
    </div>
  );
};

export default ProductDetails;

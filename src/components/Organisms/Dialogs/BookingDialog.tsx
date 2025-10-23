"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import type { ProductDetailsType } from "@/types/Products";
import { useState } from "react";
import BookingForm from "../Forms/BookingForm";
import ProductSelectBookingCard from "@/components/Molecules/Cards/ProductSelectBookingCard";
import RegisterDialog from "./RegisterDialog";
import DiscountCodeInput from "@/components/Atoms/inputs/DiscountCodeInput";
import PricingCard from "@/components/Molecules/Cards/PricingCard";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PackageDetailsType } from "@/types/Packages";

interface Props {
  isRtl: boolean;
  product?: ProductDetailsType;
  Package?: PackageDetailsType;
  count: number;
}

const BookingDialog = ({ isRtl, product, count, Package }: Props) => {
  const isLogin = getAuthTokenClient();
  const [open, setOpen] = useState(false);

  const [pricing, setPricing] = useState({
    tax: 0,
    delivery_fee: 20,
    discount: 0,
    totalPrice: 0,
  });

  const [discountCode, setDiscountCode] = useState("");

  const handleDiscountApplied = (percentage: number) => {
    setPricing((prev) => ({
      ...prev,
      discount: percentage,
    }));
  };

  const companyId = product?.company?.company_id || Package?.company?.id || 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isLogin ? (
          <Button className="px-20 py-7 text-lg mx-auto">
            {isRtl ? "احجز الآن" : "Book now"}
          </Button>
        ) : (
          <RegisterDialog>
            <Button className="px-20 text-lg">
              {isRtl ? "احجز الآن" : "Book now"}
            </Button>
          </RegisterDialog>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogTitle />
        <div className="space-y-6">
          <ProductSelectBookingCard
            product={product}
            Package={Package}
            isRtl={isRtl}
            Pricing={pricing}
            setPricing={setPricing}
            count={count}
          />

          <DiscountCodeInput
            isRtl={isRtl}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            company_id={companyId}
            onDiscountApplied={handleDiscountApplied}
          />

          <PricingCard
            Pricing={pricing}
            productPrice={Number(product?.price)}
            packagePrice={Number(Package?.price)}
          />

          <BookingForm
            product={product}
            Package={Package}
            Pricing={pricing}
            setOpen={setOpen}
            quantity={count}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;

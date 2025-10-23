"use client";

import React, { useState } from "react";
import RiyalIcon from "@/components/Atoms/Icons/RiyalIcon";
import QuantityCounter from "./QuantityCounter";
import { LangType } from "@/types/globals";
import { ProductDetailsType } from "@/types/Products";
import AllocationSelect from "@/components/Molecules/Selects/AllocationSelect";
import BookingBtn from "@/components/Organisms/Dialogs/BookingDialog";

interface Props {
  lang: LangType;
  product: ProductDetailsType;
}

const AuctionProduct = ({ lang, product }: Props) => {
  const isRtl = lang === "ar";
  const [count, setCount] = useState<number>(1);
  const [SelectAllocation, setSelectAllocation] = useState<number>(0);

  console.log("product", product);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-start border-b pb-4">
      <div className="flex flex-col gap-6">
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-2">
            <h4 className="text-lg font-semibold">
              {isRtl ? "السعر" : "Price"}
            </h4>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-semibold text-primary">
                {product.price}
              </span>
              <RiyalIcon />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <h4 className="text-lg font-semibold">
              {isRtl ? "الكمية" : "Quantity"}
            </h4>
            <QuantityCounter count={count} setCount={setCount} />
          </div>
        </div>

        {product?.options && product?.options.length > 0 && (
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-semibold">
              {isRtl ? "تخصيصات" : "Allocations"}
            </h4>
            <AllocationSelect
              items={product?.options}
              lang={lang}
              SelectAllocation={SelectAllocation}
              setSelectAllocation={setSelectAllocation}
            />
          </div>
        )}
      </div>
      <BookingBtn isRtl={isRtl} product={product} count={count} />
    </div>
  );
};

export default AuctionProduct;

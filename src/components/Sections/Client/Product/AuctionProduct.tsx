"use client";

import React, { useState } from "react";
import RiyalIcon from "@/components/Atoms/Icons/RiyalIcon";
import QuantityCounter from "./QuantityCounter";
import { LangType } from "@/types/globals";
import { ProductDetailsType } from "@/types/Products";
import { Button } from "@/components/ui/button";
import AllocationSelect from "@/components/Molecules/Selects/AllocationSelect";

const ALLOCATION_OPTIONS = [
  { label: "دور واحد", value: "1_role", price: 9.99 },
  { label: "3 أدوار", value: "3_roles", price: 12.99 },
  { label: "4 أدوار", value: "4_roles", price: 16.99 },
];

interface Props {
  lang: LangType;
  product: ProductDetailsType;
}

const AuctionProduct = ({ lang, product }: Props) => {
  const isRtl = lang === "ar";
  const [count, setCount] = useState<number>(1);
  const [SelectAllocation, setSelectAllocation] = useState<string>(
    ALLOCATION_OPTIONS[0].value
  );

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

        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">
            {isRtl ? "تخصيصات" : "Allocations"}
          </h4>
          <AllocationSelect
            items={ALLOCATION_OPTIONS}
            lang={lang}
            SelectAllocation={SelectAllocation}
            setSelectAllocation={setSelectAllocation}
          />
        </div>
      </div>
      <Button className="px-20 text-lg">
        {isRtl ? "احجز الآن" : "Book now"}
      </Button>
    </div>
  );
};

export default AuctionProduct;

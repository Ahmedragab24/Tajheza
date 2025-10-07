import { LangType } from "@/types/globals";

import React from "react";
import RiyalIcon from "@/components/Atoms/Icons/RiyalIcon";

export interface OptionType {
  label: string;
  value: string;
  price: number;
}

interface Props {
  items: OptionType[];
  lang: LangType;
  SelectAllocation: string;
  setSelectAllocation: (value: string) => void;
}

const AllocationSelect = ({
  items,
  SelectAllocation,
  setSelectAllocation,
}: Props) => {
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <div className="flex gap-2 md:gap-4">
      {items.map((item) => {
        const isSelected = SelectAllocation === item.value;

        return (
          <div
            key={item.value}
            className={`
              flex flex-col items-center justify-center 
              p-4 w-24 h-24 md:w-32 md:h-32 rounded-xl cursor-pointer 
              shadow-md transition-all duration-200
              ${
                isSelected
                  ? "border-2 border-primary bg-primary/5 shadow-lg"
                  : "border border-secondary bg-white hover:border-gray-300 hover:bg-primary/5"
              }
            `}
            onClick={() => setSelectAllocation(item.value)}
            role="radio"
            aria-checked={isSelected}
            tabIndex={0}
          >
            <span
              className={`text-lg font-medium  ${
                isSelected ? "text-primary" : "text-gray-700"
              }`}
            >
              {item.label}
            </span>

            <div className="flex items-center gap-1 mt-1">
              <span
                className={`text-xl font-bold tabular-nums ${
                  isSelected ? "text-primary" : "text-gray-600"
                }`}
              >
                {formatPrice(item.price)}
              </span>
              <RiyalIcon />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllocationSelect;

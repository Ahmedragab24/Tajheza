"use client";

import { Slider } from "../../ui/slider";
import { Input } from "../../ui/input";
import { ProductFilteringType } from "@/app/[locale]/client/services/page";
import { Dispatch } from "react";
import { useLocale } from "next-intl";

interface Props {
  TabValue: ProductFilteringType;
  setTabValue: Dispatch<React.SetStateAction<ProductFilteringType>>;
}

const PriceRange = ({ TabValue, setTabValue }: Props) => {
  const lang = useLocale();
  const isRtl = lang === "ar";
  const maxPrice = 1000000;

  const convertSliderToPrice = (value: number) =>
    Math.round((value / 100) * maxPrice);

  const convertPriceToSlider = (price: number) =>
    Math.round((price / maxPrice) * 100);

  const formatPrice = (price: number) =>
    price.toLocaleString(lang === "ar" ? "en-US" : "en-US");

  const handleInputChange = (
    type: "min_price" | "max_price",
    value: string
  ) => {
    const num = Number.parseInt(value.replace(/[^0-9]/g, "")) || 0;
    setTabValue((prev) => ({
      ...prev,
      [type]: num,
    }));
  };

  return (
    <div
      className="w-full max-w-md mx-auto p-4"
      dir={isRtl ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      {/* Slider */}
      <div className="mb-6">
        <Slider
          dir={"ltr"}
          value={[
            convertPriceToSlider(TabValue.min_price),
            convertPriceToSlider(TabValue.max_price),
          ]}
          onValueChange={([min, max]) => {
            setTabValue((prev) => ({
              ...prev,
              min_price: convertSliderToPrice(min),
              max_price: convertSliderToPrice(max),
            }));
          }}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      {/* Inputs */}
      <div
        className={`flex items-center gap-4 ${
          isRtl ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Input
          type="text"
          value={formatPrice(TabValue.min_price)}
          onChange={(e) => handleInputChange("min_price", e.target.value)}
          className="flex-1 text-center text-gray-700 bg-gray-50 border border-gray-300 rounded-full px-4 py-2"
          placeholder={isRtl ? "ر.س الحد الأدنى" : "SAR Min"}
          dir={isRtl ? "rtl" : "ltr"}
        />

        <span className="text-gray-400 text-sm select-none">—</span>

        <Input
          type="text"
          value={formatPrice(TabValue.max_price)}
          onChange={(e) => handleInputChange("max_price", e.target.value)}
          className="flex-1 text-center text-gray-700 bg-gray-50 border border-gray-300 rounded-full px-4 py-2"
          placeholder={isRtl ? "ر.س الحد الأقصى" : "SAR Max"}
          dir={isRtl ? "rtl" : "ltr"}
        />
      </div>
    </div>
  );
};

export default PriceRange;

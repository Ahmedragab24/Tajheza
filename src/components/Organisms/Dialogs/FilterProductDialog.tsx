"use client";

import { ProductFilteringType } from "@/app/[locale]/client/services/page";
import { TagInput } from "@/components/Atoms/inputs/TagInput";
import PriceRange from "@/components/Molecules/Progress/PriceRange";
import SelectCity from "@/components/Molecules/Selects/SelectCity.tsx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LangType } from "@/types/globals";
import { SlidersHorizontal } from "lucide-react";
import { Dispatch, useState } from "react";

interface Props {
  TabValue: ProductFilteringType;
  setTabValue: Dispatch<React.SetStateAction<ProductFilteringType>>;
  lang: LangType;
}

const FilterProductDialog = ({ lang, TabValue, setTabValue }: Props) => {
  const [open, setOpen] = useState(false);

  const handleCityChange = (cityId: string) => {
    setTabValue((prev) => ({
      ...prev,
      city: cityId,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <SlidersHorizontal className="w-6 h-6 text-primary" />
        </button>
      </DialogTrigger>

      <DialogContent dir={lang === "ar" ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            {lang === "ar" ? "تصفية النتائج" : "Filter Products"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">
              {lang === "ar" ? "بحث بالأسم" : "Search by name"}
            </h3>
            <TagInput
              tags={TabValue.name || []}
              setTags={(newTags) =>
                setTabValue((prev) => ({
                  ...prev,
                  name: newTags,
                }))
              }
              placeholder={lang === "ar" ? "ادخل الكلمة" : "Enter the word"}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">
              {lang === "ar" ? "نطاق السعر" : "Price Range"}
            </h3>
            <PriceRange TabValue={TabValue} setTabValue={setTabValue} />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">
              {lang === "ar" ? "المدينة" : "City"}
            </h3>
            <SelectCity value={TabValue.city} onChange={handleCityChange} />
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-center">
          <DialogClose asChild>
            <Button variant="default">{lang === "ar" ? "تم" : "Done"}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterProductDialog;

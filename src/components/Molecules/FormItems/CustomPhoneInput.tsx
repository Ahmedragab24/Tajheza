"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import { FormControl, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { useLocale } from "next-intl";
import { arabCountries } from "@/constants/phoneCode";
import { LangType } from "@/types/globals";

interface PhoneValue {
  iso_code: string;
  number: string;
}

interface CustomPhoneInputProps {
  field: {
    value: PhoneValue;
    onChange: (value: PhoneValue) => void;
    onBlur: () => void;
    name?: string;
  };
  label: string;
  className?: string;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  field,
  label,
  className,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(arabCountries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const lang = useLocale() as LangType;

  const form = useFormContext();
  const fieldError = form?.formState?.errors?.[field.name || "phone"];

  const hasError = !!fieldError;

  // Sync field.value مع states الداخلية
  useEffect(() => {
    if (field.value) {
      setPhoneNumber(field.value.number || "");
      const country =
        arabCountries.find((c) => c.code === field.value.iso_code) ||
        arabCountries[0];
      setSelectedCountry(country);
    }
  }, [field.value]);

  const normalizeNumber = (code: string, number: string) => {
    // if (number.startsWith("0")) {
    //   return number.slice(1);
    // }
    return number;
  };

  const handleCountrySelect = (country: (typeof arabCountries)[0]) => {
    const normalized = normalizeNumber(country.code, phoneNumber);
    setSelectedCountry(country);
    field.onChange({
      iso_code: country.code,
      number: normalized,
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    const normalized = normalizeNumber(selectedCountry.code, value);
    setPhoneNumber(value);
    field.onChange({
      iso_code: selectedCountry.code,
      number: normalized,
    });
  };

  const getBorderStyling = () => {
    if (hasError) {
      return "border-[1px] border-red-500 ring-2 ring-red-500/20 shadow-sm shadow-red-500/10";
    }
    if (isFocused) {
      return "border-[1px] border-primary ring-2 ring-primary/20 shadow-sm shadow-primary/10";
    }
    return "border-[1px] border-gray-400 hover:border-primary/50";
  };

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div
          className={cn(
            "relative flex h-11 overflow-hidden rounded-lg border-2 bg-transparent transition-all duration-200",
            getBorderStyling()
          )}
          dir="ltr"
        >
          {/* Country Code Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "flex h-11 items-center rounded-none border-0 border-r-2 !px-2",
                  "focus:outline-none focus:ring-0"
                )}
              >
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium leading-none">
                    {selectedCountry.code}
                  </span>
                  <span className="text-[9px] text-muted-foreground leading-none">
                    {selectedCountry.country}
                  </span>
                </div>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={"start"}
              className="w-[220px] max-h-80 overflow-y-auto border-2 bg-background/95 backdrop-blur-sm shadow-xl"
            >
              <div className="p-2">
                <div className="mb-2 px-2 py-1 text-xs font-medium text-muted-foreground">
                  {lang === "ar" ? "اختر الدولة" : "Choose country"}
                </div>
                {arabCountries.map((country) => (
                  <DropdownMenuItem
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    className={cn(
                      "flex items-center gap-4 rounded-md p-3 cursor-pointer",
                      "hover:bg-primary/10 focus:bg-primary/10",
                      selectedCountry.code === country.code &&
                        "bg-primary/20 border border-primary/30"
                    )}
                  >
                    <Image
                      src={country.flagUrl}
                      alt={country.nameEn}
                      width={20}
                      height={20}
                    />
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-semibold leading-tight">
                        {country.country}
                      </span>
                      <span className="text-xs text-muted-foreground leading-tight">
                        {country.nameEn}
                      </span>
                    </div>
                    <span className="text-sm font-mono font-medium text-primary">
                      {country.code}
                    </span>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Phone Number Input */}
          <div className="relative flex-1">
            <Input
              type="tel"
              placeholder={
                lang === "ar" ? "أدخل رقم جوالك" : "Enter your phone"
              }
              value={phoneNumber}
              onChange={handlePhoneChange}
              onBlur={() => {
                field.onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              className={cn(
                "h-11 border-0 bg-transparent text-sm",
                "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
                `${
                  lang === "ar"
                    ? "text-right pr-10 pl-2"
                    : "text-left pl-2 pr-6"
                }`,
                hasError
                  ? "placeholder:text-red-400/60 text-foreground"
                  : "placeholder:text-gray-500"
              )}
              dir="ltr"
              maxLength={15}
            />
            <div className={cn("absolute top-1/2 -translate-y-1/2", "right-3")}>
              <Phone
                className={cn(
                  "fill-primary h-4.5 w-4.5",
                  hasError ? "text-red-500/70" : "text-primary"
                )}
              />
            </div>
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default CustomPhoneInput;

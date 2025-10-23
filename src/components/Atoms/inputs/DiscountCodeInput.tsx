"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCheckDiscountMutation } from "@/store/services/Orders";
import type { ErrorType } from "@/types/Errors";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  discountCode: string;
  setDiscountCode: (value: string) => void;
  isRtl: boolean;
  company_id: number;
  onDiscountApplied?: (discountPercentage: number) => void;
}

const DiscountCodeInput = ({
  isRtl,
  discountCode,
  setDiscountCode,
  company_id,
  onDiscountApplied,
}: Props) => {
  const [Check, { isLoading }] = useCheckDiscountMutation();
  const [isApplied, setIsApplied] = useState(false);

  const CheckDiscountCode = async () => {
    if (!discountCode.trim()) {
      toast.error(
        isRtl ? "يرجى إدخال كود الخصم" : "Please enter a discount code"
      );
      return;
    }

    try {
      const data = new FormData();
      data.append("code", discountCode);
      data.append("company_id", String(company_id));

      const response = await Check(data).unwrap();

      if (response?.data?.percentage) {
        setIsApplied(true);
        onDiscountApplied?.(response?.data?.percentage);
        toast.success(
          isRtl
            ? `تم تطبيق الخصم بنسبة ${response.data?.percentage}%`
            : `Discount of ${response.data?.percentage}% applied`
        );
      }
    } catch (error) {
      const err = error as ErrorType;
      toast.error(
        err?.data?.message ||
          (isRtl ? "كود الخصم غير صحيح" : "Invalid discount code")
      );
      setIsApplied(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      CheckDiscountCode();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {isRtl ? "أضف كود الخصم (إن وجد)" : "Add Discount Code (if available)"}
      </label>
      <div className="flex gap-2" dir={isRtl ? "rtl" : "ltr"}>
        <Input
          placeholder={
            isRtl ? "أدخل كود الخصم مثل 7890" : "Enter discount code like 7890"
          }
          value={discountCode}
          onChange={(e) => {
            setDiscountCode(e.target.value);
            setIsApplied(false);
          }}
          onKeyPress={handleKeyPress}
          disabled={isLoading || isApplied}
          className="flex-1"
        />
        <Button
          onClick={CheckDiscountCode}
          disabled={isLoading || isApplied || !discountCode.trim()}
          variant={isApplied ? "secondary" : "default"}
        >
          {isApplied
            ? isRtl
              ? "✓ تم التطبيق"
              : "✓ Applied"
            : isRtl
            ? "تحقق"
            : "Verify"}
        </Button>
      </div>
      {isApplied && (
        <p className="text-sm text-green-600">
          {isRtl ? "تم تطبيق الكود بنجاح" : "Code applied successfully"}
        </p>
      )}
    </div>
  );
};

export default DiscountCodeInput;

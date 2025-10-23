"use client";

import { useState, useCallback } from "react";

interface PricingState {
  tax: number;
  delivery_fee: number;
  discount: number;
  totalPrice: number;
}

export const usePricingCalculator = (initialPricing: PricingState) => {
  const [pricing, setPricing] = useState<PricingState>(initialPricing);

  const calculateTotal = useCallback(
    (productPrice: number): number => {
      const subtotal = productPrice + pricing.delivery_fee;
      const discountAmount = (subtotal * pricing.discount) / 100;
      return subtotal + pricing.tax - discountAmount;
    },
    [pricing.delivery_fee, pricing.tax, pricing.discount]
  );

  const applyDiscount = useCallback((discountPercentage: number) => {
    setPricing((prev) => ({
      ...prev,
      discount: discountPercentage,
    }));
  }, []);

  const updateDeliveryFee = useCallback((fee: number) => {
    setPricing((prev) => ({
      ...prev,
      delivery_fee: fee,
    }));
  }, []);

  const updateTax = useCallback((tax: number) => {
    setPricing((prev) => ({
      ...prev,
      tax,
    }));
  }, []);

  const resetPricing = useCallback(() => {
    setPricing(initialPricing);
  }, [initialPricing]);

  return {
    pricing,
    setPricing,
    calculateTotal,
    applyDiscount,
    updateDeliveryFee,
    updateTax,
    resetPricing,
  };
};

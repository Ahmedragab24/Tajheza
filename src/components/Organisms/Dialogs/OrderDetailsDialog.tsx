"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LangType } from "@/types/globals";
import React, { useState } from "react";
import { useGetProviderOrderByIdQuery } from "@/store/services/Provider/ProviderOrders";
import OrderDetailsSection from "@/components/Sections/Provider/Orders/OrderDetailsSection";

interface Props {
  orderId: number;
  lang: LangType;
  children: React.ReactNode;
}

const OrderDetailsDialog = ({ lang, orderId, children }: Props) => {
  const [open, setOpen] = useState(false);
  const { data } = useGetProviderOrderByIdQuery(orderId);
  const Order = data?.data;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="!max-w-lg max-h-[90vh] flex flex-col p-0"
      >
        <div className="flex-1 overflow-y-auto px-6 pt-8 pb-16">
          <OrderDetailsSection orderId={orderId} order={Order} lang={lang} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;

"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LangType } from "@/types/globals";
import { OrderType } from "@/types/Orders";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import Image from "next/image";
import { Trash2, Edit } from "lucide-react";

interface Props {
  order: OrderType;
  lang: LangType;
}

const OrderCard = ({ lang, order }: Props) => {
  const locale = lang === "ar" ? ar : enUS;

  const formattedDate = format(new Date(order.created_at), "PPP p", {
    locale,
  });

  const handleEdit = () => {
    console.log("Edit order:", order.id);
    // هنا تضيف logic التعديل مثل فتح مودال لتعديل الحالة أو العنوان
  };

  const handleDelete = () => {
    console.log("Delete order:", order.id);
    // هنا تنادي API لحذف الطلب
  };

  return (
    <Card className="p-4 rounded-xl shadow-md border hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="font-semibold text-sm text-gray-500">
            {lang === "ar" ? "رقم الطلب:" : "Order Code:"} {order.order_code}
          </p>
          <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full capitalize ${
            order.status === "accepted"
              ? "bg-green-100 text-green-700"
              : order.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {lang === "ar"
            ? order.status === "accepted"
              ? "مكتمل"
              : order.status === "pending"
              ? "قيد التنفيذ"
              : "ملغي"
            : order.status}
        </span>
      </div>

      <div className="space-y-3">
        {order.items.slice(0, 2).map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 border-b pb-2 last:border-none"
          >
            <div className="relative w-12 h-12 rounded-md overflow-hidden">
              <Image
                src={item.image || "/Images/no-image.png"}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-xs text-gray-500">
                {lang === "ar" ? "الكمية:" : "Qty:"} {item.quantity} ×{" "}
                {item.unit_price} ={" "}
                <span className="font-semibold">{item.total_price}</span>
              </p>
            </div>
          </div>
        ))}

        {order.items.length > 2 && (
          <p className="text-xs text-gray-400 italic">
            + {order.items.length - 2}{" "}
            {lang === "ar" ? "منتجات إضافية" : "more items"}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mt-3 border-t pt-3">
        <div>
          <p className="font-semibold text-sm">
            {lang === "ar" ? "الإجمالي:" : "Total:"} {order.total} ر.س
          </p>
          <p className="text-xs text-gray-500">
            {lang === "ar"
              ? `طريقة الدفع: ${order.payment_method}`
              : `Payment: ${order.payment_method}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleEdit}
            title={lang === "ar" ? "تعديل الطلب" : "Edit Order"}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleDelete}
            title={lang === "ar" ? "حذف الطلب" : "Delete Order"}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;

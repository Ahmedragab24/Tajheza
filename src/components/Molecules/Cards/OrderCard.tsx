"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { LangType } from "@/types/globals";
import { OrderType, CreateOrderType } from "@/types/Orders";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import Image from "next/image";
import { Trash2, Edit, Loader2 } from "lucide-react";
import {
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "@/store/services/Orders";
import SelectPaymentMethod from "../Selects/SelectPymentmethod";
import { toast } from "sonner";
import { ErrorType } from "@/types/Errors";

interface Props {
  order: OrderType;
  lang: LangType;
}

const OrderCard = ({ lang, order }: Props) => {
  const locale = lang === "ar" ? ar : enUS;
  const formattedDate = format(new Date(order.created_at), "PPP p", { locale });

  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState<CreateOrderType>({
    name: order.name,
    phone: order.phone,
    address: order.address,
    latitude: order.latitude,
    longitude: order.longitude,
    payment_method: order.payment_method,
    delivery_fee: order.delivery_fee,
    discount: order.discount,
    tax: order.tax,
    items: order.items.map((item) => ({
      company_product_id: item.company_product_id ?? undefined,
      package_id: item.package_id ?? undefined,
      quantity: item.quantity,
      unit_price: item.unit_price,
    })),
  });

  // Mutations
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const handleEditSubmit = async () => {
    try {
      await updateOrder({ body: formData, OrderId: order.id }).unwrap();
      toast.success(
        lang === "ar"
          ? "تم تعديل طلبك بنجاح"
          : "Your request has been modified successfully."
      );
      setEditDialogOpen(false);
    } catch (err) {
      const error = err as ErrorType;
      toast.error(error?.data?.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteOrder(order.id).unwrap();
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  return (
    <>
      {/* Order Card */}
      <Card className="p-4 rounded-xl shadow-md border hover:shadow-lg transition-all">
        <div className="flex justify-between items-center">
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
              <div className="relative w-32 h-24 rounded-md overflow-hidden">
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

        <div className="flex justify-between items-center border-t pt-3">
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
              onClick={() => setEditDialogOpen(true)}
              title={lang === "ar" ? "تعديل الطلب" : "Edit Order"}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setDeleteDialogOpen(true)}
              title={lang === "ar" ? "حذف الطلب" : "Delete Order"}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {lang === "ar" ? "تعديل الطلب" : "Edit Order"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-3 py-2">
            <div className="space-y-2">
              <Label>{lang === "ar" ? "الاسم" : "Name"}</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>{lang === "ar" ? "رقم الهاتف" : "Phone"}</Label>
              <Input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>{lang === "ar" ? "العنوان" : "Address"}</Label>
              <Input
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <SelectPaymentMethod
                field={{
                  value: formData.payment_method,
                  onChange: (value) =>
                    setFormData({ ...formData, payment_method: value }),
                  onBlur: () => {},
                  name: "payment_method",
                  ref: () => {},
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleEditSubmit} disabled={isUpdating}>
              {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {lang === "ar" ? "حفظ التغييرات" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {lang === "ar"
                ? "هل أنت متأكد من حذف الطلب؟"
                : "Are you sure you want to delete this order?"}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {lang === "ar" ? "تأكيد الحذف" : "Confirm Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrderCard;

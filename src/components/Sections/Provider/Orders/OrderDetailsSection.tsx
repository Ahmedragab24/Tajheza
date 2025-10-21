import type { LangType } from "@/types/globals";
import type { ProviderOrderDetailsType } from "@/types/ProviderOrders";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import RiyalIcon from "@/components/Atoms/Icons/RiyalIcon";
import LocationMapDialog from "@/components/Organisms/Dialogs/LocationMapDialog";
import { DialogFooter } from "@/components/ui/dialog";
import ActionProviderOrderBtns from "@/components/Molecules/BtnsGroup/ActionProviderOrderBtns";

interface Props {
  orderId: number;
  order: ProviderOrderDetailsType | undefined;
  lang: LangType;
}

const OrderDetailsSection = ({ lang, orderId, order }: Props) => {
  if (!order) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">
          {lang === "ar" ? "جاري التحميل..." : "Loading..."}
        </p>
      </div>
    );
  }

  const isArabic = lang === "ar";

  const statusColors: Record<string, string> = {
    accepted: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    decline: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, Record<LangType, string>> = {
    accepted: { ar: "مقبول", en: "Accepted" },
    pending: { ar: "قيد المراجعة", en: "Pending" },
    decline: { ar: "مرفوض", en: "Declined" },
  };

  const currentStatus =
    statusLabels[order.status]?.[lang] ?? (isArabic ? "غير معروف" : "Unknown");

  const currentColor =
    statusColors[order.status] ?? "bg-gray-100 text-gray-800";

  return (
    <div
      className={`relative space-y-6 ${isArabic ? "text-right" : "text-left"}`}
    >
      {/* Header with Status */}
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-2xl font-bold mb-2">
          {isArabic ? "تفاصيل الطلب" : "Order Details"}
        </h2>
        <Badge className={currentColor}>{currentStatus}</Badge>
      </div>

      {/* Order Items */}
      <Card className="p-4">
        <h3 className="font-semibold">{isArabic ? "الطلب" : "Order"}</h3>

        <div className="space-y-4">
          {order.items?.length ? (
            order.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-gray-600">
                    {isArabic ? "الكمية" : "Quantity"}: {item.quantity}
                  </p>

                  <div className="flex items-center gap-1">
                    <p className="font-medium text-primary">
                      {isArabic ? "السعر" : "Price"}: {item.price}
                    </p>
                    <RiyalIcon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <Badge className="font-semibold">{item.type}</Badge>
                  <div className="flex flex-col items-center gap-1">
                    <p className="font-medium">
                      {isArabic ? "السعر الإجمالي" : "Total price"}
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="text-primary font-semibold text-lg">
                        {item.total_price}
                      </p>
                      <RiyalIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">
              {isArabic ? "لا توجد عناصر في الطلب" : "No items found"}
            </p>
          )}
        </div>
      </Card>

      {/* Customer Information */}
      <Card className="p-4">
        <h3 className="font-semibold">
          {isArabic ? "معلومات العميل" : "Customer Information"}
        </h3>
        <div className="space-y-3">
          {order.user ? (
            <div className="flex items-center gap-3">
              <Image
                src={order.user.image || "/placeholder.svg"}
                alt={order.user.name || "user"}
                width={200}
                height={200}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{order.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {order.user.phone}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">
              {isArabic
                ? "معلومات العميل غير متوفرة"
                : "User info not available"}
            </p>
          )}
        </div>
      </Card>

      {/* Order Information */}
      <Card className="p-4">
        <h3 className="font-semibold">
          {isArabic ? "معلومات الطلب" : "Order Information"}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {isArabic ? "رقم الطلب" : "Order Code"}
            </span>
            <span className="font-medium">{order.order_code || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {isArabic ? "التاريخ" : "Date"}
            </span>
            <span className="font-medium">{order.date || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {isArabic ? "نوع الطلب" : "Order Type"}
            </span>
            <span className="font-medium">{order.type || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {isArabic ? "طريقة الدفع" : "Payment Method"}
            </span>
            <span className="font-medium">{order.payment_method || "-"}</span>
          </div>
        </div>
      </Card>

      {/* Location & Delivery */}
      <Card className="p-4">
        <div className="flex justify-between">
          <h3 className="font-semibold">
            {isArabic ? "الموقع والتوصيل" : "Location & Delivery"}
          </h3>

          <LocationMapDialog order={order} lang={lang} />
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">
              {isArabic ? "العنوان" : "Address"}
            </p>
            <p className="font-medium">{order.location?.address || "-"}</p>
          </div>
          {order.delivery_time && (
            <div>
              <p className="text-muted-foreground mb-1">
                {isArabic ? "وقت التوصيل" : "Delivery Time"}
              </p>
              <p className="font-medium">{order.delivery_time}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Pricing Summary */}
      <Card className="p-4 bg-muted/50">
        <h3 className="font-semibold">
          {isArabic ? "تفاصيل الطلب" : "Order Summary"}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{isArabic ? "المجموع الفرعي" : "Subtotal"}</span>
            <span>{order.subtotal}</span>
          </div>
          {order.discount && order.discount !== "0.00" && (
            <div className="flex justify-between text-green-600">
              <span>{isArabic ? "الخصم" : "Discount"}</span>
              <span>-{order.discount}</span>
            </div>
          )}
          {order.tax && order.tax !== "0" && (
            <div className="flex justify-between">
              <span>{isArabic ? "الضريبة" : "Tax"}</span>
              <span>{order.tax}</span>
            </div>
          )}
          {order.delivery_price && order.delivery_price !== "0" && (
            <div className="flex justify-between">
              <span>{isArabic ? "سعر التوصيل" : "Delivery"}</span>
              <span>{order.delivery_price}</span>
            </div>
          )}
          <div className="border-t pt-2 mt-2 flex justify-between text-base font-bold">
            <span>{isArabic ? "المجموع الكلي" : "Total"}</span>
            <div className="flex items-center gap-1">
              <span className="text-primary">{order.total_price}</span>
              <RiyalIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Card>

      {/* Card Number (if available) */}
      {order.card_number && (
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">
            {isArabic ? "رقم البطاقة" : "Card Number"}
          </p>
          <p className="font-mono font-semibold">
            {"*".repeat(12)}
            {String(order.card_number).slice(-4)}
          </p>
        </Card>
      )}

      {order.status !== "accepted" && (
        <DialogFooter className="w-full fixed bottom-0 left-0 bg-background border-t p-4 mt-auto flex justify-end">
          <ActionProviderOrderBtns orderId={orderId} lang={lang} />
        </DialogFooter>
      )}
    </div>
  );
};

export default OrderDetailsSection;

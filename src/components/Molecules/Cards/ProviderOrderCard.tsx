import OrderDetailsDialog from "@/components/Organisms/Dialogs/OrderDetailsDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LangType } from "@/types/globals";
import { ProviderOrderType } from "@/types/ProviderOrders";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";

interface OrderCardProps {
  order: ProviderOrderType;
  lang: LangType;
}

const getStatusColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case "service":
    case "خدمة":
      return "bg-amber-900 text-white";
    case "package":
    case "باقة":
      return "bg-amber-800 text-white";
    default:
      return "bg-gray-700 text-white";
  }
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const ProviderOrderCard: React.FC<OrderCardProps> = ({ order, lang }) => {
  const isHighlighted = order.type === "service" || order.type === "خدمة";

  return (
    <OrderDetailsDialog orderId={order.id} lang={lang}>
      <div
        className={`flex items-center justify-between gap-4 p-6 rounded-lg transition-colors ${
          isHighlighted ? "bg-secondary/40" : "bg-secondary/20"
        } border border-gray-200 hover:shadow-md group cursor-pointer duration-300`}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="flex items-center gap-4">
          <Avatar className=" h-12 w-12">
            <AvatarImage
              src={order.user.image || "/placeholder.svg"}
              alt={order.user.name}
            />
            <AvatarFallback className="bg-gray-300 text-gray-700 font-semibold">
              {getInitials(order.user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-right">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{order.user.name}</h3>
              <span className="text-sm text-gray-500">
                ({order.order_code})
              </span>
            </div>
            <p className="text-base text-gray-600">{order.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
              order.type
            )}`}
          >
            {order.type}
          </div>

          <button className="flex-shrink-0 text-gray-400 group-hover:text-gray-600  group-hover:-translate-x-1.5  transition-colors">
            {lang === "ar" ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>
      </div>
    </OrderDetailsDialog>
  );
};

export default ProviderOrderCard;

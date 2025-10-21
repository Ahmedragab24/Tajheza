import { Button } from "@/components/ui/button";
import { useOrderByActionMutation } from "@/store/services/Provider/ProviderOrders";
import { ErrorType } from "@/types/Errors";
import { LangType } from "@/types/globals";
import { Loader } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Props {
  orderId: number;
  lang: LangType;
}

const ActionProviderOrderBtns = ({ lang, orderId }: Props) => {
  const [Action, { isLoading }] = useOrderByActionMutation();

  const Accept = () => {
    try {
      Action({
        action: "accept",
        orderId: orderId,
      }).unwrap();
      toast.success(
        lang === "ar" ? "تم قبول الطلب" : "The Order has been accepted."
      );
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err.data.message);
    }
  };

  const Reject = () => {
    try {
      Action({
        action: "decline",
        orderId: orderId,
      }).unwrap();
      toast.success(lang === "ar" ? "تم رفض الطلب" : "The Order was rejected.");
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err.data.message);
    }
  };

  return (
    <div className="flex justify-end items-center gap-4">
      <Button className="px-10" onClick={Accept}>
        {isLoading ? (
          <div className={`flex items-center gap-2`}>
            <p className="text-xs">
              {lang === "en" ? "...Loading" : "جاري التحميل..."}
            </p>

            <Loader className={`w-4 h-4 animate-spin text-white`} />
          </div>
        ) : lang === "ar" ? (
          "قبول"
        ) : (
          "Acceptance"
        )}
      </Button>

      <Button variant="outline" onClick={Reject}>
        {isLoading ? (
          <div className={`flex items-center gap-2`}>
            <p className="text-xs">
              {lang === "en" ? "...Loading" : "جاري التحميل..."}
            </p>

            <Loader className={`w-4 h-4 animate-spin text-primary`} />
          </div>
        ) : lang === "ar" ? (
          "رفض"
        ) : (
          "Reject"
        )}
      </Button>
    </div>
  );
};

export default ActionProviderOrderBtns;

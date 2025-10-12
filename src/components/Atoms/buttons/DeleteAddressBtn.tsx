"use client";

import { LangType } from "@/types/globals";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteAddressMutation } from "@/store/services/Address";
import { toast } from "sonner";
import { ErrorType } from "@/types/Errors";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  lang: LangType;
  addressId: number;
}

const DeleteAddressBtn = ({ addressId, lang }: Props) => {
  const [Delete, { isLoading }] = useDeleteAddressMutation();
  const [open, setOpen] = useState(false);

  const DeleteAddress = async () => {
    try {
      await Delete(addressId).unwrap();
      toast.success(
        lang === "ar" ? "تم حذف العنوان بنجاح" : "Address deleted successfully"
      );
    } catch (error) {
      const err = error as ErrorType;
      toast.error(
        err?.data?.message ||
          (lang === "ar" ? "حدث خطأ أثناء الحذف" : "Error deleting address")
      );
    } finally {
      setOpen(false);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={isLoading}
                className="text-destructive hover:text-destructive/80"
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
          </AlertDialogTrigger>

          <AlertDialogContent dir={lang === "ar" ? "rtl" : "ltr"}>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {lang === "ar" ? "تأكيد الحذف" : "Confirm Deletion"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {lang === "ar"
                  ? "هل أنت متأكد أنك تريد حذف هذا العنوان؟ لا يمكن التراجع عن هذا الإجراء."
                  : "Are you sure you want to delete this address? This action cannot be undone."}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoading}>
                {lang === "ar" ? "إلغاء" : "Cancel"}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={DeleteAddress}
                disabled={isLoading}
                className="bg-destructive text-white hover:bg-destructive/90"
              >
                {isLoading
                  ? lang === "ar"
                    ? "جارٍ الحذف..."
                    : "Deleting..."
                  : lang === "ar"
                  ? "حذف"
                  : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <TooltipContent className="dark px-2 py-1 text-xs">
          {lang === "ar" ? "حذف" : "Delete"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DeleteAddressBtn;

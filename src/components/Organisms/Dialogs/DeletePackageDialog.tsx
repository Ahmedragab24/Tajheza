"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { LangType } from "@/types/globals";
import { useState } from "react";
import { PackageType } from "@/types/Packages";
import { useDeletePackageMutation } from "@/store/services/Provider/Packages";
import { ErrorType } from "@/types/Errors";
import { toast } from "sonner";

interface Props {
  packageData: PackageType;
  lang: LangType;
}

const DeletePackageDialog = ({ packageData, lang }: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [Delete, { isLoading }] = useDeletePackageMutation();

  const HandlerDeletePackage = async () => {
    try {
      await Delete(packageData.id).unwrap();
      toast.success(
        lang === "ar" ? "تم حذف الباقة بنجاح" : "Package deleted successfully"
      );
      setOpen(false);
      setConfirmOpen(false);
    } catch (error) {
      const err = error as ErrorType;
      toast.error(
        err?.data?.message ||
          (lang === "ar"
            ? "حدث خطأ أثناء الحذف"
            : "An error occurred while deleting")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="flex-1">
          <Trash2 className="w-4 h-4 mr-1" />
          {lang === "ar" ? "حذف" : "Delete"}
        </Button>
      </DialogTrigger>
      <DialogContent
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="!max-w-md text-center"
      >
        <h2 className="text-xl font-semibold mb-4">
          {lang === "ar"
            ? "هل أنت متأكد أنك تريد حذف هذه الباقة؟"
            : "Are you sure you want to delete this package?"}
        </h2>

        <p className="text-muted-foreground mb-6">
          {lang === "ar"
            ? "لن تتمكن من استعادة هذه الباقة بعد الحذف."
            : "This action cannot be undone."}
        </p>

        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            {lang === "ar" ? "إلغاء" : "Cancel"}
          </Button>

          <Button
            variant="destructive"
            onClick={HandlerDeletePackage}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-background border-t-foreground rounded-full animate-spin" />
            )}
            {lang === "ar" ? "تأكيد الحذف" : "Confirm delete"}
          </Button>
        </div>
      </DialogContent>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent dir={lang === "ar" ? "rtl" : "ltr"}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {lang === "ar" ? "تأكيد الحذف" : "Delete confirmation"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {lang === "ar"
                ? "هل أنت متأكد أنك تريد حذف هذه الباقة؟ لا يمكن التراجع بعد تنفيذ العملية."
                : "Are you sure you want to delete this package? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={HandlerDeletePackage}
              disabled={isLoading}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-background border-t-foreground rounded-full animate-spin" />
                  {lang === "ar" ? "جارٍ الحذف..." : "Deleting..."}
                </div>
              ) : lang === "ar" ? (
                "تأكيد الحذف"
              ) : (
                "Confirm Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};

export default DeletePackageDialog;

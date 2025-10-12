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
import { LangType } from "@/types/globals";

interface Props {
  children: React.ReactNode;
  AlertTitle: string;
  AlertDescription: string;
  lang: LangType;
  onDelete: () => void;
  loading: boolean;
  type: "delete" | "be sure";
}

const DeleteAlert = ({
  children,
  AlertTitle,
  AlertDescription,
  lang,
  onDelete,
  loading,
  type,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="!flex flex-col gap-4 justify-center text-center">
        <AlertDialogHeader className="flex flex-col justify-center items-center gap-2">
          <AlertDialogTitle>{AlertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{AlertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {lang === "ar" ? "إلغاء" : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} disabled={loading}>
            {type === "delete"
              ? loading
                ? lang === "ar"
                  ? "جاري الحذف..."
                  : "Deleting..."
                : lang === "ar"
                ? "حذف"
                : "Delete"
              : loading
              ? lang === "ar"
                ? "جاري التحميل..."
                : "Log out..."
              : lang === "ar"
              ? "خروج"
              : "Log out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;

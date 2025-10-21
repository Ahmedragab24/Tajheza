"use client";

import { Button } from "@/components/ui/button";
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
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { ErrorType } from "@/types/Errors";
import { useDeleteAccountMutation } from "@/store/services/Auth/Auth";
import {
  getAuthTokenClient,
  removeAuthTokenClient,
} from "@/lib/auth/auth-client";
import CustomPhoneInput from "@/components/Molecules/FormItems/CustomPhoneInput";
import { Form, FormField } from "@/components/ui/form";
import CustomFormItem from "@/components/Molecules/FormItems/CustomFromItem";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { loginFormSchema } from "@/schemas/loginFormSchema";

const DeleteAccountPage = () => {
  const t = useTranslations("DeleteAccount");
  const token = getAuthTokenClient();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone: {
        iso_code: "",
        number: "",
      },
      password: "",
    },
  });

  const handleDeleteAccount = async (
    values?: z.infer<typeof loginFormSchema>
  ) => {
    if (!values) return;

    const data = new FormData();
    data.append("phone", values.phone.iso_code + values.phone.number);
    data.append("password", values.password);

    try {
      const res = await deleteAccount({
        body: data,
        token,
      }).unwrap();

      removeAuthTokenClient();
      toast.success(res?.message || t("successMessage"));

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err?.data?.message || t("errorMessage"));
    }
  };

  return (
    <div className="Container h-[80vh] flex justify-center items-center space-y-4">
      <div className="flex md:w-2xl flex-col gap-4 items-center text-center justify-center rounded-lg border p-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl text-primary font-semibold">{t("title")}</h1>
          <p className="text-sm text-gray-500 max-w-md text-center">
            {t("description")}
          </p>
        </div>

        <Form {...form}>
          <div className="w-full bg-muted px-2 py-4 md:p-6 rounded-xl shadow-md">
            <form
              onSubmit={form.handleSubmit(handleDeleteAccount)}
              className="space-y-4 md:space-y-6"
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <CustomPhoneInput field={field} label={t("phoneLabel")} />
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <CustomFormItem
                    field={field}
                    label={t("passwordLabel")}
                    placeholder={t("passwordPlaceholder")}
                    type="password"
                  />
                )}
              />
            </form>
          </div>
        </Form>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full md:w-[30%] h-12 mt-4"
              size="sm"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t("deleteButton")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-destructive">
                {t("confirmTitle")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p className="font-medium">{t("confirmDescription")}</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteAccount(form.getValues())}
                disabled={isLoading}
                className="bg-destructive hover:bg-destructive/90 rounded-md"
              >
                {isLoading ? t("loading") : t("confirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default DeleteAccountPage;

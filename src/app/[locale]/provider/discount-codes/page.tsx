"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlusIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import {
  useCreateDiscountCodeMutation,
  useDeleteDiscountCodeMutation,
  useGetAllCodesDiscountQuery,
} from "@/store/services/Provider/DiscountCodes";
import { toast } from "sonner";
import { ErrorType } from "@/types/Errors";

const DiscountCodesPage = () => {
  const lang = useLocale();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    percentage: "",
    start_date: "",
    end_date: "",
  });

  const { data, isLoading, isError } = useGetAllCodesDiscountQuery();
  const [createDiscountCode, { isLoading: isCreating }] =
    useCreateDiscountCodeMutation();
  const [deleteDiscountCode, { isLoading: isDeleting }] =
    useDeleteDiscountCodeMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDiscountCode({
        percentage: Number(formData.percentage),
        start_date: formData.start_date,
        end_date: formData.end_date,
      }).unwrap();

      toast.success(
        lang === "ar" ? "تمت إضافة الكود بنجاح" : "Code added successfully"
      );
      setFormData({ percentage: "", start_date: "", end_date: "" });
      setOpen(false);
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err?.data?.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        lang === "ar"
          ? "هل أنت متأكد من حذف الكود؟"
          : "Are you sure you want to delete this code?"
      )
    )
      return;
    try {
      await deleteDiscountCode(id).unwrap();
      toast.success(lang === "ar" ? "تم حذف الكود" : "Code deleted");
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="Container min-h-[80vh] mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {lang === "ar" ? "أكواد الخصم" : "Discount Codes"}
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon size={18} /> {lang === "ar" ? "إضافة كود" : "Add Code"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {lang === "ar" ? "إضافة كود خصم جديد" : "Add New Discount Code"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreate} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {lang === "ar" ? "نسبة الخصم (%)" : "Discount Percentage"}
                </label>
                <Input
                  name="percentage"
                  type="number"
                  required
                  value={formData.percentage}
                  onChange={handleChange}
                  placeholder="مثلاً: 10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {lang === "ar" ? "تاريخ البداية" : "Start Date"}
                </label>
                <Input
                  name="start_date"
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {lang === "ar" ? "تاريخ الانتهاء" : "End Date"}
                </label>
                <Input
                  name="end_date"
                  type="date"
                  required
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {lang === "ar" ? "حفظ" : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* الحالات */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 py-10">
          {lang === "ar"
            ? "حدث خطأ أثناء تحميل البيانات"
            : "Error loading data"}
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          {lang === "ar"
            ? "لا توجد أكواد خصم حالياً"
            : "No discount codes available"}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.data.map((code) => (
            <Card
              key={code.id}
              className="border shadow-sm hover:shadow-md transition-all duration-200"
            >
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  {code.code || `#${code.id}`}

                  <span
                    className={`px-3 mx-2 py-1 rounded-full text-xs ${
                      code.is_active
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {code.is_active
                      ? lang === "ar"
                        ? "نشط"
                        : "Active"
                      : lang === "ar"
                      ? "غير نشط"
                      : "Inactive"}
                  </span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(code.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>
                  {lang === "ar" ? "نسبة الخصم:" : "Discount:"}{" "}
                  <span className="font-medium text-primary">
                    {code.percentage}%
                  </span>
                </p>
                <p>
                  {lang === "ar" ? "تاريخ البداية:" : "Start:"}{" "}
                  {format(new Date(code.start_date), "yyyy-MM-dd")}
                </p>
                <p>
                  {lang === "ar" ? "تاريخ الانتهاء:" : "End:"}{" "}
                  {format(new Date(code.end_date), "yyyy-MM-dd")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscountCodesPage;

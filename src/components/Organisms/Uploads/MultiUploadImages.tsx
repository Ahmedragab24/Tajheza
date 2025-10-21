/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LangType } from "@/types/globals";

interface Props {
  field: any;
  lang: LangType;
  title?: string;
}

const translations = {
  en: {
    dropHere: "Drop your images here",
    allowedTypes: "SVG, PNG, JPG or GIF (max.",
    uploaded: "Uploaded Files",
    addMore: "Add more",
    selectImages: "Select images",
  },
  ar: {
    dropHere: "أضف المزيد من الصور هنا",
    allowedTypes: "SVG، PNG، JPG أو GIF (الحد الأقصى",
    uploaded: "الصور المرفوعة",
    addMore: "إضافة المزيد",
    selectImages: "اختر الصور",
  },
};

export default function MultiUploadImages({ field, lang }: Props) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;
  const maxFiles = 10;
  const t = translations[lang];

  // ✅ الصور القديمة القادمة من الـ product
  const [existingImages, setExistingImages] = useState<string[]>(
    Array.isArray(field.value)
      ? field.value.filter((v: unknown) => typeof v === "string")
      : []
  );

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
    multiple: true,
    maxFiles,
  });

  // ✅ تحديث القيمة في react-hook-form
  useEffect(() => {
    const newFiles = files.map((f: any) => f.file);
    field.onChange([...existingImages, ...newFiles]);
  }, [files, existingImages, field]);

  const handleRemoveExisting = (url: string) => {
    const updated = existingImages.filter((img) => img !== url);
    setExistingImages(updated);
    field.onChange([...updated, ...files.map((f: any) => f.file)]);
  };

  const handleRemoveNew = (id: string) => {
    removeFile(id);
    field.onChange([...existingImages, ...files.map((f: any) => f.file)]);
  };

  const allImagesCount = existingImages.length + files.length;

  return (
    <div className="flex flex-col gap-2">
      <p aria-live="polite" role="region" className="text-sm font-medium">
        {allImagesCount > 0
          ? lang === "ar"
            ? `تم اختيار ${allImagesCount} صورة`
            : `${allImagesCount} image(s) selected`
          : t.dropHere}
      </p>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="border-gray-500 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border-2 border-dashed p-4 transition-colors justify-center has-[input:focus]:ring-[3px] hover:border-primary bg-white hover:bg-transparent"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label={t.selectImages}
        />

        {allImagesCount > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-medium">
                {t.uploaded} ({allImagesCount})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                disabled={allImagesCount >= maxFiles}
              >
                <UploadIcon className="-ms-0.5 size-3.5 opacity-60" />
                {t.addMore}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {existingImages.map((url) => (
                <div
                  key={url}
                  className="bg-accent relative aspect-square rounded-md"
                >
                  <Image
                    src={url}
                    alt="existing"
                    width={200}
                    height={200}
                    className="size-full rounded-[inherit] object-cover"
                  />
                  <Button
                    onClick={() => handleRemoveExisting(url)}
                    size="icon"
                    className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              ))}

              {files.map((file: any) => (
                <div
                  key={file.id}
                  className="bg-accent relative aspect-square rounded-md"
                >
                  <Image
                    src={file.preview}
                    alt={file.file.name}
                    width={200}
                    height={200}
                    className="size-full rounded-[inherit] object-cover"
                  />
                  <Button
                    onClick={() => handleRemoveNew(file.id)}
                    size="icon"
                    className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div className="bg-background mb-2 flex size-11 items-center justify-center rounded-full border">
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">{t.dropHere}</p>
            <p className="text-muted-foreground text-xs">
              {t.allowedTypes} {maxSizeMB}MB)
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openFileDialog();
              }}
            >
              <UploadIcon className="-ms-1 opacity-60" />
              {t.selectImages}
            </Button>
          </div>
        )}
      </div>
      {errors.length > 0 && (
        <div className="text-destructive flex items-center gap-1 text-xs">
          <AlertCircleIcon className="size-3" />
          <span>
            {lang === "ar"
              ? "حدث خطأ أثناء رفع الصور"
              : errors[0] ?? "Upload error"}
          </span>
        </div>
      )}
    </div>
  );
}

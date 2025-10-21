"use client";

import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useEffect, useState } from "react";
import { LangType } from "@/types/globals";
import Image from "next/image";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  lang: LangType;
  title?: string;
}

export default function UploadCover({ field, lang, title }: Props) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;

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
  });

  const [existingImage, setExistingImage] = useState<string | null>(
    typeof field.value === "string" ? field.value : null
  );

  const isNewFileSelected = files.length > 0;
  const previewUrl = isNewFileSelected
    ? files[0]?.preview
    : existingImage
    ? existingImage
    : null;

  // ✅ Sync file with react-hook-form
  useEffect(() => {
    if (files.length > 0) {
      field.onChange(files[0].file);
      setExistingImage(null);
    } else if (!existingImage) {
      field.onChange(null);
    }
  }, [files, field, existingImage]);

  const handleRemoveImage = () => {
    removeFile(files[0]?.id);
    setExistingImage(null);
    field.onChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Status text */}{" "}
        <p
          aria-live="polite"
          role="region"
          className="mb-2 font-medium text-sm"
        >
          {previewUrl
            ? lang === "ar"
              ? "تم اختيار صورة"
              : "Image selected"
            : title}{" "}
        </p>
        {/* Drop area */}
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-2 border-gray-500 bg-white hover:bg-transparent data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-md border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px] hover:border-primary"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label={lang === "ar" ? "ارفع صورة" : "Upload file"}
          />

          {previewUrl ? (
            <div className="absolute inset-0">
              <Image
                src={previewUrl}
                alt="Uploaded image"
                width={500}
                height={500}
                className="size-full object-cover"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <ImageUpIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">
                {lang === "ar"
                  ? "اسحب الصورة هنا أو اضغط للاختيار"
                  : "Drop your image here or click to browse"}
              </p>
              <p className="text-muted-foreground text-xs">
                {lang === "ar"
                  ? `الحد الأقصى: ${maxSizeMB} ميجابايت`
                  : `Max size: ${maxSizeMB}MB`}
              </p>
            </div>
          )}
        </div>
        {/* Remove button */}
        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={handleRemoveImage}
              aria-label={lang === "ar" ? "إزالة الصورة" : "Remove image"}
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      {/* Error messages */}
      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>
            {lang === "ar" ? "حجم الصورة أكبر من المسموح" : errors[0]}
          </span>
        </div>
      )}
    </div>
  );
}

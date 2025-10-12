/* eslint-disable @next/next/no-img-element */
"use client";

import { CircleUserRoundIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { LangType } from "@/types/globals";
import { useFileUpload } from "@/hooks/use-file-upload";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  lang: LangType;
}

export default function UploadLogo({ field, lang }: Props) {
  const [
    { files, isDragging },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({
    accept: "image/*",
  });

  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    typeof field.value === "string" && field.value !== "" ? field.value : null
  );

  React.useEffect(() => {
    if (files.length > 0) {
      const newUrl = files[0]?.preview || null;
      setPreviewUrl(newUrl);
      field.onChange(files[0].file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const handleRemove = () => {
    if (previewUrl) {
      setPreviewUrl(null);
      field.onChange(null);
    }
    if (files[0]) removeFile(files[0].id);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        {/* Drop area */}
        <button
          type="button"
          className="border-secondary bg-white hover:bg-secondary data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-32 items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors outline-none focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          aria-label={previewUrl ? "Change image" : "Upload image"}
        >
          {previewUrl ? (
            <img
              className="size-full object-cover"
              src={
                previewUrl.startsWith("blob:") ? previewUrl : `${previewUrl}`
              }
              alt="Profile image"
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-8 opacity-60" />
            </div>
          )}
        </button>

        {/* Remove button */}
        {previewUrl && (
          <Button
            onClick={handleRemove}
            size="icon"
            className="border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none"
            aria-label="Remove image"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}

        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1}
        />
      </div>

      <p className="text-muted-foreground mt-2 text-xs">
        {previewUrl
          ? lang === "ar"
            ? "تم اختيار صورة"
            : "Image selected"
          : lang === "ar"
          ? "قم برفع صورة شخصية"
          : "Upload your profile image"}
      </p>
    </div>
  );
}

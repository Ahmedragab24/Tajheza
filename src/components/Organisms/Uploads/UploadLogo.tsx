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

  const previewUrl = files[0]?.preview || null;

  const handleFileChange = (newFiles: typeof files) => {
    if (newFiles.length > 0) {
      field.onChange(newFiles[0].file);
    } else {
      field.onChange(null);
    }
  };

  React.useEffect(() => {
    handleFileChange(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        {/* Drop area */}
        <button
          type="button"
          className="border-input bg-white hover:bg-white/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-28 items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors outline-none focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none"
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
              src={previewUrl}
              alt={files[0]?.file?.name || "Uploaded image"}
              width={64}
              height={64}
              style={{ objectFit: "cover" }}
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
            onClick={() => {
              removeFile(files[0]?.id);
              field.onChange(null);
            }}
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

      <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-xs"
      >
        {previewUrl
          ? lang === "ar"
            ? "تم اختيار صورة"
            : "Image selected"
          : lang === "ar"
          ? "قم برفع صورة شخصية"
          : "Avatar uploader with droppable area"}
      </p>
    </div>
  );
}

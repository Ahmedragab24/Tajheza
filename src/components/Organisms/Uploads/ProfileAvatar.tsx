"use client";

import React from "react";
import { ImagePlusIcon, XIcon } from "lucide-react";

interface Props {
  previewUrl?: string | null;
  onFileChange: (file: File | null, preview?: string | null) => void;
  onRemove: () => void;
}

export default function ProfileAvatar({
  previewUrl,
  onFileChange,
  onRemove,
}: Props) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const preview = URL.createObjectURL(file);
      onFileChange(file, preview);
    }
  };

  return (
    <div className="Container -mt-20 md:-mt-25 mx-8 md:mx-30 flex  justify-start">
      <div className="relative flex w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-md">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            className="w-full h-full object-cover"
            alt="Profile avatar"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="text-xl"> </span>
          </div>
        )}

        <div className="absolute inset-3 flex items-center justify-center gap-2">
          <label className="flex items-center gap-1 px-2 py-1 bg-black/60 text-white rounded-md cursor-pointer hover:bg-black/75">
            <ImagePlusIcon size={14} />
            <input
              accept="image/*"
              type="file"
              onChange={handleInput}
              className="hidden"
            />
          </label>

          {previewUrl && (
            <button
              onClick={() => onRemove()}
              className="flex items-center gap-1 px-2 py-1 bg-black/60 text-white rounded-md hover:bg-black/75"
            >
              <XIcon size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

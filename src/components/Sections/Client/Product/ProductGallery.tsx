"use client";

import type React from "react";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { LangType } from "@/types/globals";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductGalleryProps {
  productImage: string;
  productImages: { id: number; url: string }[];
  productName?: string;
  lang: LangType;
}

const ProductGallery = ({
  productImage,
  productImages,
  productName = "Product",
  lang,
}: ProductGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const allImages = useMemo(() => {
    return [{ url: productImage }, ...productImages];
  }, [productImage, productImages]);

  useEffect(() => {
    setZoom(1);
    setRotation(0);
  }, [selectedImageIndex]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((i) => (i + 1) % allImages.length);
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex(
          (i) => (i - 1 + allImages.length) % allImages.length
        );
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isLightboxOpen, allImages.length]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = allImages[selectedImageIndex]?.url || "";
    link.download = `image-${selectedImageIndex + 1}.jpg`;
    link.click();
  };

  if (allImages.length === 0) {
    return (
      <div className="w-full mx-auto">
        <div className="relative w-full h-80 md:h-110 overflow-hidden rounded-lg border bg-gray-100 shadow-md aspect-square flex items-center justify-center">
          <Image
            src="/placeholder.svg"
            alt={`${productName} placeholder`}
            fill
            className="opacity-50"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full mx-auto space-y-4">
        <div
          className="relative w-full h-80 md:h-110 overflow-hidden rounded-lg border bg-gray-100 shadow-md cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={allImages[selectedImageIndex]?.url || "/placeholder.svg"}
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={100}
            className="object-cover transition-opacity duration-300"
            priority={selectedImageIndex === 0}
          />

          {allImages.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {selectedImageIndex + 1} / {allImages.length}
            </div>
          )}
        </div>

        {allImages.length > 1 && (
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                dragFree: true,
                direction: lang === "ar" ? "rtl" : "ltr",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-3 py-2 px-2">
                {allImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-3 basis-1/3 sm:basis-1/5 md:basis-1/6"
                  >
                    <button
                      className={cn(
                        "relative aspect-square w-full overflow-hidden rounded-md border-2 transition-all duration-200",
                        selectedImageIndex === index
                          ? "border-primary scale-105"
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedImageIndex(index)}
                      type="button"
                    >
                      <Image
                        src={image?.url || "/placeholder.svg"}
                        alt={`${productName} thumbnail ${index + 1}`}
                        fill
                        sizes="25vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-4" />
              <CarouselNext className="hidden sm:flex -right-4" />
            </Carousel>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[selectedImageIndex]?.url || ""}
              alt="lightbox"
              fill
              className="object-contain transition-transform"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
            />

            {allImages.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
                  onClick={() =>
                    setSelectedImageIndex(
                      (i) => (i - 1 + allImages.length) % allImages.length
                    )
                  }
                >
                  <ChevronLeft className="text-white w-6 h-6" />
                </button>

                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
                  onClick={() =>
                    setSelectedImageIndex((i) => (i + 1) % allImages.length)
                  }
                >
                  <ChevronRight className="text-white w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="absolute z-20 bottom-6 flex gap-4 bg-black/50 px-4 py-2 rounded-lg">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => z + 0.2);
              }}
            >
              <ZoomIn className="text-white w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.max(0.5, z - 0.2));
              }}
            >
              <ZoomOut className="text-white w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRotation((r) => r + 90);
              }}
            >
              <RotateCcw className="text-white w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
            >
              <Download className="text-white w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
            >
              <X className="text-white w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGallery;

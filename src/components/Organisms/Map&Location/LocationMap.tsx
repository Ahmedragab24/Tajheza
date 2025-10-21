/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { LangType } from "@/types/globals";
import { ProviderOrderDetailsType } from "@/types/ProviderOrders";
import { GoogleMapsLoader } from "@/components/Atoms/Loaders/GoogleMapsLoader";

interface LocationMapProps {
  order: ProviderOrderDetailsType;
  lang: LangType;
}

function MapComponent({
  order,
  isGoogleLoaded,
  lang,
}: {
  order: ProviderOrderDetailsType;
  isGoogleLoaded: boolean;
  lang: LangType;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any | null>(null);
  const markerRef = useRef<any | null>(null);

  useEffect(() => {
    if (
      isGoogleLoaded &&
      mapRef.current &&
      window.google &&
      !mapInstanceRef.current
    ) {
      const lat = Number(order?.location?.latitude ?? 24.7136);
      const lng = Number(order?.location?.longitude ?? 46.6753);

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 13,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: order?.items[0].title,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#ef4444",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3,
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; text-align: center; font-family: Arial, sans-serif; max-width: 200px;">
            <img 
              src="${order?.items[0].image || "/placeholder.png"}" 
              alt="${order?.items[0]?.title || "Product"}" 
              style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 6px;" 
            />
            <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #1f2937;">
              ${order?.items[0]?.title || ""}
            </h3>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
      mapInstanceRef.current = null;
    };
  }, [isGoogleLoaded, lang, order]);

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="h-64 w-full bg-gray-100"
        style={{ minHeight: "256px" }}
      >
        {!isGoogleLoaded && (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">
              {lang === "ar" ? "جاري تحميل الخريطة..." : "Loading map..."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function LocationMap({ order, lang }: LocationMapProps) {
  return (
    <GoogleMapsLoader>
      {(isLoaded) => (
        <Card className="overflow-hidden bg-white shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-primary">
                <MapPin className="w-5 h-5" />
                {lang === "ar" ? "الموقع" : "Location"}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Map */}
            <MapComponent order={order} isGoogleLoaded={isLoaded} lang={lang} />
          </CardContent>
        </Card>
      )}
    </GoogleMapsLoader>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Search, Loader2, Crosshair } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { LangType } from "@/types/globals";

interface LocationMapProps {
  field: {
    value: { lat: number; lng: number } | null;
    onChange: (value: { lat: number; lng: number }) => void;
  };
  lang: LangType;
}

declare global {
  interface Window {
    google?: any;
    initMap: () => void;
  }
}

const arabWorldBounds = {
  north: 37.5,
  south: -5.0,
  west: -17.0,
  east: 60.0,
};

const arabWorldCenter = { lat: 23.0, lng: 30.0 };

const LocationPicker = ({ field, lang }: LocationMapProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);
  const initializedRef = useRef(false);

  const extractCity = (results: any[]): string => {
    for (const result of results) {
      const cityComponent = result.address_components.find(
        (comp: any) =>
          comp.types.includes("locality") ||
          comp.types.includes("administrative_area_level_1")
      );
      if (cityComponent) return cityComponent.long_name;
    }
    return lang === "ar" ? "غير معروف" : "Unknown";
  };

  const handleLocationSelect = useCallback(
    (location: { lat: number; lng: number }) => {
      field.onChange(location);
      updateMarker(location.lat, location.lng);
    },
    [field]
  );

  const updateMarker = (lat: number, lng: number) => {
    if (!mapInstanceRef.current || !window.google) return;

    if (markerRef.current) {
      markerRef.current.setPosition({ lat, lng });
    } else {
      markerRef.current = new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstanceRef.current,
        animation: window.google.maps.Animation.DROP,
      });
    }

    mapInstanceRef.current.setCenter({ lat, lng });
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google || initializedRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: arabWorldCenter,
      zoom: 5,
      restriction: {
        latLngBounds: arabWorldBounds,
        strictBounds: false,
      },
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
    });

    mapInstanceRef.current = map;
    geocoderRef.current = new window.google.maps.Geocoder();
    initializedRef.current = true;

    map.addListener("click", (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      geocoderRef.current.geocode(
        { location: { lat, lng } },
        (results: any[], status: string) => {
          if (status === "OK" && results[0]) {
            extractCity(results);
          }
          handleLocationSelect({ lat, lng });
        }
      );
    });

    if (field.value) {
      updateMarker(field.value.lat, field.value.lng);
    }

    setIsMapLoading(false);
  };

  useEffect(() => {
    // إذا كان السكربت متحمل مسبقاً، نبدأ الخريطة فوراً
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // لو السكربت لسه مش متحمل، نضيفه مرة واحدة فقط
    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com"]`
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&language=${lang}`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      script.onerror = () => {
        setMapError("فشل في تحميل خرائط جوجل");
        setIsMapLoading(false);
      };
      document.head.appendChild(script);
    } else {
      existingScript.addEventListener("load", initializeMap);
    }

    return () => {
      existingScript?.removeEventListener("load", initializeMap);
    };
  }, [lang]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        handleLocationSelect({ lat, lng });
      },
      (err) => console.warn("Geolocation error:", err)
    );
  };

  const handleSearch = () => {
    if (!geocoderRef.current || !searchQuery.trim()) return;
    setIsSearching(true);
    geocoderRef.current.geocode(
      { address: searchQuery },
      (results: any[], status: string) => {
        setIsSearching(false);
        if (status === "OK" && results[0]) {
          const loc = results[0].geometry.location;
          handleLocationSelect({ lat: loc.lat(), lng: loc.lng() });
        }
      }
    );
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder={
              lang === "ar" ? "ابحث عن موقع ..." : "Search for a location..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            variant="outline"
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
          <Button onClick={getCurrentLocation} variant="secondary">
            <Crosshair className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          {isMapLoading && (
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          )}
          {mapError && (
            <div className="h-64 bg-red-50 rounded-lg flex items-center justify-center border border-red-200">
              <p className="text-red-600">{mapError}</p>
            </div>
          )}
          <div
            ref={mapRef}
            className={`h-64 rounded-lg ${
              isMapLoading || mapError ? "hidden" : ""
            }`}
          />
        </div>

        {field?.value?.lat !== undefined && field?.value?.lng !== undefined ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-800">
              {lang === "ar" ? "الموقع المحدد:" : "Selected Location:"}
            </p>
            <p className="text-xs text-gray-500">
              {field.value.lat.toFixed(6)}, {field.value.lng.toFixed(6)}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default LocationPicker;

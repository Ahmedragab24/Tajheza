/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Search, Loader2, Crosshair } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LangType } from "@/types/globals";

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

// حدود الوطن العربي
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
  const hasSetInitialLocation = useRef(false);

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
    (location: { lat: number; lng: number; city?: string }) => {
      const finalLocation = {
        lat: location.lat,
        lng: location.lng,
      };
      field.onChange(finalLocation);
    },
    [field, lang]
  );

  const updateMarker = (lat: number, lng: number) => {
    if (!mapInstanceRef.current || !window.google) return;

    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    markerRef.current = new window.google.maps.Marker({
      position: { lat, lng },
      map: mapInstanceRef.current,
      title: lang === "ar" ? "الموقع المحدد" : "Selected Location",
      animation: window.google.maps.Animation.DROP,
    });

    mapInstanceRef.current.setCenter({ lat, lng });
  };

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      try {
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

        if (field.value) {
          updateMarker(field.value.lat, field.value.lng);
        }

        map.addListener("click", (event: any) => {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();

          geocoderRef.current.geocode(
            { location: { lat, lng } },
            (results: any[], status: string) => {
              const city =
                status === "OK" && results[0]
                  ? extractCity(results)
                  : lang === "ar"
                  ? "غير معروف"
                  : "Unknown";

              updateMarker(lat, lng);
              handleLocationSelect({ lat, lng, city });
            }
          );
        });

        setIsMapLoading(false);
      } catch (error) {
        console.log(error);
        setMapError("فشل في تهيئة الخريطة");
        setIsMapLoading(false);
      }
    };

    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&language=${lang}`;
      script.async = true;
      script.defer = true;

      window.initMap = initializeMap;

      script.onerror = () => {
        setMapError("فشل في تحميل خرائط جوجل. تحقق من مفتاح API.");
        setIsMapLoading(false);
      };

      document.head.appendChild(script);
    };

    loadGoogleMaps();

    return () => {
      if ("initMap" in window) {
        delete (window as any).initMap;
      }
    };
  }, [handleLocationSelect, lang]);

  // تحديد الموقع الحالي
  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        if (!geocoderRef.current) return;

        geocoderRef.current.geocode(
          { location: { lat, lng } },
          (results: any[], status: string) => {
            const city =
              status === "OK" && results[0]
                ? extractCity(results)
                : lang === "ar"
                ? "غير معروف"
                : "Unknown";

            updateMarker(lat, lng);
            handleLocationSelect({ lat, lng, city });
          }
        );
        hasSetInitialLocation.current = true;
      },
      (err) => {
        console.warn("Geolocation error:", err);
      }
    );
  };

  useEffect(() => {
    if (hasSetInitialLocation.current) return;
    getCurrentLocation();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim() || !geocoderRef.current) return;
    setIsSearching(true);

    geocoderRef.current.geocode(
      { address: searchQuery },
      (results: any[], status: string) => {
        setIsSearching(false);
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          const city = extractCity(results);

          updateMarker(lat, lng);
          handleLocationSelect({ lat, lng, city });
        } else {
          alert(
            lang === "ar" ? "لم يتم العثور على الموقع." : "Location not found."
          );
        }
      }
    );
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Search */}
        <div className="flex gap-2">
          <Input
            placeholder={
              lang === "ar" ? "ابحث عن موقع ..." : "Search for a location..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="button"
            disabled={isSearching}
            onClick={handleSearch}
            variant="outline"
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
          <Button
            type="button"
            onClick={getCurrentLocation}
            variant="secondary"
            title={
              lang === "ar" ? "استخدم موقعي الحالي" : "Use current location"
            }
          >
            <Crosshair className="h-4 w-4" />
          </Button>
        </div>

        {/* Google Map */}
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

        {/* Selected Location */}
        {field.value && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-800">
              {lang === "ar" ? "الموقع المحدد:" : "Selected Location:"}
            </p>

            <p className="text-xs text-gray-500">
              {field.value.lat.toFixed(6)}, {field.value.lng.toFixed(6)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationPicker;

"use client";

import { useEffect, useState } from "react";

interface GoogleMapsLoaderProps {
  children: (isLoaded: boolean) => React.ReactNode;
}

export function GoogleMapsLoader({ children }: GoogleMapsLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      existingScript.addEventListener("load", () => setIsLoaded(true));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => setIsLoaded(true);

    document.body.appendChild(script);
  }, []);

  return <>{children(isLoaded)}</>;
}

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "./PageLayout";
import { locations } from "../data/locations";
import { locationImageOverrides } from "../data/locationImageOverrides";

type GeoPosition = {
  lat: number;
  lng: number;
};

type GoogleMap = {
  fitBounds: (bounds: GoogleLatLngBounds) => void;
  setCenter: (position: GeoPosition) => void;
  setZoom: (zoom: number) => void;
};

type GoogleMarker = object;

type GoogleLatLngBounds = {
  extend: (position: GeoPosition) => void;
  getCenter: () => GeoPosition;
};

type GoogleMapsNamespace = {
  maps: {
    Map: new (element: HTMLElement, options: Record<string, unknown>) => GoogleMap;
    Marker: new (options: {
      position: GeoPosition;
      map: GoogleMap;
      title: string;
      icon?: string;
    }) => GoogleMarker;
    LatLngBounds: new () => GoogleLatLngBounds;
  };
};

type GoogleMapsWindow = Window & {
  google?: GoogleMapsNamespace;
};

const LocationsPage = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [userPosition, setUserPosition] = useState<GeoPosition | null>(null);
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "denied">(
    "idle"
  );
  const [missingImages, setMissingImages] = useState<Record<number, boolean>>({});
  const [imageSources, setImageSources] = useState<Record<number, string>>({});
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<GoogleMap | null>(null);
  const markersRef = useRef<GoogleMarker[]>([]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus("denied");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setGeoStatus("idle");
      },
      () => {
        setGeoStatus("denied");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      requestLocation();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const paramQuery = searchParams.get("query");
    setQuery((prev) => {
      const nextQuery = paramQuery ?? "";
      return prev === nextQuery ? prev : nextQuery;
    });
  }, [searchParams]);

  useEffect(() => {
    if (!apiKey || !mapContainerRef.current || mapInstanceRef.current) return;

    const initializeMap = () => {
      const googleMaps = (window as GoogleMapsWindow).google;
      if (!googleMaps || !mapContainerRef.current) return;

      const center = locations.reduce(
        (acc, location) => {
          acc.lat += location.lat;
          acc.lng += location.lng;
          return acc;
        },
        { lat: 0, lng: 0 }
      );
      const total = locations.length || 1;
      const mapCenter = { lat: center.lat / total, lng: center.lng / total };

      const map = new googleMaps.maps.Map(mapContainerRef.current, {
        center: mapCenter,
        zoom: 11,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        fullscreenControl: false,
      });

      mapInstanceRef.current = map;
      const bounds = new googleMaps.maps.LatLngBounds();
      markersRef.current = locations.map((location) => {
        const position = { lat: location.lat, lng: location.lng };
        bounds.extend(position);
        return new googleMaps.maps.Marker({
          position,
          map,
          title: location.name,
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });
      });
      if (locations.length > 1) {
        map.fitBounds(bounds);
      } else if (locations.length === 1) {
        map.setCenter(bounds.getCenter());
        map.setZoom(14);
      }
    };

    const existingScript = document.querySelector(
      "script[data-google-maps]"
    ) as HTMLScriptElement | null;
    if (existingScript) {
      if (existingScript.getAttribute("data-loaded") === "true") {
        initializeMap();
      } else {
        existingScript.addEventListener("load", initializeMap, { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-google-maps", "true");
    script.addEventListener("load", () => {
      script.setAttribute("data-loaded", "true");
      initializeMap();
    });
    document.body.appendChild(script);
  }, [apiKey]);

  const calculateDistanceKm = (origin: GeoPosition, target: GeoPosition) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const earthRadiusKm = 6371;
    const dLat = toRad(target.lat - origin.lat);
    const dLng = toRad(target.lng - origin.lng);
    const lat1 = toRad(origin.lat);
    const lat2 = toRad(target.lat);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const filteredBranches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    let results = locations;
    if (normalizedQuery) {
      results = results.filter((branch) =>
        [branch.name, branch.city, branch.state, branch.address, branch.slug]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      );
    }
    if (userPosition) {
      results = [...results].sort((a, b) => {
        const distanceA = calculateDistanceKm(userPosition, {
          lat: a.lat,
          lng: a.lng,
        });
        const distanceB = calculateDistanceKm(userPosition, {
          lat: b.lat,
          lng: b.lng,
        });
        return distanceA - distanceB;
      });
    }
    return results;
  }, [query, userPosition]);

  return (
    <PageLayout
      title="Store Locations"
      description="Find your nearest Bokku store for fresh groceries and daily essentials."
    >
      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Left Side: Search & List */}
        <div className="flex w-full flex-col gap-6 lg:w-1/3 text-black">
          {/* Search Box */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Find a store</h2>
            <div className="mt-4 flex flex-col gap-3">
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter city or area..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                />
              </div>
              <button
                onClick={requestLocation}
                disabled={geoStatus === "loading"}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 active:scale-95 disabled:opacity-50"
              >
                <i className="fa-solid fa-location-crosshairs" />
                {geoStatus === "loading" ? "Locating..." : "Use my location"}
              </button>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{filteredBranches.length} locations found</span>
                {geoStatus === "denied" && <span className="text-red-500">Enable GPS</span>}
              </div>
            </div>
          </div>

          {/* Locations List */}
          <div className="flex max-h-[600px] flex-col gap-4 overflow-y-auto pr-2">
            {filteredBranches.map((branch) => (
              <div
                key={branch.id}
                className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-primary/30 hover:shadow-md"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-xl bg-slate-100">
                  {!missingImages[branch.id] ? (
                    <img
                      src={
                        imageSources[branch.id] ??
                        locationImageOverrides[branch.slug] ??
                        branch.imageUrl ??
                        `/assets/locations/${branch.slug}.jpg`
                      }
                      alt={branch.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(event) => {
                        const target = event.currentTarget;
                        const currentSource = target.getAttribute("src") ?? "";
                        if (currentSource.endsWith(".jpg")) {
                          setImageSources((prev) => ({
                            ...prev,
                            [branch.id]: `/assets/locations/${branch.slug}.svg`,
                          }));
                        } else {
                          setMissingImages((prev) => ({
                            ...prev,
                            [branch.id]: true,
                          }));
                        }
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <i className="fa-regular fa-image text-3xl" />
                    </div>
                  )}
                  {userPosition && (
                    <div className="absolute bottom-2 right-2 rounded-full bg-blue-950/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur">
                      {calculateDistanceKm(userPosition, { lat: branch.lat, lng: branch.lng }).toFixed(1)} km
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{branch.name}</h3>
                  <p className="text-sm text-slate-500">{branch.address}</p>
                  <p className="text-sm font-medium text-slate-900 mt-1">
                    {branch.city}, {branch.state}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">
                      <i className="fa-regular fa-clock" /> Open
                    </span>
                     <span className="flex items-center gap-1.5 text-slate-500">
                      <i className="fa-solid fa-phone" /> {branch.phone || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {filteredBranches.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                No stores found in this area.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="sticky top-24 h-[600px] w-full flex-1 overflow-hidden rounded-3xl bg-slate-100 shadow-inner lg:h-[calc(100vh-140px)]">
          {apiKey ? (
            <div ref={mapContainerRef} className="h-full w-full" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-slate-200 text-slate-500">
              <div className="rounded-full bg-white p-4 shadow-lg">
                <i className="fa-solid fa-map-location-dot text-4xl text-slate-400" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-slate-700">Map Unavailable</h3>
                <p className="text-sm">Add VITE_GOOGLE_MAPS_API_KEY to see live map.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default LocationsPage;

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
      title="Locations"
      description="Tell us where you are and we will show the closest Bokku branches near you."
      className="locations-shell"
    >
      <section className="locations-page">
        <div className="locations-hero">
          <div className="locations-hero__content">
            <h2>Find a Bokku store near you</h2>
            <p>
              Enter your area, city, or landmark to discover nearby branches,
              opening hours, and contact details.
            </p>
            <div className="locations-search">
              <input
                type="text"
                placeholder="Type your location (e.g. Lekki, Jabi, Surulere)"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search locations"
              />
              <div className="locations-search__actions">
                <button
                  type="button"
                  onClick={requestLocation}
                  disabled={geoStatus === "loading"}
                >
                  {geoStatus === "loading" ? "Locating..." : "Use my location"}
                </button>
                {geoStatus === "denied" && (
                  <span>Enable GPS to see nearest branches.</span>
                )}
              </div>
              <span className="locations-search__count">
                {filteredBranches.length} branch
                {filteredBranches.length === 1 ? "" : "es"} found
              </span>
            </div>
          </div>
          <div className="locations-hero__panel">
            <h3>Open daily</h3>
            <p>Most branches operate from 8:00 AM - 10:00 PM.</p>
            <div className="locations-hero__tag">Nationwide coverage</div>
          </div>
        </div>

        <div className="locations-layout">
          <div className="locations-map">
            {apiKey ? (
              <div ref={mapContainerRef} className="locations-map__canvas" />
            ) : (
              <div className="locations-map__placeholder">
                <h3>Google Maps</h3>
                <p>Add `VITE_GOOGLE_MAPS_API_KEY` to enable the live map.</p>
              </div>
            )}
          </div>

          <div className="locations-list-container">
            <div className="locations-grid">
            {filteredBranches.map((branch) => (
              <article key={branch.id} className="locations-card">
                <div className="locations-card__image">
                  {!missingImages[branch.id] && (
                    <img
                      src={
                        imageSources[branch.id] ??
                        locationImageOverrides[branch.slug] ??
                        branch.imageUrl ??
                        `/assets/locations/${branch.slug}.jpg`
                      }
                      alt={`${branch.name} storefront`}
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
                  )}
                  {missingImages[branch.id] && (
                    <div className="locations-card__image-placeholder">
                      Add branch image
                    </div>
                  )}
                </div>
                <div className="locations-card__body">
                  <div className="locations-card__title">{branch.name}</div>
                  <div className="locations-card__meta">
                    {branch.city}, {branch.state}
                  </div>
                  <p>{branch.address}</p>
                  <div className="locations-card__info">
                    <span>
                      {branch.hours?.mon ? `Mon - Fri ${branch.hours.mon}` : "Hours"}
                    </span>
                    <span>{branch.phone || "Phone unavailable"}</span>
                  </div>
                  {userPosition && (
                    <div className="locations-card__distance">
                      {calculateDistanceKm(userPosition, {
                        lat: branch.lat,
                        lng: branch.lng,
                      }).toFixed(1)}
                      km away
                    </div>
                  )}
                </div>
              </article>
            ))}
            {!filteredBranches.length && (
              <div className="locations-empty">
                No branches found. Try another area or city.
              </div>
            )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default LocationsPage;

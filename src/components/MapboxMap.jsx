import mapboxgl from "mapbox-gl";
import "../index.css";
import { useEffect, useRef, useState } from "react";
import { useProfileStore } from "../store/profileStore";
import { geocodeAddress } from "../utils/geoCode";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function createPopupHTML(profile) {
  return `
    <div class="p-2 rounded-md shadow-md bg-black text-sm text-white font-medium max-w-xs">
      📍 <strong>${profile.name}</strong><br/>
      <span>${profile.address}</span>
    </div>
  `;
}
function addMarker(mapInstance, coords, profile) {
  new mapboxgl.Marker({ color: "#3b82f6" })
    .setLngLat(coords)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(createPopupHTML(profile))
    )
    .addTo(mapInstance);
}

export default function MapboxMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const selectedProfile = useProfileStore((s) => s.selectedProfile);
  const [coords, setCoords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🧠 Fetch coordinates from address
  useEffect(() => {
    if (!selectedProfile || !selectedProfile.address) return;

    async function fetchCoords() {
      setIsLoading(true);
      const center = await geocodeAddress(selectedProfile.address);
      if (!center) {
        console.error(
          "Failed to fetch coordinates for:",
          selectedProfile.address
        );
        setIsLoading(false);
        return;
      }

      setCoords((prev) => {
        if (prev && prev[0] === center[0] && prev[1] === center[1]) return prev;
        return center;
      });
    }

    fetchCoords();
  }, [selectedProfile]);

  // 🗺️ Initialize or update the map
  useEffect(() => {
    if (!coords || !mapContainer.current) return;

    if (mapRef.current) {
      mapRef.current = null;
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: coords,
      zoom: 14,
    });

    mapRef.current = map;

    // Wait for the map to fully load before adding the marker
    map.on("load", () => {
      setIsLoading(false);

      addMarker(map, coords, selectedProfile);
    });

    return () => {
      map.remove();
    };
  }, [coords, selectedProfile]);

  return (
    <div
      className="relative mt-6 w-full rounded-xl overflow-hidden border-2 border-gray-300
                    h-64 sm:h-80 md:h-96 lg:h-[30rem] xl:h-[36rem]"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}

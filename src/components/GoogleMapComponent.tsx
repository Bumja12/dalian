"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import type { Place } from "@/lib/db/queries/places";
import { useDrawerStore } from "@/lib/stores/drawerStore";
import { useMapStore } from "@/lib/stores/mapStore";

interface GoogleMapComponentProps {
  places: Place[];
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

export default function GoogleMapComponent({
  places,
}: GoogleMapComponentProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { selectedPlace, mapCenter, setSelectedPlace } = useMapStore();
  const { openToFull, openToMiddle } = useDrawerStore();

  const handleMarkerClick = (place: Place) => {
    console.warn(place);
    setSelectedPlace(place);
    openToFull();
  };

  const handleMapClick = () => {
    setSelectedPlace(null);
  };

  const handleMapDragStart = () => {
    if (selectedPlace !== null) {
      openToMiddle();
    }
  };

  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <p className="text-gray-500">Google Maps API 키가 필요합니다</p>
      </div>
    );
  }

  const createMarkerIcon = (isSelected: boolean): google.maps.Icon => {
    const size = isSelected ? 32 : 24;
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${isSelected ? "#FF4444" : "#4285F4"}"/>
      </svg>
    `;

    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: { width: size, height: size } as google.maps.Size,
      anchor: { x: size / 2, y: size } as google.maps.Point,
    };
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={13}
        onClick={handleMapClick}
        onDragStart={handleMapDragStart}
        options={{
          disableDefaultUI: false,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          cameraControl: false,
          clickableIcons: false,
        }}
      >
        {places.map(place => (
          <Marker
            key={place.id}
            position={{ lat: place.lat, lng: place.lng }}
            title={place.name}
            onClick={() => handleMarkerClick(place)}
            icon={createMarkerIcon(selectedPlace?.id === place.id)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

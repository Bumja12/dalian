"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import type { Place } from "@/lib/db/queries/places";
import { createMarkerIcon, type MarkerType } from "@/lib/markerIcons";
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

  const { selectedPlace, mapCenter, currentLocation, setSelectedPlace } =
    useMapStore();
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

  /**
   * 장소 카테고리를 기반으로 마커 타입을 결정합니다.
   * 1:1 매핑: home → 숙소, cafe → 카페, food → 식당, attraction → 여행지
   */
  const getMarkerType = (category: string): MarkerType => {
    const categoryLower = category.toLowerCase();

    // 정확한 1:1 매핑
    if (categoryLower === "home" || categoryLower === "숙소") {
      return "home";
    } else if (categoryLower === "cafe" || categoryLower === "카페") {
      return "cafe";
    } else if (categoryLower === "food" || categoryLower === "식당") {
      return "food";
    } else if (categoryLower === "attraction" || categoryLower === "여행지") {
      return "attraction";
    }

    // 기본값은 food로 설정
    return "food";
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
        {places.map(place => {
          const isSelected = selectedPlace?.id === place.id;
          const markerType = getMarkerType(place.category);

          return (
            <Marker
              key={place.id}
              position={{ lat: place.lat, lng: place.lng }}
              title={place.name}
              onClick={() => handleMarkerClick(place)}
              icon={createMarkerIcon(markerType, isSelected)}
            />
          );
        })}

        {/* 내 위치 마커 - 빨간색 동그라미 */}
        {currentLocation && (
          <Marker
            key="current-location"
            position={currentLocation}
            title="내 위치"
            icon={{
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#FF4444" stroke="white" stroke-width="3"/>
                </svg>
              `)}`,
              scaledSize: { width: 20, height: 20 } as google.maps.Size,
              anchor: { x: 12, y: 12 } as google.maps.Point,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

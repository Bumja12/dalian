import { create } from "zustand";

import type { Place } from "@/lib/db/queries/places";

interface LatLng {
  lat: number;
  lng: number;
}

interface FilterOptions {
  category?: string;
  rating?: number;
  priceRange?: [number, number];
}

interface MapState {
  selectedPlace: Place | null;
  searchQuery: string;
  filters: FilterOptions;
  currentLocation: LatLng | null;
  mapCenter: LatLng;

  setSelectedPlace: (place: Place | null) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  setCurrentLocation: (location: LatLng) => void;
  updateMapCenter: (center: LatLng) => void;

  getSelectedPlace: () => Place | null;
}

export const useMapStore = create<MapState>((set, get) => ({
  selectedPlace: null,
  searchQuery: "",
  filters: {},
  currentLocation: null,
  mapCenter: { lat: 38.9216, lng: 121.643878 },

  // 액션 구현
  setSelectedPlace: place => set({ selectedPlace: place }),

  setSearchQuery: query => set({ searchQuery: query }),

  setFilters: newFilters =>
    set(state => ({
      filters: { ...state.filters, ...newFilters },
    })),

  setCurrentLocation: location => set({ currentLocation: location }),

  updateMapCenter: center => set({ mapCenter: center }),

  // 계산된 값
  getSelectedPlace: () => {
    const { selectedPlace } = get();
    return selectedPlace;
  },
}));

"use client";

import { useEffect, useState } from "react";

import { getPlacesWithFiltersAction } from "@/app/actions/places";
import BottomDrawer from "@/components/home/BottomDrawer";
import FloatingControls from "@/components/home/FloatingControls";
import TopSearchBar from "@/components/home/TopSearchBar";
import GoogleMapWrapper from "@/components/map/GoogleMapWrapper";
import type { Place } from "@/lib/db/queries/places";
import { useFilterModalStore } from "@/lib/stores/filterModalStore";
import { cn } from "@/utils/ui";

interface HomePageClientProps {
  initialPlaces: Place[];
}

export default function HomePageClient({ initialPlaces }: HomePageClientProps) {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [isLoading, setIsLoading] = useState(false);

  const {
    selectedCategories,
    selectedTags,
    hasActiveFilters,
    isOpen: isFilterModalOpen,
  } = useFilterModalStore();

  useEffect(() => {
    const loadFilteredPlaces = async () => {
      setIsLoading(true);
      try {
        let filteredPlaces: Place[];

        if (hasActiveFilters()) {
          // 필터가 적용된 경우
          const categories =
            selectedCategories.length > 0 ? selectedCategories : undefined;
          const tagIds = selectedTags.length > 0 ? selectedTags : undefined;
          filteredPlaces = await getPlacesWithFiltersAction(categories, tagIds);
        } else {
          // 필터가 없는 경우 모든 장소 가져오기
          filteredPlaces = initialPlaces;
        }

        setPlaces(filteredPlaces);
      } catch (error) {
        console.error("장소 필터링 오류:", error);
        // 에러 발생 시 초기 데이터로 복원
        setPlaces(initialPlaces);
      } finally {
        setIsLoading(false);
      }
    };

    loadFilteredPlaces();
  }, [selectedCategories, selectedTags, hasActiveFilters, initialPlaces]);

  return (
    <div className="relative min-h-screen">
      <div
        className={cn(
          "absolute inset-0",
          isFilterModalOpen && "pointer-events-none"
        )}
      >
        <GoogleMapWrapper places={places} />
      </div>
      <TopSearchBar />
      <FloatingControls />
      <BottomDrawer />
      {isLoading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20">
          <div className="rounded-lg bg-white px-4 py-2 shadow-lg">
            <p className="text-sm text-gray-600">필터링 중...</p>
          </div>
        </div>
      )}
    </div>
  );
}

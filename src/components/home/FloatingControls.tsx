"use client";

import IconButton from "@/components/common/IconButton";
import FilterModal from "@/components/home/FilterModal";
import { CameraControlIcon, FilterIcon } from "@/components/icons";
import { useFilterModalStore } from "@/lib/stores/filterModalStore";
import { useMapStore } from "@/lib/stores/mapStore";
import { cn } from "@/utils/ui";

interface FloatingControlsProps {
  className?: string;
}

export default function FloatingControls({
  className = "",
}: FloatingControlsProps) {
  const { setCurrentLocation, updateMapCenter } = useMapStore();
  const { openModal } = useFilterModalStore();

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(currentPos);
          updateMapCenter(currentPos);
          console.warn("현재 위치로 이동:", currentPos);
        },
        error => {
          console.error("위치 정보 가져오기 실패:", error);
        }
      );
    } else {
      console.error("Geolocation을 지원하지 않는 브라우저입니다.");
    }
  };
  return (
    <section
      className={cn([
        "relative",
        "z-10",
        "px-3",
        "pointer-events-none",
        className,
      ])}
    >
      <div className="container flex h-[7vh] flex-row items-center justify-between gap-2">
        <div className="h-full">
          <IconButton
            ariaLabel="카메라 컨트롤"
            onClick={handleCurrentLocationClick}
          >
            <CameraControlIcon className="h-6 w-6 text-gray-900" />
          </IconButton>
        </div>
        {/* <div className="flex h-full flex-col justify-end">
          <button
            type="button"
            onClick={() => {}}
            aria-label="현 위치로 검색"
            className="pressable rounded-full bg-white/85 px-4 py-2 shadow-lg backdrop-blur-sm"
          >
            <span className="text-sm text-gray-900">현 위치로 검색</span>
          </button>
        </div> */}
        <div className="h-full">
          <IconButton ariaLabel="필터링" onClick={openModal}>
            <FilterIcon className="h-6 w-6 text-gray-900" />
          </IconButton>
        </div>
      </div>

      {/* 필터링 모달 */}
      <FilterModal />
    </section>
  );
}

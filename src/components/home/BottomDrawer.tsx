"use client";

import { useEffect, useRef, useState } from "react";
import { Sheet, type SheetRef } from "react-modal-sheet";

import ImageCarousel from "@/components/common/ImageCarousel";
import PlaceInfo from "@/components/home/PlaceInfo";
import { useDrawerStore } from "@/lib/stores/drawerStore";
import { useMapStore } from "@/lib/stores/mapStore";

export default function BottomDrawer() {
  const { getSelectedPlace } = useMapStore();
  const { getIsOpen, setSnapToFunction, setSnapIndex } = useDrawerStore();
  const isOpen = getIsOpen();
  const selectedPlace = getSelectedPlace();
  const [isMounted, setIsMounted] = useState(false);
  const [spacer, setSpacer] = useState("152px");
  const sheetRef = useRef<SheetRef>(null);

  const snapTo = (snap: number) => {
    sheetRef.current?.snapTo(snap);
  };

  useEffect(() => {
    setIsMounted(true);
    // snapTo 함수를 drawer store에 등록
    setSnapToFunction(snapTo);

    // 컴포넌트 언마운트 시 정리
    return () => {
      setSnapToFunction(null);
    };
  }, [setSnapToFunction]);

  useEffect(() => {
    if (!isMounted) return;
    const root = document.documentElement;
    root.style.setProperty("--bottom-sheet-spacer", spacer);
    return () => {
      root.style.removeProperty("--bottom-sheet-spacer");
    };
  }, [isMounted, spacer]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Sheet
        ref={sheetRef}
        isOpen={isOpen}
        onClose={() => {}}
        initialSnap={2}
        disableDismiss
        avoidKeyboard
        snapPoints={[0, 0.45, 1]}
        detent="content"
        onSnap={index => {
          setSpacer(index >= 2 ? "18rem" : "8rem");
          setSnapIndex(index);
        }}
      >
        <Sheet.Container>
          {/* <BottomActionBar /> */}
          <Sheet.Content disableDrag>
            <div className="h-72 w-full">
              <Sheet.Header>
                <div className="flex h-8 items-center justify-center">
                  <Sheet.DragIndicator />
                </div>
              </Sheet.Header>
              <PlaceInfo
                name={selectedPlace?.name || ""}
                address={selectedPlace?.address || ""}
                rating={selectedPlace?.rating || 0}
                tags={selectedPlace?.tags || []}
                category={selectedPlace?.category || ""}
              />
              {/* 사진 영역 */}
              <div className="h-40 px-6 pt-1 pb-3">
                <ImageCarousel
                  menus={selectedPlace?.menus}
                  mainImage={selectedPlace?.image_url}
                  images={selectedPlace?.images}
                  height={128}
                />
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
}

"use client";

import dynamic from "next/dynamic";

import type { Place } from "@/lib/db/queries/places";

// 클라이언트 컴포넌트를 동적으로 import (SSR 비활성화)
const GoogleMapComponent = dynamic(
  () => import("@/components/map/GoogleMapComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <p className="text-gray-500">지도를 불러오는 중...</p>
      </div>
    ),
  }
);

interface GoogleMapWrapperProps {
  places: Place[];
}

export default function GoogleMapWrapper({ places }: GoogleMapWrapperProps) {
  return <GoogleMapComponent places={places} />;
}

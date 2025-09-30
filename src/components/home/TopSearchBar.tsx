"use client";

import { SearchIcon } from "@/components/icons";
import { useMapStore } from "@/lib/stores/mapStore";
import { cn } from "@/utils/ui";

interface TopSearchBarProps {
  className?: string;
}

export default function TopSearchBar({ className = "" }: TopSearchBarProps) {
  const { searchQuery, setSearchQuery } = useMapStore();

  return (
    <header className={cn(["relative", "z-10", "p-6", className])}>
      <div className="container rounded-3xl border border-gray-200 bg-white/85 p-2 shadow-lg backdrop-blur-sm transition-colors focus-within:border-blue-500 hover:border-gray-300">
        <div className="flex flex-row items-center justify-between gap-2">
          <div>
            <SearchIcon className="h-6 w-6 text-gray-500" />
          </div>
          <div className="w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="장소 검색"
              placeholder="장소를 검색하세요"
              className="w-full border-none bg-transparent text-center outline-none placeholder:text-gray-500"
            />
          </div>
          <button
            type="button"
            aria-label="exit"
            className="pressable rounded-md bg-red-500 px-2 py-1 text-xs text-white transition-colors hover:bg-red-600"
            onClick={() => {
              // 쿠키 삭제
              document.cookie = "dalian_auth=; path=/; max-age=0";
              // 페이지 새로고침으로 로그인 페이지로 이동
              window.location.href = "/login";
            }}
          >
            EXIT
          </button>
        </div>
      </div>
    </header>
  );
}

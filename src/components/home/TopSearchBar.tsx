import { MenuIcon, SearchIcon } from "../icons";

interface TopSearchBarProps {
  className?: string;
}

export default function TopSearchBar({ className = "" }: TopSearchBarProps) {
  return (
    <header className={["relative z-10 p-6", className].join(" ")}>
      <div className="container rounded-3xl border border-gray-200 bg-white/85 p-2 shadow-lg backdrop-blur-sm transition-colors focus-within:border-blue-500 hover:border-gray-300">
        <div className="flex flex-row items-center justify-between gap-2">
          <div>
            <SearchIcon className="h-6 w-6 text-gray-500" />
          </div>
          <div className="w-full">
            <input
              type="text"
              aria-label="장소 검색"
              placeholder="장소를 검색하세요"
              className="w-full border-none bg-transparent text-center outline-none placeholder:text-gray-500"
            />
          </div>
          <button type="button" aria-label="메뉴 열기" className="pressable">
            <MenuIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}

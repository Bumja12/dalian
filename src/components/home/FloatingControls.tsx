import IconButton from "../common/IconButton";
import { CameraControlIcon, FilterIcon } from "../icons";

interface FloatingControlsProps {
  className?: string;
}

export default function FloatingControls({
  className = "",
}: FloatingControlsProps) {
  return (
    <section className={["relative z-10 px-3", className].join(" ")}>
      <div className="container flex h-[7vh] flex-row items-center justify-between gap-2">
        <div className="h-full">
          <IconButton ariaLabel="카메라 컨트롤">
            <CameraControlIcon className="h-6 w-6 text-gray-900" />
          </IconButton>
        </div>
        <div className="flex h-full flex-col justify-end">
          <button
            type="button"
            aria-label="현 위치로 검색"
            className="pressable rounded-full bg-white/85 px-4 py-2 shadow-lg backdrop-blur-sm"
          >
            <span className="text-sm text-gray-900">현 위치로 이동</span>
          </button>
        </div>
        <div className="h-full">
          <IconButton ariaLabel="필터">
            <FilterIcon className="h-6 w-6 text-gray-900" />
          </IconButton>
        </div>
      </div>
    </section>
  );
}

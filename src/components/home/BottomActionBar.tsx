import { ListIcon } from "@/components/icons";
import { cn } from "@/utils/ui";

interface BottomActionBarProps {
  className?: string;
}

export default function BottomActionBar({
  className = "",
}: BottomActionBarProps) {
  return (
    <footer
      className={cn([
        "fixed",
        "right-0",
        "bottom-0",
        "left-0",
        "h-[10vh]",
        "p-6",
        className,
      ])}
      style={{ bottom: "var(--bottom-sheet-spacer, 0)" }}
    >
      <div className="container flex h-full flex-row items-center justify-center">
        <button
          type="button"
          aria-label="목록 보기"
          className="pressable rounded-full bg-white/85 px-4 py-2 shadow-lg backdrop-blur-sm"
        >
          <span className="inline-flex items-center gap-1 text-sm text-gray-900">
            <ListIcon className="h-5 w-5 text-gray-900" />
            <span>목록 보기</span>
          </span>
        </button>
      </div>
    </footer>
  );
}

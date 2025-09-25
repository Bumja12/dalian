import { cn } from "@/utils/ui";

interface PlaceTagProps {
  name: string;
  type: "category" | "tag";
}

export default function PlaceTag({ name, type }: PlaceTagProps) {
  const bgColor = type === "category" ? "bg-pink-200" : "bg-blue-200";

  return (
    <div
      className={cn([
        "flex",
        "flex-row",
        "items-center",
        "justify-center",
        "rounded-sm",
        "px-3.5",
        "py-1",
        "text-sm",
        "font-extrabold",
        bgColor,
      ])}
    >
      {name}
    </div>
  );
}

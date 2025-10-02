import CopyButton from "@/components/home/CopyButton";
import PlaceTag from "@/components/home/PlaceTag";
import { StarIcon } from "@/components/icons";

interface PlaceInfoProps {
  name: string;
  address: string;
  rating: number;
  tags: string[];
  category: string;
}

function PlaceName({ name }: { name: string }) {
  return <div className="text-lg font-bold">{name}</div>;
}

function PlaceRating({ rating }: { rating: number }) {
  return (
    <div className="flex flex-row items-center justify-start gap-1">
      <StarIcon className="h-2 w-2 text-yellow-500" />
      <div className="text-sm text-gray-500">{rating}</div>
    </div>
  );
}

export default function PlaceInfo({
  name,
  address,
  rating,
  tags = [],
  category,
}: PlaceInfoProps) {
  return (
    <div className="flex h-20 flex-col gap-1">
      <div>
        <div className="flex flex-row items-center justify-between px-6">
          <div className="flex flex-row items-center justify-start gap-1.5">
            <PlaceName name={name} />
            <PlaceRating rating={rating} />
          </div>
          <CopyButton copyText={address} />
        </div>
      </div>
      <div className="px-6">
        <div className="scrollbar-hide flex flex-row items-center gap-1.5 overflow-x-auto">
          {category && (
            <PlaceTag
              name={category}
              type="category"
              className="flex-shrink-0"
            />
          )}
          {tags.map(tag => (
            <PlaceTag
              key={tag}
              name={tag}
              type="tag"
              className="flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

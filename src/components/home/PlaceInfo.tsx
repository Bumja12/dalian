import CopyButton from "@/components/home/CopyButton";
import PlaceTag from "@/components/home/PlaceTag";
import { StarIcon } from "@/components/icons";

interface PlaceInfoProps {
  name: string;
  address: string;
  rating: number;
  representativeMenus: string[];
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
  representativeMenus,
  tags = [],
  category,
}: PlaceInfoProps) {
  return (
    <div className="flex h-24 flex-col gap-3">
      <div>
        <div className="flex flex-row items-center justify-between px-6">
          <div className="flex flex-row items-center justify-start gap-1.5">
            <PlaceName name={name} />
            <PlaceRating rating={rating} />
          </div>
          <CopyButton copyText={address} />
        </div>
        <div className="flex flex-row items-center justify-start gap-1.5 px-6">
          {representativeMenus.map(menu => (
            <div key={menu} className="text-xs font-bold text-gray-400">
              {menu}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center justify-start gap-1.5 px-6">
        {category && <PlaceTag name={category} type="category" />}
        {tags.map(tag => (
          <PlaceTag key={tag} name={tag} type="tag" />
        ))}
      </div>
    </div>
  );
}

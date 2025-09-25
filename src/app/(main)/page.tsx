import GoogleMapComponent from "@/components/GoogleMapComponent";
import BottomDrawer from "@/components/home/BottomDrawer";
import FloatingControls from "@/components/home/FloatingControls";
import TopSearchBar from "@/components/home/TopSearchBar";
import { getPlaces } from "@/lib/db/queries/places";

export default async function HomePage() {
  const places = await getPlaces();

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <GoogleMapComponent places={places} />
      </div>
      <TopSearchBar />
      <FloatingControls />
      <BottomDrawer />
    </div>
  );
}

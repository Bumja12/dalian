import GoogleMapComponent from "@/components/GoogleMapComponent";
import BottomActionBar from "@/components/home/BottomActionBar";
import FloatingControls from "@/components/home/FloatingControls";
import TopSearchBar from "@/components/home/TopSearchBar";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <GoogleMapComponent />
      </div>
      <TopSearchBar />
      <FloatingControls />
      <BottomActionBar />
    </div>
  );
}

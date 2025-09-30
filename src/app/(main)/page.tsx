import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import BottomDrawer from "@/components/home/BottomDrawer";
import FloatingControls from "@/components/home/FloatingControls";
import TopSearchBar from "@/components/home/TopSearchBar";
import GoogleMapWrapper from "@/components/map/GoogleMapWrapper";
import { getPlaces } from "@/lib/db/queries/places";

export default async function HomePage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("dalian_auth");

  // 쿠키가 없으면 로그인 페이지로 리다이렉트
  if (!authCookie) {
    redirect("/login");
  }

  // 쿠키 검증
  try {
    const authData = JSON.parse(authCookie.value);
    if (!authData.isLoggedIn) {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }

  // 인증 성공 시 데이터 로드
  const places = await getPlaces();

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <GoogleMapWrapper places={places} />
      </div>
      <TopSearchBar />
      <FloatingControls />
      <BottomDrawer />
    </div>
  );
}

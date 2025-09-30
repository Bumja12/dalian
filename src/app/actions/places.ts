"use server";

import { revalidatePath } from "next/cache";

import {
  createPlace,
  getPlaces,
  type PlaceRegistrationData,
} from "@/lib/db/queries/places";

export async function createPlaceAction(formData: FormData) {
  try {
    // FormData에서 데이터 추출
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const rate = parseFloat(formData.get("rate") as string);
    const category = formData.get("category") as string;
    const lat = parseFloat(formData.get("lat") as string);
    const lng = parseFloat(formData.get("lng") as string);

    // 필수 필드 검증
    const requiredFields = [
      { key: "name", value: name, label: "장소명" },
      { key: "address", value: address, label: "주소" },
      { key: "category", value: category, label: "카테고리" },
      { key: "lat", value: lat, label: "위도" },
      { key: "lng", value: lng, label: "경도" },
    ];

    for (const field of requiredFields) {
      if (
        !field.value ||
        (typeof field.value === "number" && isNaN(field.value))
      ) {
        throw new Error(`필수 필드 누락 또는 잘못됨: ${field.label}`);
      }
    }

    // 배열 데이터 파싱 (JSON 문자열로 전달됨)
    const menuData = formData.get("menu") as string;
    const imagesData = formData.get("images") as string;
    const tagsData = formData.get("tags") as string;
    const mainImage = (formData.get("main_image") as string) || "";

    let menu = [];
    let images = [];
    let tags = [];

    try {
      menu = menuData ? JSON.parse(menuData) : [];
      images = imagesData ? JSON.parse(imagesData) : [];
      tags = tagsData ? JSON.parse(tagsData) : [];
    } catch (parseError) {
      console.error("JSON 파싱 오류:", parseError);
      throw new Error("데이터 형식이 잘못되었습니다.");
    }

    const registrationData: PlaceRegistrationData = {
      name,
      address,
      rate,
      menu,
      images,
      main_image: mainImage,
      category,
      tags,
      lat,
      lng,
    };

    console.log("장소 등록 데이터:", registrationData);
    const placeId = await createPlace(registrationData);
    console.log("생성된 placeId:", placeId);

    // 생성된 데이터 확인 (디버그용)
    const { sql } = await import("@/lib/db");
    const menus =
      await sql`SELECT * FROM dalian.menus WHERE place_id = ${placeId}`;
    const images_result =
      await sql`SELECT * FROM dalian.place_images WHERE place_id = ${placeId}`;
    const tags_result =
      await sql`SELECT t.name FROM dalian.tags t JOIN dalian.place_tags pt ON t.id = pt.tag_id WHERE pt.place_id = ${placeId}`;

    console.log("저장된 메뉴:", menus);
    console.log("저장된 이미지:", images_result);
    console.log("저장된 태그:", tags_result);

    // 캐시 무효화 (장소 목록이 변경되었으므로)
    revalidatePath("/");

    return {
      success: true,
      placeId,
      message: "장소가 성공적으로 등록되었습니다.",
      debug: {
        menus: menus.length,
        images: images_result.length,
        tags: tags_result.length,
      },
    };
  } catch (error) {
    console.error("장소 등록 오류:", error);
    throw new Error(
      error instanceof Error ? error.message : "장소 등록에 실패했습니다."
    );
  }
}

export async function getPlacesAction() {
  try {
    const places = await getPlaces();
    return places;
  } catch (error) {
    console.error("장소 조회 오류:", error);
    throw new Error("장소 조회에 실패했습니다.");
  }
}

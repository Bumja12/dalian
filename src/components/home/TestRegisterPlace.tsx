"use client";

import { useState } from "react";

import { createPlaceAction } from "@/app/actions/places";

interface TestRegisterPlaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TestRegisterPlace({
  isOpen,
  onClose,
}: TestRegisterPlaceProps) {
  const [jsonData, setJsonData] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFormAction = async (formData: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      // JSON 데이터 파싱 및 검증
      if (!jsonData.trim()) {
        throw new Error("JSON 데이터를 입력해주세요.");
      }

      let placeData;
      try {
        placeData = JSON.parse(jsonData);
      } catch {
        throw new Error("JSON 형식이 잘못되었습니다.");
      }

      // 위치 파싱
      if (!location.trim()) {
        throw new Error("위치를 입력해주세요.");
      }

      const locationParts = location.split(",").map(coord => coord.trim());
      if (locationParts.length !== 2) {
        throw new Error(
          "위치 형식이 올바르지 않습니다. '위도, 경도' 형식으로 입력해주세요."
        );
      }

      const lat = parseFloat(locationParts[0]);
      const lng = parseFloat(locationParts[1]);

      if (isNaN(lat) || isNaN(lng)) {
        throw new Error("위도와 경도가 올바른 숫자가 아닙니다.");
      }

      // 태그 파싱
      const tagArray = tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag);

      // FormData에 데이터 추가
      formData.set("name", placeData.name);
      formData.set("address", placeData.address);
      formData.set("rate", placeData.rate.toString());
      formData.set("menu", JSON.stringify(placeData.menu || []));
      formData.set("images", JSON.stringify(placeData.images || []));
      formData.set("main_image", placeData.main_image || "");
      formData.set("category", category);
      formData.set("tags", JSON.stringify(tagArray));
      formData.set("lat", lat.toString());
      formData.set("lng", lng.toString());

      const result = await createPlaceAction(formData);

      console.warn("장소 등록 성공:", result.placeId);
      alert(`장소가 성공적으로 등록되었습니다. (ID: ${result.placeId})`);

      // 폼 초기화
      setJsonData("");
      setLocation("");
      setCategory("");
      setTags("");
      onClose();
    } catch (error) {
      console.error("장소 등록 실패:", error);
      setError(
        error instanceof Error ? error.message : "장소 등록에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">장소 등록</h2>
          <p className="text-sm text-gray-600">
            JSON 데이터와 추가 정보를 입력해주세요.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <form action={handleFormAction} className="space-y-4">
          {/* JSON 데이터 입력 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              JSON 데이터
            </label>
            <textarea
              value={jsonData}
              onChange={e => setJsonData(e.target.value)}
              placeholder={`{
  "name": "장소명",
  "address": "주소",
  "rate": 4.5,
  "menu": [{"name": "메뉴1", "image": "이미지URL"}],
  "images": ["이미지URL1", "이미지URL2"],
  "main_image": "메뉴이미지URL"
}`}
              rows={8}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* 위치 입력 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              위치 (위도, 경도)
            </label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="38.914003, 121.614682"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* 카테고리 입력 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              카테고리
            </label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="식당"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* 태그 입력 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              태그 (쉼표로 구분)
            </label>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="태그1, 태그2, 태그3"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* 버튼들 */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "등록 중..." : "등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

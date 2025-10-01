"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { getTagsAction } from "@/app/actions/places";
import IconButton from "@/components/common/IconButton";
import PlaceTag from "@/components/home/PlaceTag";
import { CATEGORIES, useFilterModalStore } from "@/lib/stores/filterModalStore";
import { cn } from "@/utils/ui";

export default function FilterModal() {
  const {
    isOpen,
    selectedCategories,
    selectedTags,
    availableTags,
    closeModal,
    toggleCategory,
    toggleTag,
    setAvailableTags,
    resetFilters,
    applyFilters,
  } = useFilterModalStore();

  // 모달이 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // 컴포넌트 언마운트 시 클린업
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && availableTags.length === 0) {
      const loadTags = async () => {
        setIsLoading(true);
        try {
          const tags = await getTagsAction();
          setAvailableTags(tags);
        } catch (error) {
          console.error("태그 로딩 실패:", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadTags();
    }
  }, [isOpen, availableTags.length, setAvailableTags]);

  if (!isOpen) return null;

  const handleReset = () => {
    resetFilters();
  };

  const handleApply = () => {
    applyFilters();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* 배경 클릭 영역 */}
      <div className="absolute inset-0" onClick={handleBackdropClick} />
      <div className="pointer-events-auto relative z-10 flex max-h-[90vh] w-full max-w-md flex-col rounded-2xl bg-white p-6 shadow-xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">필터</h2>
          <IconButton
            ariaLabel="모달 닫기"
            onClick={closeModal}
            className="h-8 w-8"
          >
            <X className="h-5 w-5" />
          </IconButton>
        </div>

        {/* 카테고리 섹션 */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-gray-700">카테고리</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => {
              const isSelected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className="transition-opacity hover:opacity-80"
                >
                  <PlaceTag
                    name={category}
                    type="category"
                    className={cn([
                      "transition-all",
                      !isSelected && "opacity-50",
                    ])}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 태그 섹션 */}
        <div className="mb-6 flex flex-1 flex-col overflow-hidden">
          <h3 className="mb-3 text-sm font-medium text-gray-700">태그</h3>
          {isLoading ? (
            <div className="text-center text-sm text-gray-500">로딩 중...</div>
          ) : availableTags.length === 0 ? (
            <div className="text-center text-sm text-gray-500">
              태그가 없습니다
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => {
                  const isSelected = selectedTags.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className="transition-opacity hover:opacity-80"
                    >
                      <PlaceTag
                        name={tag.name}
                        type="tag"
                        className={cn([
                          "transition-all",
                          !isSelected && "opacity-50",
                        ])}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 액션 버튼들 */}
        <div className="flex flex-shrink-0 gap-3">
          <button
            onClick={handleReset}
            className="flex-1 rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            초기화
          </button>
          <button
            onClick={handleApply}
            className="flex-1 rounded-lg bg-blue-600 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
}

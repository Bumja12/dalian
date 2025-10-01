import { create } from "zustand";

import { useMapStore } from "./mapStore";

export interface Tag {
  id: number;
  name: string;
}

interface FilterState {
  isOpen: boolean;
  selectedCategories: string[];
  selectedTags: number[];
  availableTags: Tag[];

  // Actions
  openModal: () => void;
  closeModal: () => void;
  toggleCategory: (category: string) => void;
  toggleTag: (tagId: number) => void;
  setAvailableTags: (tags: Tag[]) => void;
  resetFilters: () => void;
  applyFilters: () => void;

  // Computed
  hasActiveFilters: () => boolean;
  getSelectedTagNames: () => string[];
  getSelectedTagIds: () => number[];
}

const CATEGORIES = ["식당", "카페", "여행지", "숙소", "쇼핑"];

export const useFilterModalStore = create<FilterState>((set, get) => ({
  isOpen: false,
  selectedCategories: [],
  selectedTags: [],
  availableTags: [],

  openModal: () => {
    // 필터 모달 열 때 선택된 장소 초기화
    useMapStore.getState().setSelectedPlace(null);
    set({ isOpen: true });
  },

  closeModal: () => set({ isOpen: false }),

  toggleCategory: (category: string) =>
    set(state => {
      if (!CATEGORIES.includes(category)) return state;

      const isSelected = state.selectedCategories.includes(category);
      const newSelectedCategories = isSelected
        ? state.selectedCategories.filter(c => c !== category)
        : [...state.selectedCategories, category];

      return { selectedCategories: newSelectedCategories };
    }),

  toggleTag: (tagId: number) =>
    set(state => {
      const isSelected = state.selectedTags.includes(tagId);
      const newSelectedTags = isSelected
        ? state.selectedTags.filter(id => id !== tagId)
        : [...state.selectedTags, tagId];

      return { selectedTags: newSelectedTags };
    }),

  setAvailableTags: (tags: Tag[]) => set({ availableTags: tags }),

  resetFilters: () => set({ selectedCategories: [], selectedTags: [] }),

  applyFilters: () => {
    // 필터 적용 - 선택된 장소는 HomePageClient에서 자동으로 처리됨
    set({ isOpen: false });
  },

  hasActiveFilters: () => {
    const { selectedCategories, selectedTags } = get();
    return selectedCategories.length > 0 || selectedTags.length > 0;
  },

  getSelectedTagNames: () => {
    const { selectedTags, availableTags } = get();
    return availableTags
      .filter(tag => selectedTags.includes(tag.id))
      .map(tag => tag.name);
  },

  getSelectedTagIds: () => {
    return get().selectedTags;
  },
}));

// 카테고리 목록 export
export { CATEGORIES };

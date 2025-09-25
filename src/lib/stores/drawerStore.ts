import { create } from "zustand";

import { useMapStore } from "./mapStore";

interface DrawerState {
  snapIndex: number;
  snapToFunction: ((snap: number) => void) | null;

  setSnapIndex: (index: number) => void;
  setSnapToFunction: (fn: ((snap: number) => void) | null) => void;
  snapTo: (snap: number) => void;
  openToMiddle: () => void;
  openToFull: () => void;

  getIsOpen: () => boolean;
}

export const useDrawerStore = create<DrawerState>((set, get) => ({
  snapIndex: 1,
  snapToFunction: null,

  setSnapIndex: index => set({ snapIndex: index }),

  setSnapToFunction: fn => set({ snapToFunction: fn }),

  snapTo: snap => {
    const { snapToFunction } = get();
    if (snapToFunction) {
      snapToFunction(snap);
    }
  },

  openToMiddle: () => {
    const { snapToFunction } = get();
    if (snapToFunction) {
      snapToFunction(1);
    }
  },

  openToFull: () => {
    const { snapToFunction } = get();
    if (snapToFunction) {
      snapToFunction(2);
    }
  },

  getIsOpen: () => {
    const mapState = useMapStore.getState();
    return mapState.selectedPlace !== null;
  },
}));

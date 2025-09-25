export interface BaseResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export enum PlaceCategory {
  "식당",
  "카페",
  "호텔",
  "여행지",
  "쇼핑",
  "기타",
}

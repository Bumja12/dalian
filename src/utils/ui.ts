import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스를 병합하는 유틸리티 함수
 * clsx와 tailwind-merge를 조합하여 조건부 클래스와 중복 제거를 동시에 처리
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 문자열 앞뒤 공백 제거 및 여러 공백을 하나로 정리
 */
export function normalizeString(str: string): string {
  return str.trim().replace(/\s+/g, " ");
}

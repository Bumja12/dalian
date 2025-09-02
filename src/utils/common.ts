/**
 * 지연 실행 함수 (debounce)
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 깊은 복사
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T;
  if (typeof obj === "object") {
    const clonedObj = {} as T;
    Object.keys(obj).forEach(key => {
      clonedObj[key as keyof T] = deepClone(obj[key as keyof T]);
    });
    return clonedObj;
  }
  return obj;
}

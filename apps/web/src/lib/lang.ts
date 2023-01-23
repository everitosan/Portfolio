import type { Lang } from "types/lang"

export const DEFAULT_LANG = "en"

export const detectLang = (): Lang => {
  // This function shopuld be called only when onMount is waranted 
  const userLang = navigator?.language || "en-US";
  return userLang.split("-")[0]
}
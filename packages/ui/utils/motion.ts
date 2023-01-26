// This function should be called only when onMount is waranted
export const reducedMotion = ():boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
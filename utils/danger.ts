/**
 * Force type casting by `as<SomeType>(thing)` instead of `thing as unknown as SomeType`.
 *
 * ❗❗❗ ONLY USE THIS WHEN NECESSARY ❗❗❗
 */
export const as = <T = any>(value: any) => {
  return value as T;
};

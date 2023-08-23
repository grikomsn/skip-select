/**
 * Utility function to get formatted USD string.
 *
 * @example
 * ```ts
 * const value = 52456;
 * const formatted = formatUsd(value); // "$52,456"
 * ```
 */
export const formatUsd = (value: number | bigint) => {
  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  });
  return formatter.format(value);
};

/**
 * Utility function to get formatted "BMK" string. (billion, million, thousand)
 *
 * @example
 * ```ts
 * const billion = 1_000_000_000;
 * console.log(formatBmk(billion)); // "1B"
 *
 * const million = 1_500_000;
 * console.log(formatBmk(million, 2)); // "1.50M"
 * ```
 *
 * @see https://stackoverflow.com/a/36734774/4273667
 */
export const formatBmk = (value: string | number, fixed = 0) => {
  const abs = Math.abs(Number(value));
  if (abs >= 1.0e9) {
    return `${(abs / 1.0e9).toFixed(fixed)}B`;
  }
  if (abs >= 1.0e6) {
    return `${(abs / 1.0e6).toFixed(fixed)}M`;
  }
  if (abs >= 1.0e3) {
    return `${(abs / 1.0e3).toFixed(fixed)}K`;
  }
  return abs;
};

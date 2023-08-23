/**
 * Utility function to throw (or {@link raise}) an error with assertion,
 * useful for directly escape invalid values.
 *
 * @example
 * ```ts
 * // before
 * const thing = foo?.bar?.baz;         // thing: string | undefined
 * if (!thing) throw new Error("thing is undefined");
 * typeof thing === "string";           // thing: string
 *
 * // after
 * const thing = foo?.bar?.baz ?? raise("thing is undefined"); // thing: string
 * ```
 */
export const raise = (err?: string, opts?: ErrorOptions): never => {
  throw new Error(err, opts);
};

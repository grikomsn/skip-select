declare namespace NodeJS {
  interface ProcessEnv {
    readonly APP_URL?: string;
  }
}

/**
 * Shorthand for `T | undefined`.
 */
declare type Maybe<T> = T | undefined;

/**
 * Omit `children` key from given type, commonly used on extending components.
 */
declare type OmitChildren<T> = Omit<T, "children">;

/**
 * @see https://www.totaltypescript.com/concepts/the-prettify-helper
 */
declare type Prettify<T> = { [P in keyof T]: T[P] };

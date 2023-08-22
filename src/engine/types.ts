/**
 * @module types
 * @description
 * This module contains type definitions used across the engine.
 *
 */

/**
 * A type that can be null or undefined.
 * @typedef {T | null | undefined} Maybe
 * @template T
 * @example
 * const foo: Maybe<number> = 1;
 * const bar: Maybe<number> = null;
 * const baz: Maybe<number> = undefined;
 */
export type Maybe<T> = T | null | undefined;
/**
 * A color in RGBA format.
 * @typedef {Array<number>} Color
 * @example
 * const red: Color = [1, 0, 0, 1];
 * const green: Color = [0, 1, 0, 1];
 * const blue: Color = [0, 0, 1, 1];
 * const purple: Color = [1, 0, 1, 1];
 */
export type Color = [number, number, number, number];

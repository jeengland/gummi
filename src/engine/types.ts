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
export type Color = [red: number, green: number, blue: number, alpha: number];

/**
 * An enum representing the color channels.
 * @typedef {number} ColorChannel
 * @example
 */
export enum ColorChannel {
  Red = 0,
  Green = 1,
  Blue = 2,
  Alpha = 3,
}

/**
 * Array of 4 numbers representing a viewport.
 * - [x, y, width, height]
 * - x and y represent origin of viewport
 * @typedef {Array<number>} ViewportArray
 * @example
 * const viewport: viewportArray = [0, 0, 800, 600];
 * // viewport is now an array representing a viewport with origin
 * // in the bottom left and size 800x600
 */
export type ViewportArray = [
  x: number,
  y: number,
  width: number,
  height: number,
];

/**
 * An enum representing the viewport array.
 * @typedef {number} Viewport
 */
export enum Viewport {
  X = 0,
  Y = 1,
  Width = 2,
  Height = 3,
}

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

/** An enum mapping readable names onto js keycodes
 * @typedef {number} Key
 */
export enum Key {
  // Util Keys
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  Shift = 16,
  Ctrl = 17,
  Alt = 18,
  PauseBreak = 19,
  CapsLock = 20,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,

  // Arrow Keys
  Left = 37,
  Up = 38,
  Right = 39,
  Down = 40,

  // Insert/Delete
  Insert = 45,
  Delete = 46,

  // Numbers
  Zero = 48,
  One = 49,
  Two = 50,
  Three = 51,
  Four = 52,
  Five = 53,
  Six = 54,
  Seven = 55,
  Eight = 56,
  Nine = 57,

  // Letters
  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  G = 71,
  H = 72,
  I = 73,
  J = 74,
  K = 75,
  L = 76,
  M = 77,
  N = 78,
  O = 79,
  P = 80,
  Q = 81,
  R = 82,
  S = 83,
  T = 84,
  U = 85,
  V = 86,
  W = 87,
  X = 88,
  Y = 89,
  Z = 90,

  // Windows Keys
  LeftWindowKey = 91,
  RightWindowKey = 92,
  SelectKey = 93,

  // Numpad
  Numpad0 = 96,
  Numpad1 = 97,
  Numpad2 = 98,
  Numpad3 = 99,
  Numpad4 = 100,
  Numpad5 = 101,
  Numpad6 = 102,
  Numpad7 = 103,
  Numpad8 = 104,
  Numpad9 = 105,
  Multiply = 106,
  Add = 107,
  Subtract = 109,
  DecimalPoint = 110,
  Divide = 111,

  // Function Keys
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,

  // NumLock/ScrollLock
  NumLock = 144,
  ScrollLock = 145,

  // Punctuation
  SemiColon = 186,
  EqualSign = 187,
  Comma = 188,
  Dash = 189,
  Period = 190,
  ForwardSlash = 191,
  GraveAccent = 192,
  OpenBracket = 219,
  BackSlash = 220,
  CloseBracket = 221,
  SingleQuote = 222,
}

/**
 * Enum representing Mac names for specific keys
 * @typedef {number} MacKey
 */
export enum MacKey {
  Delete = 8,
  Return = 13,
  OptionKey = 18,
  LeftCommandKey = 91,
  RightCommandKey = 93,
}

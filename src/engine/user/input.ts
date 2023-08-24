/**
 * Module to handle user input
 * @module input
 */

/**
 * The last key code available for use.
 * @type {number}
 * @private
 * @constant
 */
const LAST_KEY = 222;

/**
 * Array to hold the previous state of the keys.
 * @type {boolean[]}
 * @private
 */
const _keyPreviousState: boolean[] = [];
/**
 * Array to hold the current state of the keys.
 * @type {boolean[]}
 * @private
 */
const _isKeyDown: boolean[] = [];
/**
 * Array that indicates if a key wasn't pressed in the previous frame
 * but is pressed in the current frame.
 * @type {boolean[]}
 * @private
 */
const _isKeyPressed: boolean[] = [];

/**
 * Handles the key down event.
 * @param {KeyboardEvent} event - The key down event.
 * @returns {void}
 * @private
 */
function _onKeyDown(event: KeyboardEvent) {
  _isKeyDown[event.keyCode] = true;
}

/**
 * Handles the key up event.
 * @param {KeyboardEvent} event - The key up event.
 * @returns {void}
 * @private
 */
function _onKeyUp(event: KeyboardEvent) {
  _isKeyDown[event.keyCode] = false;
}

/**
 * Initializes the input module by setting up the key arrays and
 * adding the event listeners.
 * @returns {void}
 * @example
 * initInput();
 * // input is now available
 */
export function initInput(): void {
  for (let i = 0; i < LAST_KEY; i++) {
    _isKeyDown[i] = false;
    _keyPreviousState[i] = false;
    _isKeyPressed[i] = false;
  }

  window.addEventListener('keydown', _onKeyDown);
  window.addEventListener('keyup', _onKeyUp);
}

/**
 * Updates the input module by setting the previous state of the keys
 * and checking if a key was pressed.
 * @returns {void}
 * @example
 * updateInput();
 * // input is now updated
 */
export function updateInput(): void {
  for (let i = 0; i < LAST_KEY; i++) {
    _isKeyPressed[i] = !_keyPreviousState[i] && _isKeyDown[i];
    _keyPreviousState[i] = _isKeyDown[i];
  }
}

/**
 * Public function to check if a key is down.
 * This function will return true as long as the key is pressed.
 * @param {number} keyCode - The key code to check.
 * @returns {boolean} - True if the key is pressed, false otherwise.
 * @example
 * isKeyPressed(KEYS.SPACE);
 * // returns true if the space bar is pressed
 * // returns false otherwise
 */
export function isKeyDown(keyCode: number): boolean {
  return _isKeyDown[keyCode];
}

/**
 * Public function to check if a key was pressed.
 * This function will only return true once per press.
 * @param {number} keyCode - The key code to check.
 * @returns {boolean} - True if the key was pressed, false otherwise.
 * @example
 * isKeyPressed(KEYS.SPACE);
 * // returns true if the space bar was pressed
 * // returns false otherwise
 * // will return false until the key is released and pressed again
 */
export function isKeyPressed(keyCode: number): boolean {
  return _isKeyPressed[keyCode];
}

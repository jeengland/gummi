/**
 * Module for the game loop management.
 * @module loop
 */
import {LoopError} from '../helpers/error';
import Scene from '../renderer/scene';
import {updateInput} from '../user/input';
import {waitOnRequests} from './resourceMap';

// Constants
/**
 * The number of updates per second.
 * This is used to determine how much time has passed between updates.
 * This is also used to determine how many updates to run if the scene
 * falls behind.
 * @constant
 * @type {number}
 * @private
 */
const UPDATES_PER_SECOND = 60;
/**
 * The number of milliseconds per update.
 * This is calculated by dividing 1000 by the number of updates per second.
 * This is used to determine how much time has passed between updates.
 * This is also used to determine how many updates to run if the scene
 * falls behind.
 * @constant
 * @type {number}
 * @private
 */
const MILLISECONDS_PER_UPDATE = 1000 / UPDATES_PER_SECOND;

// Temporary type until scene class is implemented
/**
 * The scene type.
 * @typedef {Object} Scene
 * @property {function} init - The function to initialize the scene.
 * @property {function} update - The function to update the scene.
 * @property {function} draw - The function to draw the scene.
 */

// Internal variables
/**
 * The scene to run the game loop with.
 * @type {Scene}
 * @private
 */
let _scene: Scene | null;
/**
 * The id of the current frame.
 * @type {number}
 * @private
 */
let _frameId = -1;

/**
 * Indicates if the game loop is running.
 * @type {boolean}
 * @private
 */
let _running = false;
/**
 * The previous time in milliseconds.
 * @type {number}
 * @private
 */
let _previousTime: number;
/**
 * The lag time in milliseconds.
 * @type {number}
 * @private
 */
let _lagTime: number;

/**
 * The main loop step.
 * @throws {LoopError} - If the scene has not been initialized.
 * @returns {void}
 * @example
 * loopStep();
 * // scene is now updated and drawn
 * // loopStep() is called again after 1/60th of a second
 * // if the scene falls behind, it will update multiple times
 * // before drawing again
 */
function loopStep() {
  if (!_scene) {
    throw new LoopError('Scene not initialized');
  }

  if (_running) {
    _frameId = requestAnimationFrame(loopStep);

    _scene.draw();

    const currentTime = performance.now();
    const elapsedTime = currentTime - _previousTime;

    _previousTime = currentTime;
    _lagTime += elapsedTime;

    while (_lagTime >= MILLISECONDS_PER_UPDATE) {
      updateInput();
      _scene.update();
      _lagTime -= MILLISECONDS_PER_UPDATE;
    }
  }
}

/**
 * Starts the game loop.
 * @param {Scene} scene - The scene to start the game loop with.
 * @throws {LoopError} - If the scene is already running.
 * @returns {void}
 * @example
 * startLoop(scene);
 * // game loop is now running
 * // scene is updated and drawn 60 times per second
 */
export async function startLoop(scene: Scene) {
  if (_running) {
    throw new LoopError('Scene already running');
  }

  _scene = scene;
  _scene.load();

  await waitOnRequests();

  _scene.init();
  _previousTime = performance.now();
  _lagTime = 0.0;
  _running = true;
  _frameId = requestAnimationFrame(loopStep);
}

/**
 * Stops the game loop.
 * @returns {void}
 * @example
 * stopLoop();
 * // game loop is now stopped
 */
export function stopLoop() {
  _running = false;
  cancelAnimationFrame(_frameId);
}

/**
 * Cleans up the game loop.
 * @throws {LoopError} - If the scene has not been initialized.
 * @returns {void}
 * @example
 * cleanupLoop();
 * // game loop is now stopped
 * // scene is unloaded
 * // scene is now null
 */
export function cleanupLoop() {
  if (!_scene) {
    throw new LoopError('Scene not initialized');
  }

  stopLoop();
  _scene.unload();
  _scene = null;
}

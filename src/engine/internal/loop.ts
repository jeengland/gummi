/**
 * Module for the game loop management.
 * @module loop
 */
import {LoopError} from '../helpers/error';

// Constants
const UPDATES_PER_SECOND = 60;
const MILLISECONDS_PER_UPDATE = 1000 / UPDATES_PER_SECOND;

// Temporary type until scene class is implemented
type Scene = {
  init: () => void;
  update: () => void;
  draw: () => void;
};

// Internal variables
let _scene: Scene;
let _frameId = -1;

let _running = false;
let _previousTime: number;
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
export function startLoop(scene: Scene) {
  if (_running) {
    throw new LoopError('Scene already running');
  }

  _scene = scene;
  _scene.init();

  _previousTime = performance.now();
  _lagTime = 0.0;
  _running = true;
  _frameId = requestAnimationFrame(loopStep);
}

/**
 * Stops the game loop.
 * @throws {LoopError} - If the scene is not running.
 * @returns {void}
 * @example
 * stopLoop();
 * // game loop is now stopped
 */
export function stopLoop() {
  if (!_running) {
    throw new LoopError('Scene not running');
  }

  _running = false;
  cancelAnimationFrame(_frameId);
}

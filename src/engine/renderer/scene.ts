/**
 * Module for scene management.
 * @module scene
 */

import {cleanup} from '..';
import {SceneError} from '../helpers/error';
import {startLoop, stopLoop} from '../internal/loop';

/**
 * The base class for scenes.
 * @abstract
 * @class
 * @memberof module:scene
 */
export default class Scene {
  /**
   * Creates an instance of Scene.
   * @constructor
   * @throws {SceneError} - If the constructor is called directly.
   * }
   */
  constructor() {
    if (this.constructor === Scene) {
      throw new SceneError('Cannot instantiate an abstract class');
    }
  }

  /**
   * Starts the scene.
   * @async
   * @returns {void}
   * @example
   * const scene = new MyScene();
   * await scene.start();
   * // scene is now running
   */
  async start() {
    await startLoop(this);
  }

  /**
   * Prepares the engine for the next scene by stopping the loop and unloading the current scene.
   * @returns {void}
   * @example
   * const scene = new MyScene();
   * scene.next();
   * // scene is now unloaded
   * // engine is now ready for the next scene
   */
  next() {
    stopLoop();
    this.unload();
  }

  /**
   * Stops the scene and cleans up the engine.
   * @returns {void}
   * @example
   * const scene = new MyScene();
   * scene.stop();
   * // scene is now unloaded
   * // engine is now cleaned up
   * @see {@link module:engine.cleanup | cleanup}
   */
  stop() {
    stopLoop();
    this.unload();
    cleanup();
  }

  // abstract functions
  /**
   * Initializes the scene.
   * @abstract
   * @throws {SceneError} - If the function is not implemented.
   * @returns {void}
   */
  init() {
    throw new SceneError('init() not implemented');
  }

  /**
   * Loads the scene.
   * @abstract
   * @throws {SceneError} - If the function is not implemented.
   * @returns {void}
   */
  load() {
    throw new SceneError('load() not implemented');
  }

  /**
   * Unloads the scene.
   * @abstract
   * @throws {SceneError} - If the function is not implemented.
   * @returns {void}
   */
  unload() {
    throw new SceneError('unload() not implemented');
  }

  /**
   * Draws the scene.
   * @abstract
   * @throws {SceneError} - If the function is not implemented.
   * @returns {void}
   */
  draw() {
    throw new SceneError('draw() not implemented');
  }

  /**
   * Updates the scene.
   * @abstract
   * @throws {SceneError} - If the function is not implemented.
   * @returns {void}
   */
  update() {
    throw new SceneError('update() not implemented');
  }
}

/**
 * Module for parsing scene files into a usable format for the engine.
 * @module sceneParser
 */

import {vec2} from 'gl-matrix';
import {Camera, Renderable} from '../../engine';
import {ColorChannel, Viewport} from '../../engine/types';

/**
 * Gets all elements of a given tag from an xml document.
 * @private
 * @param {Document} xml - The xml document to parse.
 * @param {string} tag - The tag to get elements of.
 * @returns {Element[]} - The elements of the given tag.
 * @throws {Error} - If no elements of the given tag are found.
 * @example
 * const elements = getElements(xml, 'Camera');
 * // elements is now an array of Camera elements
 */
function getElements(xml: Document, tag: string): Element[] {
  const elements = xml.getElementsByTagName(tag);
  if (elements.length === 0) {
    throw new Error(`No ${tag} elements found`);
  }
  return Array.from(elements);
}

/**
 * Parses a scene file into a usable format for the engine.
 * @class
 */
export default class SceneFileParser {
  private _xml: Document;

  /**
   * Creates a scene file parser.
   * @constructor
   * @param {Document} xml - The xml document to parse.
   * @example
   * const parser = new SceneFileParser(xml);
   * // parser is now a scene file parser
   * // xml is the xml document to parse
   * // parser can now parse the xml document
   * // and return the camera and renderables
   * // from the scene file
   */
  constructor(xml: Document) {
    this._xml = xml;
  }

  /**
   * Parses the scene file.
   * @returns {Camera | null} - The camera from the scene file.
   * @example
   * const camera = parser.parseCamera();
   * // camera is now the camera from the scene file
   */
  parseCamera(): Camera {
    const camEls = getElements(this._xml, 'Camera');
    if (camEls.length > 1) {
      throw new Error('More than one Camera element found');
    }

    const camEl = camEls[0];

    if (!camEl) {
      throw new Error('No Camera element found');
    }

    const cx = Number(camEl.getAttribute('CenterX'));
    const cy = Number(camEl.getAttribute('CenterY'));
    const w = Number(camEl.getAttribute('Width'));
    const viewport = camEl.getAttribute('Viewport')?.split(' ');
    const bgColor = camEl.getAttribute('BgColor')?.split(' ');

    // check if attributes are not undefined
    // do not just check if they are truthy
    // because 0 is a valid value for some attributes
    if (
      cx === undefined ||
      cy === undefined ||
      w === undefined ||
      !viewport ||
      !bgColor
    ) {
      throw new Error('Camera element is missing attributes');
    }

    // extract the viewport attributes and convert to numbers
    const vx = Number(viewport[Viewport.X]);
    const vy = Number(viewport[Viewport.Y]);
    const vw = Number(viewport[Viewport.Width]);
    const vh = Number(viewport[Viewport.Height]);
    // if any of the viewport attributes are NaN, throw an error
    if (isNaN(vx) || isNaN(vy) || isNaN(vw) || isNaN(vh)) {
      throw new Error('Camera element has invalid viewport attributes');
    }

    // extract the background color attributes and convert to numbers
    const r = Number(bgColor[ColorChannel.Red]);
    const g = Number(bgColor[ColorChannel.Green]);
    const b = Number(bgColor[ColorChannel.Blue]);
    const a = Number(bgColor[ColorChannel.Alpha]);
    // if any of the background color attributes are NaN, throw an error
    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
      throw new Error('Camera element has invalid background color attributes');
    }

    // create the camera
    const camera = new Camera(vec2.fromValues(cx, cy), w, [vx, vy, vw, vh]);
    camera.setBackgroundColor([r, g, b, a]);

    return camera;
  }

  /**
   * Parses the scene file.
   * @returns {Renderable[]} - The renderables from the scene file.
   * @example
   * const renderables = parser.parseRenderables();
   * // renderables is now the renderables from the scene file
   */
  parseRenderables(): Renderable[] {
    const renderableEls = getElements(this._xml, 'Square');

    return renderableEls.map(renderableEl => {
      const x = Number(renderableEl.getAttribute('PosX'));
      const y = Number(renderableEl.getAttribute('PosY'));
      const w = Number(renderableEl.getAttribute('Width'));
      const h = Number(renderableEl.getAttribute('Height'));
      const ro = Number(renderableEl.getAttribute('Rotation'));
      const color = renderableEl.getAttribute('Color')?.split(' ');

      // check if attributes are not undefined
      // do not just check if they are truthy
      // because 0 is a valid value for some attributes
      if (
        x === undefined ||
        y === undefined ||
        w === undefined ||
        h === undefined ||
        ro === undefined ||
        !color
      ) {
        throw new Error('Renderable element is missing attributes');
      }

      // extract the color attributes and convert to numbers
      const r = Number(color[ColorChannel.Red]);
      const g = Number(color[ColorChannel.Green]);
      const b = Number(color[ColorChannel.Blue]);
      const a = Number(color[ColorChannel.Alpha]);
      // if any of the color attributes are NaN, throw an error
      if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
        throw new Error('Renderable element has invalid color attributes');
      }

      // create the renderable
      const renderable = new Renderable();
      renderable.setColor([r, g, b, a]);
      renderable.getXform().setPosition(x, y);
      renderable.getXform().setRotationDegrees(ro);
      renderable.getXform().setSize(w, h);

      return renderable;
    });
  }
}

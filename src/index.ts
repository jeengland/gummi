import {RenderError} from './helpers/error.js';
import {isCanvasElement} from './helpers/typeguards.js';

const getCanvasContext = (): WebGL2RenderingContext => {
  const canvas = document.getElementById('gummiCanvas');

  if (!canvas) {
    throw new RenderError('Could not find entry point');
  }

  if (!isCanvasElement(canvas)) {
    throw new RenderError('Entry point is not a canvas');
  }

  const gl = canvas.getContext('webgl2');

  if (!gl) {
    throw new RenderError('Could not get WebGL2 context');
  }

  return gl;
};

const gl = getCanvasContext();

gl.clearColor(0.5, 0.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

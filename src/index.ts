import {
  clearCanvas,
  getGl,
  initWebGL,
  setClearColor,
} from './renderer/renderer.js';
import {activateShader, initShaders} from './renderer/shaders.js';
import {initVertexBuffer} from './renderer/vertexBuffer.js';

window.onload = () => {
  initWebGL('gummiCanvas');
  setClearColor(0.5, 0.0, 1.0, 1.0);
  initVertexBuffer();
  initShaders('VertexShader', 'FragmentShader');
  clearCanvas();

  activateShader();

  const gl = getGl();

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

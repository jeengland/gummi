import {clearCanvas, initWebGL, setClearColor} from './renderer/renderer.js';

window.onload = () => {
  initWebGL('gummiCanvas');
  setClearColor(0.5, 0.0, 1.0, 1.0);
  clearCanvas();
};

import {init, clearCanvas, drawSquare} from '../engine/renderer/renderer.js';

class Client {
  constructor(canvasId: string) {
    init(canvasId);
    clearCanvas(0.5, 0.0, 1.0, 1.0);
    drawSquare([1.0, 0.0, 0.0, 1.0]);
  }
}

window.onload = () => {
  new Client('gummiCanvas');
};

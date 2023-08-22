import {init, clearCanvas, drawSquare} from '../engine/renderer/renderer.js';

class Client {
  constructor(canvasId: string) {
    init(canvasId);
    clearCanvas(0.5, 0.0, 1.0, 1.0);
    drawSquare();
  }
}

window.onload = () => {
  new Client('gummiCanvas');
};

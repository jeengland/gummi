import {init, clearCanvas, Renderable} from '../engine/index';

class Client {
  private _whiteSq: Renderable;
  private _redSq: Renderable;

  constructor(canvasId: string) {
    init(canvasId);

    this._whiteSq = new Renderable();
    this._whiteSq.setColor([1, 1, 1, 1]);
    this._redSq = new Renderable();
    this._redSq.setColor([1, 0, 0, 1]);

    clearCanvas([0.5, 0, 0.8, 1]);

    this._whiteSq.draw();
    this._redSq.draw();
  }
}

window.onload = () => {
  new Client('gummiCanvas');
};

import {vec2} from 'gl-matrix';
import {init, clearCanvas, Renderable, Camera} from '../engine/index';
import {startLoop} from '../engine/internal/loop';

class Client {
  private _whiteSq: Renderable | null;
  private _redSq: Renderable | null;
  private _camera: Camera | null;

  constructor() {
    this._whiteSq = null;
    this._redSq = null;
    this._camera = null;
  }

  // using the following function to emulate how scene class will eventually work
  // using engine internals for now but this is not ideal
  init() {
    this._camera = new Camera(vec2.fromValues(20, 60), 20, [20, 40, 600, 300]);
    this._camera.setBackgroundColor([0.4, 0.1, 0.7, 1]);

    this._whiteSq = new Renderable();
    this._whiteSq.setColor([1, 1, 1, 1]);

    this._redSq = new Renderable();
    this._redSq.setColor([1, 0, 0, 1]);

    this._whiteSq.getXform().setPosition(20, 60);
    this._whiteSq.getXform().setRotationRadians(0.2);
    this._whiteSq.getXform().setSize(5, 5);

    this._redSq.getXform().setPosition(20, 60);
    this._redSq.getXform().setSize(2, 2);
  }

  draw() {
    clearCanvas([0.9, 0.9, 0.9, 1]);
    this._camera!.setViewAndCameraMatrix();
    this._whiteSq!.draw(this._camera!);
    this._redSq!.draw(this._camera!);
  }

  update() {
    const whiteXform = this._whiteSq!.getXform();
    const deltaX = 0.05;

    if (whiteXform.getPositionX() > 30) {
      whiteXform.setPosition(10, 60);
    }

    whiteXform.incrementPositionX(deltaX);
    whiteXform.incrementRotationDegrees(1);

    const redXform = this._redSq!.getXform();

    if (redXform.getWidth() > 5) {
      redXform.setSize(2, 2);
    }

    redXform.incrementSize(0.05);
  }
}

window.onload = () => {
  // using internal engine functions for now
  // this is not ideal
  init('gummiCanvas');
  const client = new Client();

  startLoop(client);
};

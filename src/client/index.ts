import {vec2} from 'gl-matrix';
import {init, clearCanvas, Renderable, Camera} from '../engine/index';

class Client {
  private _blueSq: Renderable;
  private _redSq: Renderable;
  private _tLSq: Renderable;
  private _tRSq: Renderable;
  private _bLSq: Renderable;
  private _bRSq: Renderable;
  private _camera: Camera;

  constructor(canvasId: string) {
    init(canvasId);

    this._camera = new Camera(vec2.fromValues(20, 60), 20, [20, 40, 600, 300]);
    this._camera.setBackgroundColor([0.4, 0.1, 0.7, 1]);

    this._blueSq = new Renderable();
    this._blueSq.setColor([0.25, 0.25, 0.95, 1]);
    this._redSq = new Renderable();
    this._redSq.setColor([1, 0.25, 0.25, 1]);

    this._tLSq = new Renderable();
    this._tLSq.setColor([0.1, 0.9, 0.1, 1]);

    this._tRSq = new Renderable();
    this._tRSq.setColor([0.9, 0.1, 0.1, 1]);

    this._bLSq = new Renderable();
    this._bLSq.setColor([0.1, 0.1, 0.9, 1]);

    this._bRSq = new Renderable();
    this._bRSq.setColor([0.1, 0.1, 0.1, 1]);

    clearCanvas([0.5, 0, 0.8, 1]);

    this._camera.setViewAndCameraMatrix();

    this._blueSq.getXform().setPosition(20, 60);
    this._blueSq.getXform().setRotationDegrees(45);
    this._blueSq.getXform().setSize(5, 5);
    this._blueSq.draw(this._camera);

    this._redSq.getXform().setPosition(20, 60);
    this._redSq.getXform().setSize(2, 2);
    this._redSq.draw(this._camera);

    this._tRSq.getXform().setPosition(10, 65);
    this._tRSq.draw(this._camera);

    this._tLSq.getXform().setPosition(30, 65);
    this._tLSq.draw(this._camera);

    this._bRSq.getXform().setPosition(30, 55);
    this._bRSq.draw(this._camera);

    this._bLSq.getXform().setPosition(10, 55);
    this._bLSq.draw(this._camera);
  }
}

window.onload = () => {
  new Client('gummiCanvas');
};

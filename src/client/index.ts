import {vec2} from 'gl-matrix';
import {
  audio,
  Camera,
  clearCanvas,
  init,
  input,
  Renderable,
  Scene,
} from '../engine/index';
import {Key} from '../engine/types';
import NextLevel from './scenes/nextLevel';

// function getRandomColor(): Color {
//   const r = Math.random();
//   const g = Math.random();
//   const b = Math.random();
//   return [r, g, b, 1];
// }

export class Client extends Scene {
  private _bgm: string;
  private _cue: string;
  private _camera: Camera | null;
  private _hero: Renderable | null;
  private _support: Renderable | null;

  constructor() {
    super();

    this._bgm = 'src/client/assets/audio/bg_clip.mp3';
    this._cue = 'src/client/assets/audio/my_game_cue.wav';
    this._camera = null;
    this._hero = null;
    this._support = null;
  }

  // using the following function to emulate how scene class will eventually work
  // using engine internals for now but this is not ideal
  init() {
    this._camera = new Camera(vec2.fromValues(20, 60), 20, [20, 40, 600, 300]);
    this._camera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this._support = new Renderable();
    this._support.setColor([0.8, 0.2, 0.2, 1]);
    this._support.getXform().setPosition(20, 60);
    this._support.getXform().setSize(5, 5);

    this._hero = new Renderable();
    this._hero.setColor([0.2, 0.8, 0.2, 1]);
    this._hero.getXform().setPosition(20, 60);
    this._hero.getXform().setSize(2, 2);

    audio.playBgm(this._bgm, 1);
  }

  draw() {
    clearCanvas([0.9, 0.9, 0.9, 1]);
    this._camera!.setViewAndCameraMatrix();

    this._hero?.draw(this._camera!);
    this._support?.draw(this._camera!);
  }

  update() {
    const delta = 0.05;
    const heroXform = this._hero!.getXform();

    if (input.isKeyDown(Key.Right)) {
      heroXform.incrementPositionX(delta);

      if (heroXform.getPositionX() > 30) {
        heroXform.setPosition(12, 60);
      }
    }

    if (input.isKeyDown(Key.Left)) {
      heroXform.incrementPositionX(-delta);

      if (heroXform.getPositionX() < 11) {
        this.next();
      }
    }

    if (input.isKeyPressed(Key.Right) || input.isKeyPressed(Key.Left)) {
      audio.playCue(this._cue, 0.5);
    }

    if (input.isKeyPressed(Key.Q) || input.isKeyPressed(Key.Escape)) {
      this.stop();
    }
  }

  next(): void {
    super.next();

    const nextScene = new NextLevel();

    nextScene.start();
  }

  load() {
    audio.loadAudio(this._bgm);
    audio.loadAudio(this._cue);
  }

  unload() {
    audio.stopBgm();

    audio.unloadAudio(this._bgm);
    audio.unloadAudio(this._cue);
  }
}

window.onload = () => {
  init('gummiCanvas');
  const client = new Client();

  client.start();
};

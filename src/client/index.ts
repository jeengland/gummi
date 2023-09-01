import {vec2} from 'gl-matrix';
import {
  audio,
  Camera,
  clearCanvas,
  init,
  input,
  Renderable,
  Scene,
  texture,
  TextureRenderable,
} from '../engine/index';
import {Key} from '../engine/types';
import NextLevel from './scenes/nextLevel';

// function getRandomColor(): Color {
//   const r = Math.random();
//   const g = Math.random();
//   const b = Math.random();
//   return [r, g, b, 1];
// }

// constants
const PORTAL_SRC = 'src/client/assets/images/minion_portal.png';
const COLLECTOR_SRC = 'src/client/assets/images/minion_collector.png';
const BGM_SRC = 'src/client/assets/audio/bg_clip.mp3';
const CUE_SRC = 'src/client/assets/audio/my_game_cue.wav';

export class Client extends Scene {
  private _camera: Camera | null;
  private _hero: Renderable | null;
  private _support: Renderable | null;
  private _portal: TextureRenderable | null;
  private _collector: TextureRenderable | null;

  constructor() {
    super();

    this._portal = null;
    this._collector = null;
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
    this._hero.getXform().setSize(2, 3);

    this._portal = new TextureRenderable(PORTAL_SRC);
    this._portal.setColor([1, 0, 0, 0.2]);
    this._portal.getXform().setPosition(25, 60);
    this._portal.getXform().setSize(3, 3);

    this._collector = new TextureRenderable(COLLECTOR_SRC);
    this._collector.setColor([0, 0, 0, 0]);
    this._collector.getXform().setPosition(15, 60);
    this._collector.getXform().setSize(3, 3);

    audio.playBgm(BGM_SRC, 1);
  }

  draw() {
    clearCanvas([0.9, 0.9, 0.9, 1]);
    this._camera!.setViewAndCameraMatrix();

    this._hero?.draw(this._camera!);
    this._support?.draw(this._camera!);
    this._portal?.draw(this._camera!);
    this._collector?.draw(this._camera!);
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
      audio.playCue(CUE_SRC, 0.5);
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
    audio.loadAudio(BGM_SRC);
    audio.loadAudio(CUE_SRC);

    texture.loadTexture(PORTAL_SRC);
    texture.loadTexture(COLLECTOR_SRC);
  }

  unload() {
    audio.stopBgm();

    audio.unloadAudio(BGM_SRC);
    audio.unloadAudio(CUE_SRC);

    texture.unloadTexture(PORTAL_SRC);
    texture.unloadTexture(COLLECTOR_SRC);
  }
}

window.onload = () => {
  init('gummiCanvas');
  const client = new Client();

  client.start();
};

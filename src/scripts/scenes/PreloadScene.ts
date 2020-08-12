import { SCENES, TEXTURES } from '../constants';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.PRELOAD });
  }

  public preload() {
    this.load.image(TEXTURES.RING, 'assets/img/ring.png');
    this.load.image(TEXTURES.BALL, 'assets/img/ball.png');
    this.load.image(TEXTURES.WALL_HORIZONTAL, 'assets/img/wall-h.png');
    this.load.image(TEXTURES.WALL_VERTICAL, 'assets/img/wall-v.png');
    this.load.image(TEXTURES.BACKGROUND, 'assets/img/background.png');
  }

  public create() {
    this.scene.start(SCENES.MAIN);
  }
}

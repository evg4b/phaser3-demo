import { TEXTURES } from '../constants';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image(TEXTURES.RING, 'assets/img/ring.png');
    this.load.image(TEXTURES.BALL, 'assets/img/ball.png');
    this.load.image(TEXTURES.WALL_HORIZONTAL, 'assets/img/wall-h.png');
    this.load.image(TEXTURES.WALL_VERTICAL, 'assets/img/wall-v.png');
    this.load.image(TEXTURES.BACKGROUND, 'assets/img/background.png');
  }

  create() {
    this.scene.start('MainScene');
  }
}

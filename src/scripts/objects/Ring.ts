import { TEXTURES } from '../constants';

export class Ring extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TEXTURES.RING);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCircle(this.body.width / 2);
  }
}

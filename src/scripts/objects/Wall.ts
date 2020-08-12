import { TEXTURES } from '../constants';

export class Wall extends Phaser.Physics.Arcade.Sprite {
  public static HORIZONTAL: number = 1;
  public static VERTICAL: number = 2;
  private collisionCount = 5;

  constructor(scene: Phaser.Scene, x: number, y: number, direction: number = Wall.HORIZONTAL) {
    super(scene, x, y, direction === Wall.HORIZONTAL ? TEXTURES.WALL_HORIZONTAL : TEXTURES.WALL_VERTICAL);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.immovable = true;
    const wallWidth = 10;
    if (direction === Wall.HORIZONTAL) {
      this.setSize(scene.cameras.main.width - 100, wallWidth);
    } else {
      this.setSize(wallWidth, scene.cameras.main.height - 115);
    }
  }

  public collision() {
    if (this.collisionCount) {
      this.collisionCount--;
    } else {
      this.destroy();
    }
  }
}

export class Wall extends Phaser.Physics.Arcade.Sprite {
  public static Horizontal: number = 1;

  public static Vertical: number = 2;

  private collisionCount = 5;

  constructor(scene: Phaser.Scene, x: number, y: number, direction: number = Wall.Horizontal) {
    super(scene, x, y, 'wall1');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.immovable = true;
    if (direction === Wall.Horizontal) {
      this.setSize(scene.cameras.main.width - 100, 10);
    } else {
      this.setSize(10, scene.cameras.main.height - 100);
    }
  }

  collision() {
    if (this.collisionCount > 0) {
      this.collisionCount--;
    } else {
      this.destroy();
    }
  }
}

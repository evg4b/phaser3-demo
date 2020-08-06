export class Ring extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'green-ball');
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
}

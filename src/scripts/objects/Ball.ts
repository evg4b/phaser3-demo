export class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'ball');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBounce(1, 1);
    this.setCircle(this.body.width / 2);
  }

  public directTo(pointer: Phaser.Input.Pointer) {
    const angle = Phaser.Math.Angle.BetweenPoints(this.getCenter(), pointer);
    const targetVector = pointer.velocity.clone().scale(2).setAngle(angle);
    this.setVelocity(targetVector.x, targetVector.y);
  }
}

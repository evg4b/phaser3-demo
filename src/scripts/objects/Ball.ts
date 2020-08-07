export class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'ball');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBounce(1, 1);
    this.setCircle(this.body.width / 2);
  }

  public directFrom(pointer: Phaser.Input.Pointer) {
    const power = Phaser.Math.Distance.BetweenPoints(this.getCenter(), pointer);
    const angle = Phaser.Math.Angle.BetweenPoints(this.getCenter(), pointer);
    const targetVector = this.getCenter()
      .clone()
      .setAngle(angle)
      .negate()
      .scale(this.scene.cameras.main.width / (15 * power));
    this.setVelocity(targetVector.x, targetVector.y);
  }
}

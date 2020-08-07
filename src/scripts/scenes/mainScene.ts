import { Ring, Ball, Box, ScoreBoard, Wall } from '../objects';
import { Button } from '../objects/Button';

export class MainScene extends Phaser.Scene {
  private balls: Phaser.GameObjects.Group;
  private rings: Phaser.GameObjects.Group;
  private scoreBoard: ScoreBoard;
  private actionRectangle: Phaser.Geom.Rectangle;
  private score: number;
  private actionStarted = false;

  constructor() {
    super({ key: 'MainScene' });
  }

  public create() {
    const { centerX, centerY, width, height } = this.cameras.main;
    this.add.tileSprite(centerX, centerY, width, height, 'background');
    this.score = 0;
    this.actionStarted = false;
    this.scoreBoard = new ScoreBoard(this, this.score);
    const box = new Box(this);
    this.generateBalls(centerX, height);
    this.generateRings(width, height);
    new Button(this, width - 180, 20, 'Restart', () => this.scene.restart());
    this.input.on('pointerdown', this.pointerDownHandler, this);
    this.physics.add.collider(this.balls, this.balls);
    this.physics.add.collider(this.balls, box.getGroup(), (ball, wall) => (wall as Wall).collision());
    this.physics.add.overlap(this.balls, this.rings, (ball) => {
      this.incrementScore();
      ball.destroy();
    });
  }

  public update() {
    this.scoreBoard.update(this.score);
    Phaser.Actions.Call(this.balls.getChildren(), (x) => {
      if (!Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, (x as Ball).getBounds())) {
        (x as Ball).destroy();
      }
    }, this);

    if (!this.balls.getTotalUsed()) {
      this.scene.start('ScoreScene', { score: this.score });
    }
  }

  private pointerDownHandler = (pointer: Phaser.Input.Pointer) => {
    if (!this.actionStarted && Phaser.Geom.Rectangle.Contains(this.actionRectangle, pointer.x, pointer.y)) {
      this.actionStarted = true;
      Phaser.Actions.Call(this.balls.getChildren(), (x) => (x as Ball).directFrom(pointer), this);
    }
  };

  private generateRings(width: number, height: number) {
    this.rings = this.make.group({ classType: Ring, key: 'ring', quantity: 5 });
    const ringRect = new Phaser.Geom.Rectangle(100, 100, width - 400, height * (2 / 3));
    Phaser.Actions.RandomRectangle(this.rings.getChildren(), ringRect);
  }

  private generateBalls(centerX: number, height: number) {
    this.actionRectangle = new Phaser.Geom.Rectangle(centerX - 70, height - 170, 140, 100);
    this.add.graphics({
      fillStyle: { color: 0x00000, alpha: 0.1 },
    }).fillRectShape(this.actionRectangle);

    this.balls = this.make.group({ classType: Ball, key: 'ball', frameQuantity: 20 });
    Phaser.Actions.RandomRectangle(this.balls.getChildren(), this.actionRectangle);
  }

  private incrementScore() {
    this.score += 100;
  }
}

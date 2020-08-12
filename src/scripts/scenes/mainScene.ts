import { TEXTURES } from '../constants';
import { Ring, Ball, Box, ScoreBoard, Wall } from '../objects';
import { Button } from '../objects/Button';

export class MainScene extends Phaser.Scene {
  private balls: Phaser.GameObjects.Group;
  private rings: Phaser.GameObjects.Group;
  private scoreBoard: ScoreBoard;
  private actionRectangle: Phaser.Geom.Rectangle;
  private score: number;

  constructor() {
    super({ key: 'MainScene' });
  }

  public create() {
    const { centerX, centerY, width, height } = this.cameras.main;
    this.add.tileSprite(centerX, centerY, width, height, TEXTURES.BACKGROUND);
    this.score = 0;
    this.scoreBoard = new ScoreBoard(this, this.score);
    const box = new Box(this);
    this.generateBalls(centerX, height);
    this.generateRings(width, height);
    new Button(this, width - 180, 20, 'Restart', () => this.scene.restart());
    this.registerSwipeHandler();
    this.physics.add.collider(this.balls, this.balls);
    this.physics.add.collider(this.balls, box.getGroup(), (ball, wall) => (wall as Wall).collision());
    this.physics.add.overlap(this.balls, this.rings, (ball) => {
      this.incrementScore();
      ball.destroy();
    });
  }

  private registerSwipeHandler() {
    let isSwipeStarted = false;
    let actionStarted = false;
    this.input.on('pointerdown', (pointer) => {
      if (Phaser.Geom.Rectangle.Contains(this.actionRectangle, pointer.x, pointer.y)) {
        isSwipeStarted = true;
      }
    }, this);
    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (!actionStarted && isSwipeStarted) {
        actionStarted = true;
        Phaser.Actions.Call(this.balls.getChildren(), (x) => (x as Ball).directTo(pointer), this);
      }
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

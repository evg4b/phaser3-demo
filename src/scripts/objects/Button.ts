export class Button extends Phaser.GameObjects.Text {
  private static baseColor = '#000000';
  private static activeColor = '#7d0000';

  constructor(scene: Phaser.Scene, x: number, y: number, text: string, handler: (() => void)) {
    super(scene, x, y, text, {
      color: Button.baseColor,
      fontSize: '28px',
      fontFamily: 'Bungee',
    });

    scene.add.existing(this);
    this.setOrigin(0);
    this.setInteractive();
    this.on('pointerdown', () => handler(), this);
    this.on('pointerover', () => this.setColor(Button.activeColor), this);
    this.on('pointerout', () => this.setColor(Button.baseColor), this);
  }
}

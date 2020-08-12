import { FONT_FAMILY } from '../constants';

export class Button extends Phaser.GameObjects.Text {
  private static baseColor = '#000000';
  private static activeColor = '#FFFFFF';
  private static baseBackgroundColor = 'rgba(0,0,0,0.3)';
  private static activeBackgroundColor = '#000000';

  constructor(scene: Phaser.Scene, x: number, y: number, text: string, handler: (() => void)) {
    super(scene, x, y, text, {
      color: Button.baseColor,
      fontSize: '28px',
      fontFamily: FONT_FAMILY,
      backgroundColor: Button.baseBackgroundColor,
      padding: {
        left: 16,
        bottom: 10,
        top: 10,
        right: 16,
      },
    });

    scene.add.existing(this);
    this.setOrigin(0);
    this.setInteractive({ useHandCursor: true });
    this.on('pointerdown', () => handler(), this);
    this.on('pointerover', () => this.setColors(Button.activeColor, Button.activeBackgroundColor), this);
    this.on('pointerout', () => this.setColors(Button.baseColor, Button.baseBackgroundColor), this);
  }

  private setColors(textColor: string, bgColor: string) {
    this.setColor(textColor);
    this.setBackgroundColor(bgColor);
  }
}

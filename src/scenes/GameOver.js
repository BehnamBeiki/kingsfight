import { Scene } from 'phaser';

let info,
  play,
  select = 0;

export class GameOver extends Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    const hGap = this.scale.width / 10;
    const vGap = this.scale.height / 10;

    this.add.image(hGap * 5, vGap * 5, 'bg').setOrigin(0.5, 0.5);

    play = this.add.image(hGap * 5, vGap * 9, 'play_button').setInteractive();

    info = this.add
      .bitmapText(hGap * 5, vGap * 5, 'Syncopate', 'Made by BehnamBeiki.ir')
      .setOrigin(0.5, 0.5);

    play.on(
      'pointerup',
      function () {
        this.scene.start('Boot');
        select = 0;
      },
      this
    );
  }
}

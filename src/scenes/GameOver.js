import { Scene } from 'phaser';

let info,
  start,
  select = 0;

export class GameOver extends Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.add.image(480, 300, 'bg');
    start = this.add.image(480, 650, 'online_button').setInteractive();

    info = this.add
      .bitmapText(
        this.scale.width / 2,
        this.scale.height / 2,
        'Syncopate',
        'Made by BehnamBeiki.ir'
      )
      .setOrigin(0.5);

    //     info.setText(`Made by
    // behnambeiki.ir
    // `);

    start.on(
      'pointerup',
      function () {
        this.scene.start('Boot');
        select = 0;
      },
      this
    );
  }
}

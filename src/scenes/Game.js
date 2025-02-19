import { Scene } from 'phaser';

let ground,
  info,
  warning,
  start,
  play,
  player,
  npc,
  round = 0,
  pool = [],
  poolNpc = [];

export class Game extends Scene {
  constructor() {
    super('Game');
  }

  create() {
    const hGap = this.scale.width / 10;
    const vGap = this.scale.height / 10;

    ground = this.add.image(hGap * 5, vGap * 5, 'bg').setOrigin(0.5, 0.5);

    let cards = [
      'king',
      'dragon',
      'wolf',
      'bear',
      'snake',
      'panter',
      'staff',
      'sheild',
      'flame',
      'fruit',
      'ogre',
      'centaur',
      'troll',
      'devil',
    ];

    pool = Phaser.Utils.Array.Shuffle(cards).slice(4);
    poolNpc = Phaser.Utils.Array.Shuffle(cards).slice(4);

    info = this.add.bitmapText(hGap * 5, vGap * 7, 'Syncopate').setOrigin(0.5);

    warning = this.add
      .bitmapText(hGap * 5, vGap * 8, 'Syncopate')
      .setOrigin(0.5);

    start = this.add
      .image(hGap * 5, vGap * 9, 'online_button')
      .setInteractive()
      .setVisible(false);

    start.once(
      'pointerup',
      function () {
        this.scene.start('GameOver');
        round = 0;
        pool = [];
        poolNpc = [];
      },
      this
    );

    play = this.add.image(hGap * 5, vGap * 9, 'play_button').setInteractive();
    play.on(
      'pointerup',

      function () {
        player = this.add
          .image(hGap * 5, vGap * 5, pool[Math.floor(Math.random() * 10)])
          .setOrigin(0.5, 0.5);

        if (ground.texture !== player.texture) {
          this.tweens.add({
            targets: player,
            y: vGap * 3,
            ease: 'Power1',
            duration: 500,
            delay: 200,
            onStart: onStartHandler,
            onComplete: onCompleteHandler,
            onCompleteParams: [player],
          });

          npc = this.add
            .image(hGap * 5, vGap, poolNpc[Math.floor(Math.random() * 10)])
            .setOrigin(0.5, 0.5)
            .setVisible(false);

          if (player.texture !== npc.texture) {
            this.tweens.add({
              targets: npc,
              y: vGap * 3,
              ease: 'Power1',
              duration: 500,
              delay: 1100,
              onComplete: onCompleteHandler1,
              onCompleteParams: [npc],
            });
          } else {
            play.setVisible(false);
            start.setVisible(true);
            npc.setVisible(true);
            warning.setText(` YOU LOSE `);
          }
        } else {
          play.setVisible(false);
          start.setVisible(true);
          warning.setText(` YOU WON `);
        }
      },
      this
    );

    function onStartHandler() {
      ground.texture = player.texture;
      play.setVisible(false);
      round++;
    }

    function onCompleteHandler() {
      npc.setVisible(true);
    }

    function onCompleteHandler1() {
      ground.texture = npc.texture;
      play.setVisible(true);
    }
  }

  update() {
    info.setText(`Round ${round}`);
  }
}

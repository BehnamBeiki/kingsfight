import { Scene } from 'phaser';

let ground,
  info,
  warn,
  start,
  play,
  player,
  npc,
  round = 0;

export class Game extends Scene {
  constructor() {
    super('Game');
  }

  create() {
    const hGap = this.scale.width / 10;
    const vGap = this.scale.height / 10;

    // this.add.image(hGap * 5, vGap * 5, 'bg').setOrigin(0.5, 0.5);
    ground = this.add.image(hGap * 5, vGap * 5, 'bg').setOrigin(0.5, 0.5);

    const cards = [
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

    let playerPool = Phaser.Utils.Array.Shuffle(cards).slice(0, 10);
    let npcPool = Phaser.Utils.Array.Shuffle(cards).slice(0, 10);

    info = this.add
      .bitmapText(hGap * 5, vGap * 7, 'Syncopate', '')
      .setOrigin(0.5);
    warn = this.add
      .bitmapText(hGap * 5, vGap * 8, 'Syncopate', '')
      .setOrigin(0.5);

    start = this.add
      .image(hGap * 5, vGap * 9, 'online_button')
      .setInteractive()
      .setVisible(false);

    start.once('pointerup', () => {
      this.scene.start('GameOver');
      round = 0;
      playerPool = [];
      npcPool = [];
    });

    play = this.add.image(hGap * 5, vGap * 9, 'play_button').setInteractive();

    play.on(
      'pointerup',
      function () {
        player = this.add
          .image(hGap * 5, vGap * 5, Phaser.Utils.Array.GetRandom(playerPool))
          .setOrigin(0.5, 0.5);
        // pool[Math.floor(Math.random() * 10)]
        if (ground.texture.key !== player.texture.key) {
          this.tweens.add({
            targets: player,
            y: vGap * 3,
            ease: 'Power1',
            duration: 500,
            delay: 200,
            onStart: onStartHandler,
            // onStart: () => {
            //   ground.setTexture(player);
            //   play.setVisible(false);
            //   round++;
            // },
            onComplete: onCompleteHandler,
            onCompleteParams: [player],
          });

          npc = this.add
            .image(hGap * 5, vGap, Phaser.Utils.Array.GetRandom(npcPool))
            .setOrigin(0.5, 0.5)
            .setVisible(false);

          if (player.texture.key !== npc.texture.key) {
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
            warn.setText(` YOU LOSE `);
          }
        } else {
          play.setVisible(false);
          start.setVisible(true);
          warn.setText(` YOU WON `);
        }
      },
      this
    );

    function onStartHandler() {
      ground.texture.key = player.texture.key;
      play.setVisible(false);
      round++;
    }

    function onCompleteHandler() {
      npc.setVisible(true);
    }

    function onCompleteHandler1() {
      ground.texture.key = npc.texture.key;
      play.setVisible(true);
    }
  }

  update() {
    info.setText(`Round ${round}`);
  }
}

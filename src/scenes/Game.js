import { Scene } from 'phaser';

let info,
  round = 0;

export class Game extends Scene {
  constructor() {
    super('Game');
  }

  create() {
    const hGap = this.scale.width / 10;
    const vGap = this.scale.height / 10;

    this.add.image(hGap * 5, vGap * 5, 'bg').setOrigin(0.5, 0.5);
    let ground = this.add.image(hGap * 5, vGap * 5, 'bg').setOrigin(0.5, 0.5);

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

    const warn = this.add
      .bitmapText(hGap * 5, vGap * 8, 'Syncopate', '')
      .setOrigin(0.5);

    const start = this.add
      .image(hGap * 5, vGap * 9, 'online_button')
      .setInteractive()
      .setVisible(false);

    start.once('pointerup', () => {
      this.scene.start('GameOver');
      round = 0;
      playerPool = [];
      npcPool = [];
    });

    const play = this.add
      .image(hGap * 5, vGap * 9, 'play_button')
      .setInteractive();

    play.on('pointerup', () => {
      let player = this.add
        .image(hGap * 5, vGap * 5, Phaser.Utils.Array.GetRandom(playerPool))
        .setOrigin(0.5, 0.5);

      if (ground.texture.key !== player.texture.key) {
        this.tweens.add({
          targets: player,
          y: vGap * 3,
          ease: 'Power1',
          duration: 500,
          delay: 200,
          onStart: () => {
            play.setVisible(false);
            round++;
          },
          onComplete: () => {
            let npc = this.add
              .image(hGap * 5, vGap, Phaser.Utils.Array.GetRandom(npcPool))
              .setOrigin(0.5, 0.5);

            if (player.texture.key !== npc.texture.key) {
              this.tweens.add({
                targets: npc,
                y: vGap * 3,
                ease: 'Power1',
                duration: 500,
                delay: 200,
                onComplete: () => {
                  ground.texture.key = npc.texture.key;
                  play.setVisible(true);
                },
              });
            } else {
              play.setVisible(false);
              start.setVisible(true);
              npc.setVisible(true);
              warn.setText(` YOU LOSE `);
            }
          },
        });
      } else {
        play.setVisible(false);
        start.setVisible(true);
        warn.setText(` YOU WON `);
      }
    });
  }

  update() {
    info.setText(`Round ${round}`);
  }
}
